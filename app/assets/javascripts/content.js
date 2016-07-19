$(document).ready(function () {
  if (!$('body').hasClass('ajax')) { return false; }
  var ajaxFeeds = {
    getSources: function () {
      $.ajax({
        url: '/subscriptions',
        method: 'GET',
        success: function(feed){
          feed.entries.forEach(function(entry){
            var summary = entry[2][1]
            var img = $(summary).find('img').attr('src');
            var stockImg = 'apple-touch-icon.png';
            var chooseImg =  img ? img: stockImg;
            console.log('title: ' + entry[0][1]);
            html = '<div class="entry-div col-sm-3">' +
            '<img class="thumbnail" src="' + chooseImg + '">' +
            '<div class="caption">' +
            '<h4>' + entry[0][1] + '</h4>' +
            '<p class="published">' + entry[5][1] + '</p>' +
            '</div></div></div>';
            $('#feed').append(html);
          })
        }
      })
    },
    // Half finished
    getSource: function (id, cb) {
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
    setSource: function (src, mode) { // on show/edit
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
      this.getSources();
    }
  };
  ajaxFeeds.init();
})