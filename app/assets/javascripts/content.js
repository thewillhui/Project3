$(document).ready(function () {
  if (!$('body').hasClass('ajax')) { return false; }
  var ajaxFeeds = {
    getFeeds: function () {
      $.ajax({
        url: '/subscriptions',
        method: 'GET',
        success: function(subscriptions){
          console.log(subscriptions);
          subscriptions.subscriptions.forEach(function(subscription){
            subscription.entries.forEach(function(entry){
              var description = '<div>' + entry.summary + '</div>';
              var imageUrl = $(description).find('img').attr('src');
              if (imageUrl){
            html = '<div class="grid-item entry-div">' +
                  '<img src="' + imageUrl + '">' +
                    '<div class="thumbnail">' +
                      '<div class="caption">' +
                        '<h4>' + entry.title + '</h4>' +
                        '<p>' + entry.published + '</p>' +
                      '</div></div></div>';
          } else {
            html = '<div class="grid-item entry-div">' + '<div class="thumbnail">' + '<div class="caption">' +
                        '<h4>' + entry.title + '</h4>' +
                        '<p>' + entry.published + '</p>' +
                      '</div></div></div>';
          }
              $('#feed').append(html);
            })
          })
          isotopeGrid();
        }
      })
    },
    // Half finished
    getFeed: function (id, cb) {
      $.ajax({
        url: '/subscriptions/' + id,
        method: 'get',
        success: function (src) {
          cb(src, "show");
        },
        error: function (resp) {
          console.log(resp);
        }
      });
    },
    setFeed: function (src, mode) { // on show/edit
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
    bindShowClicks: function () {
      var that = this;
      $('.toggle-modal').on('click', function (e) {
        e.preventDefault();

        var id = $(this).data('id');

        that.getPost(id, that.setSource);
      });
    },
    init: function () {
      this.getFeeds();
    }
  };
  ajaxFeeds.init();
})
