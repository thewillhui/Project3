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
            if (folder) {
              navHtml = '<li role="presentation">' +
                '<a class="folder-tab" href="#' + folder + '" aria-controls="' + folder + '" role="tab" data-toggle="tab">' + folder +
                '</a></li>';
              $('.nav-tabs').append(navHtml);
              // create tab panes
              tabHtml = '<div role="tabpanel" class="tab-pane" id="' + folder + '"></div>';
              $('.tab-content').append(tabHtml);

            }
          })
        }
      })
    },


    getSubscriptions: function(){
      $.ajax({
        url: '/manage',
        method: 'GET',
        success: function(data){
          feeds = [];
          $.each( data, function(key, items){
            items.forEach(function(item){
              subscriptions.push({'url': item.url, 'folder': item.folder});
            })
          })
          // for (var key in data){
          //   subscriptions.push({'url': data[key][0].url, 'folder': data[key][0].folder});
          // }
          subscriptions.forEach(function(subscription){
            feednami.load(subscription.url, function(result){
              if(result.error){
                console.log(result.error)
              }
              else {
                var entries = result.feed.entries;
                entries.forEach(function(entry){
                  console.log(entry);
                  feeds.push(entry);
                  var description = '<div>' + entry.description + '</div>';
                  var imageUrl = $(description).find('img').attr('src');
                  html = '<div class="grid-item entry-div" data-toggle="modal" data-target="#feed_content">' +
                    '<img class="head-img" src="' + imageUrl + '">' +
                    '<div class="thumbnail">' +
                    '<div class="caption">' +
                    '<h4 class="title" data-entryid="'+entry.link+'">' + entry.title + '</h4>' +
                     '<p>' + entry.date + '</p>' +
                    '</div></div></div></div>';
                    $('#' + subscription.folder).append(html);
                })
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
        success: function(data){
          $('#subscriptionslist').html('');
          $.each(data, function(key, items){
            html = '<li class="folder_name"><h3>' + key + '</h3><ul>';
            items.forEach(function(item){
              html += '<li class="sub" data-id="' + item.id + '"><img src="'+item.logoUrl+'">' + item.title + '</li>';
            })
            html += '</ul></li>';
            $('#subscriptionslist').append(html);
          })
          optionHtml = '<span>  <a href="#">Edit</a> | <a href="#">Delete</a></span>';
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

    bindManageModalClick: function(){
      $('#manage').on('click', this.setManageModal);
    },

    init: function() {
      this.bindManageModalClick();
      this.getFolders();
      this.getSubscriptions();
      // this.getFeeds();
    }
  };
  ajaxFeeds.init();
})
