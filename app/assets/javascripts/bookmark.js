$(document).ready(function() {
  if (!$('body').hasClass('ajax')) {
    return false;
  }
  console.log('bookmark listened');
  var ajaxBookmark = {
    // get every entries of subscriptions
    getBookmarks: function() {
      $.ajax({
        url: '/bookmark',
        method: 'GET',
        success: function(bookmarks) {
          if (bookmarks) {
            bookmarksHtml = '<li data-filter=\".Bookmarks\"><a href=\"#\">' + Bookmarks + '</a></li>';
            $('#categories').append(bookmarksHtml);
            $('#categories').find('li').last().addClass('active');
            // create nav tabs
            bookmarks.forEach(function(bookmark) {
              // create tab panes
              html = '<div class="grid-item entry-div' + subscription.folder + '" data-toggle="modal" data-target="#feed_content">' +
                    '<img class="head-img" src="' + imageUrl + '">' +
                    '<div class="thumbnail">' +
                    '<div class="caption">' +
                    '<h4 class="title" data-entryid="'+entry.link+'">' + entry.title + '</h4>' +
                     '<p>' + entry.date + '</p>' +
                    '</div></div></div></div>';
              $('.grid').append(html);
              $('#bookmarks').append(html);
            });
          };
          $('.nav-tabs').find('li').first().addClass('active');
          $('.tab-content').find('div').first().addClass('active');
          $('.grid').on('click', '.folder-tab', function(){
            isotopeGrid();
          })
        },
      })
    },
    addBookmark: function() {
      $('.grid').on('click', '.fa-bookmark', function(e){
        var entry_params = this.closest('.thumbnail')
        $.ajax({
          url: '/bookmark',
          method: 'POST',
          data: params = {
            bookmark: {
              title: entry_params.find('.title').text(),
              web_url: entry_params.data("entryid"),
              content: 'hihi',
              published: entry_params.find('p').text(),
              thumbnail_url:'google.com'
            }
          },
          success: function (bookmark) {
            console.log(bookmark);
            // Nodejs format
            // bookmark.user_id = User.id,
            // bookmark.title = req.body.title,
            // bookmark.web_url = req.body.link,
            // bookmark.auther = null, // can't find in entry feed
            // bookmark.content = req.body.description,
            // bookmark.published = req.body.date,
            // bookmark.thumbnail_url = $(req.body).find('img').attr('src'),
            // bookmark.entry_id = null // can't find in entry feed
          }
        })
      })
    },
    removeBookmark: function () {
      $.ajax({
        url: '/bookmark/:id',
        method: 'DESTROY',
        success: function (bookmark) {
          console.log(bookmark);
        }
      })
    },
    bindBookmarkClick : function(){
      var that = this;
      $('.grid').on('click', '.fa-bookmark', function(e){
        e.preventDefault();
        console.log(e);
      })
    }
    init: function() {
      this.bindBookmarkClick();
      this.getBookmarks();
      this.removeBookmark();
    }
  };
  ajaxBookmark.init();
})