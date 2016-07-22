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
          $('.grid').html('');
          feeds = [];
          $.each(data, function(key, items) {
            items.forEach(function(item) {
              subscriptions.push({ 'url': item.url, 'folder': item.folder, 'title': item.title });
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
                      '<p class="feed-name">' + subscription.title + '</p>' + '<p class="folder-name">' + subscription.folder + '</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>';
                  } else {
                    html =
                      '<div class="grid-item entry-div ' + subscription.folder + '\" data-toggle="modal" data-target="#feed_content">' +
                      '<div class="thumbnail">' +
                      '<div class="caption">' +
                      '<h4 class="title" data-entryid="' + entry.link + '">' + entry.title + '</h4>' +
                      '<p class="date" data-date="' + sortDate + '">' + itemDate + '</p>' +
                      '<p class="feed-name">' + subscription.title + '</p>' +
                      '<p class="folder-name">' + subscription.folder + '</p>' +
                      '</div>' +
                      '</div>' +
                      '</div>';
                  }
                  $('.grid').append(html);
                })
                var youtube = $('iframe[src*="youtube.com"]')
                youtube.addClass('col-xs-12');
                updateIsotope();
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
              listhtml = '<li class="sub" data-id="' + item.id + '">'+ '<div class="col-xs-12">' +'<div class="col-xs-6">' +
              '<img src="'+item.logoUrl+'">' + item.title + '</div>' +
              '<div class="subscription-btns col-xs-6">' +
            '<div class="dropdown pull-right">' +
            '<button class="btn btn-drop dropdown-toggle" type="button" data-toggle="dropdown">Change folder ' +
            '<span class="caret"></span></button>' +
            '<ul class="dropdown-menu">' +
            '<li><a class="folder-dropdown" href="#">General</a></li>' +
            '<li><a class="folder-dropdown" href="#">News</a></li>' +
            '<li><a class="folder-dropdown" href="#">Technology</a></li>' +
            '<li><a class="folder-dropdown" href="#">Photography</a></li>' +
            '<li><a class="folder-dropdown" href="#">Food</a></li>' +
            '</ul>' +
            '</div>' +
            '<button class="btn btn-danger delete">Delete</button>' +
            '</div></div></li>';
              $('#'+key+'-manage-folder').append(listhtml);
            })
          })
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
      $('#feed_content').find('.modal-header').prepend('<a href="#"><span class="fa fa-bookmark fa-2x" data-id="' + entry.link +'"></span></a>');

    },

    deleteFeed: function(id, cb) {
      $.ajax({
        url: '/subscriptions/delete/' + id,
        method: 'DELETE',
        success: function(resp) {
          console.log(resp);
          cb();
          $('#manage-noty').noty({
            text: 'Subscriptions Deleted',
            type: 'success',
            timeout: 1000
          })
        }
      })
    },
    editFeed: function(id, newFolder, cb) {
      $.ajax({
        url: '/edit/' + id,
        method: 'PUT',
        data: { folder: newFolder },
        success: function(resp) {
          console.log(resp);
          cb();
          $('#manage-noty').noty({
            text: 'Folder changed',
            type: 'alert',
            timeout: 1000
          })
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
    bindRefreshClick: function(){
      var that = this;
      $('#refresh').on('click', function(){
        $('.grid').html('');
        $('.grid').isotope('destroy')
        // $('#products').isotope( 'reloadItems' ).isotope();
        that.getSubscriptions();
      })
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
      // this.bindRefreshClick();
      this.getFolders();
      this.getSubscriptions();
      // this.getFeeds();
    }
  };
  ajaxFeeds.init();
})