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
                navHtml = '<li data-filter=\".' + folder + '\"><a href=\"#\">' + folder + '</a></li>'
                $('#categories').append(navHtml);
              })
              $('#categories').find('li').first().addClass('active');
            }
        })
  },

  getSubscriptions: function() {
    $.ajax({
      url: '/manage',
      method: 'GET',
      success: function(data) {
        for (var key in data) {
          subscriptions.push({ 'url': data[key][0].url, 'folder': data[key][0].folder });
        }
        subscriptions.forEach(function(subscription) {
          feednami.load(subscription.url, function(result) {
            if (result.error) { console.log(result.error); return false; }

            var entries = result.feed.entries;

            entries.forEach(function(entry) {
              var description = '<div>' + entry.description + '</div>';
              var imageUrl = $(description).find('img').attr('src');
              html = '' +
              '<div class="grid-item entry-div ' + subscription.folder + '\" data-toggle="modal" data-target="#feed_content">' +
                '<img class="head-img" src="' + imageUrl + '">' +
                '<div class="thumbnail">' +
                  '<div class="caption">' +
                    '<h4 class="title" data-entryid="' + entry.origlink + '">' + entry.title + '</h4>' +
                    '<p>' + entry.date + '</p>' +
                  '</div>' +
                '</div>' +
              '</div>';

              $('.grid').append(html);
            });
            if (checkIsotopeInstance()) { destroyIsotope(); }
            createIsotope();
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
    this.getSubscriptions();
    // this.getFeeds();
  }
};
ajaxFeeds.init();
})
