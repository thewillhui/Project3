$(document).ready(function() {
  if (!$('body').hasClass('ajax')) {
    return false;
  }
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
              tabHtml = '<div role="tabpanel" class="tab-pane" id="' + folder + '">' + folder + '</div>';
              $('.tab-content').append(tabHtml);
            }
          })
          $('.nav-tabs').find('li').first().addClass('active');
          $('.tab-content').find('div').first().addClass('active');
          $('.grid').on('click', '.folder-tab', function(){
            isotopeGrid();
          })
        }
      })
    },
    getFeeds: function() {
      $.ajax({
        url: '/subscriptions',
        method: 'GET',
        success: function(data) {
          data.subscriptions.forEach(function(subscription) {
              subscription.entries.forEach(function(entry) {
                var description = '<div>' + entry.summary + '</div>';
                var imageUrl = $(description).find('img').attr('src');
                if (imageUrl) {
                  html = '<div class="grid-item entry-div">' +
                    '<img class="head-img" src="' + imageUrl + '">' +
                    '<div class="thumbnail">' +
                    '<div class="caption">' +
                    '<h4>' + entry.title + '</h4>' +
                    '<div class="description"><p>' + entry.summary + '</p>' + '<p>' + entry.published + '</p>' +
                    '</div></div></div></div>';
                } else {
                  html = '<div class="grid-item entry-div">' + '<div class="thumbnail">' + '<div class="caption">' +
                    '<h4>' + entry.title + '</h4>' + '<div class="description"><p>' + entry.summary + '</p>' + '<p>' + entry.published + '</p>' +
                    '</div></div></div></div>';
                }
                if (subscription.folder) {
                  $('#' + subscription.folder).append(html);
                }
                var youtube = $('iframe[src*="youtube.com"]')
                youtube.addClass('col-xs-12');
              })
            })
            //hides description, opens on click and rearranges with isotope
          $('.description').slideUp();
          $('.entry-div').click(function() {
              $(this).find(".head-img").toggle();
              // $(this).toggleClass("gigante").find(".description").slideToggle("fast", function() {
              //   $('.grid').isotope("layout")
              // });
            })
            //arranges all entry-divs with isotope
          isotopeGrid();
        }
      })
    },
    // Half finished
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
    bindShowClicks: function() {
      var that = this;
      $('.toggle-modal').on('click', function(e) {
        e.preventDefault();

        var id = $(this).data('id');

        that.getPost(id, that.setSource);
      });
    },
    init: function() {
      this.getFolders();
      this.getFeeds();
    }
  };
  ajaxFeeds.init();
})
