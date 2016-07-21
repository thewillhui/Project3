$(document).ready(function() {
  if (!$('body').hasClass('ajax')) {
    return false;
  }
  var subscriptions = [];
  var ajaxFeeds = {

    // get every entries of subscriptions
    getFolders: function() {
      $.ajax({
        url: '/subscriptions/folder',
        method: 'GET',
        success: function(folders) {
          // create nav tabs
          folders.forEach(function(folder) {
            navHtml = '<li class="filter" data-filter=\".' + folder + '\"><a href=\"#\">' + folder + '</a></li>'
            $('#categories').append(navHtml);
          })
        }
      })
    },
    getSubscriptions: function(){
      $.ajax({
        url: '/manage',
        method: 'GET',
        success: function(data) {
          feeds = [];
          $.each(data, function(key, items) {
            items.forEach(function(item) {
              subscriptions.push({ 'url': item.url, 'folder': item.folder });
            })
          })
          subscriptions.forEach(function(subscription) {
            feednami.load(subscription.url, function(result) {
              if (result.error) {
                console.log(result.error)
              } else {
                var entries = result.feed.entries;
                entries.forEach(function(entry) {
                  var entryDate = entry.date
                  var itemDate = moment(entryDate).format("dddd, MMMM Do YYYY");
                  var sortDate = moment(entryDate).format("X");
                  feeds.push(entry);
                  debugger
                  var description = '<div>' + entry.description + '</div>';
                  var imageUrl = $(description).find('img').attr('src');
                  if (imageUrl) {
                    html =
                      '<div class="grid-item entry-div ' + subscription.folder + '\" data-toggle="modal" data-target="#feed_content">' +
                      '<img class="head-img" src="' + imageUrl + '">' +
                      '<div class="thumbnail">' +
                      '<div class="caption">' +
                      '<h4 class="title" data-entryid="' + entry.link + '">' + entry.title + '</h4>' +
                      '<p class="date" data-date=\"' + sortDate + '\">' + itemDate + '</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>';
                  } else {
                    html =
                      '<div class="grid-item entry-div ' + subscription.folder + '\" data-toggle="modal" data-target="#feed_content">' +
                      '<div class="thumbnail">' +
                      '<div class="caption">' +
                      '<h4 class="title" data-entryid="' + entry.link + '">' + entry.title + '</h4>' +
                      '<p class="date" data-date=\"' + sortDate + '\">' + itemDate + '</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>';
                  }
                  $('.grid').append(html);
                })
                var youtube = $('iframe[src*="youtube.com"]')
                youtube.addClass('col-xs-12');
                if (checkIsotopeInstance()) { destroyIsotope(); }
                createIsotope();
              }
            })
          })
        }
      })
    },
    setManageModal: function(){
      $.ajax({
        url: '/manage',
        method: 'GET',
        success: function(data) {
          $('.folder-ul').html('');
          listhtml = '';
          $.each(data, function(key, items){
            items.forEach(function(item){
              listhtml = '<li class="sub" data-id="' + item.id + '"><img src="'+item.logoUrl+'">' + item.title + '</li>';
              $('#'+key+'-manage-folder').append(listhtml);
            })

          })
          optionHtml = '<span>' +
            '<div class="dropdown">' +
            '<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Change folder' +
            '<span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li><a class="folder-dropdown" href="#">General</a></li>' +
            '<li><a class="folder-dropdown" href="#">News</a></li>' +
            '<li><a class="folder-dropdown" href="#">Technology</a></li>' +
            '<li><a class="folder-dropdown" href="#">Sports</a></li>' +
            '<li><a class="folder-dropdown" href="#">Finance</a></li>' +
            '</ul>' +
            '</div>' +
            ' | <a class="delete" href="#">Delete</a></span>';
          $('.sub').append(optionHtml);
        }
      })
    },
    getFeed: function(id, cb) {
      $.ajax({
        url: '/subscriptions/' + id,
        method: 'get',
        success: function(src) {
          cb(src, "show");
        },
        error: function(resp) {
          console.log(resp);
        }
      });
    },
    setFeed: function(src, mode) { // on show/edit
      ajaxPosts.hideAllInModal();
      var $modal = $('#src-modal');
      var existance = !$.isEmptyObject($.auth.user);
      if (existance) {
        if (!$.isEmptyObject(post)) {
          // set data values
          $modal.data("id", post.id);
          // set modal title and body with data
          $modal.find('.modal-title').text(entry.title);
          $modal.find('.modal-body').text(entry.published);
        }

        $modal.modal('show');
      }
    },

    setFeedModal: function() {
      var link = $(this).find('.title').data('entryid');
      // console.log('origlink: ' + origlink);
      var entry = feeds.find(function(feed) {
        return feed.link == link;
      })
      var entryDate = entry.date
      var itemDate = moment(entryDate).format("dddd, MMMM Do YYYY, hh:mm:ss ZZ [GMT]");
      $('#feed_content').find('.modal-header').html('<h2>' + entry.title + '</h2>' + '<h5 class="date">' + itemDate + '</h5>');
      $('#feed_content').find('.modal-body').html('<p>' + entry.description + '</p>');
      $('#feed_content').find('.bookmark').attr('data-entry', entry.link);

    },

    deleteFeed: function(id, cb) {
      $.ajax({
        url: '/subscriptions/delete/' + id,
        method: 'DELETE',
        success: function(resp) {
          console.log(resp);
          cb();
        }
      })
    },
    editFeed: function(id, newFolder, cb) {
      $.ajax({
        url: '/edit/' + id,
        method: 'PUT',
        data: { folder: newFolder },
        success: function(resp) {
          console.log('edited');
          console.log(resp);
          cb();
        }
      })
    },

    bindManageModalClick: function() {
      $('#manage').on('click', this.setManageModal);
    },
    bindFeedModalClick: function(){
      $('.grid').on('click', '.grid-item', this.setFeedModal);
    },
    bindFeedDeleteClick: function() {
      var that = this;
      $('#subscriptionslist').on('click', '.delete', function(e) {
        e.preventDefault();
        var id = $(this).parents('.sub').data('id');
        that.deleteFeed(id, that.setManageModal);
      });
    },
    bindFeedEditClick: function() {
      var that = this;
      $('#subscriptionslist').on('click', '.folder-dropdown', function(e) {
        e.preventDefault();
        newFolder = $(this).text();
        var id = $(this).parents('.sub').data('id');
        that.editFeed(id, newFolder, that.setManageModal);
      })

    },

    init: function() {
      this.bindFeedEditClick();
      this.bindFeedDeleteClick();
      this.bindFeedModalClick();
      this.bindManageModalClick();

      this.getFolders();
      this.getSubscriptions();
      // this.getFeeds();
    }
  };
  ajaxFeeds.init();
})