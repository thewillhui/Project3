$(document).ready(function(){
  var ajaxBookmark = {
    getBookmarks: function(){
      console.log('hi');
      $.ajax({
        url: '/bookmark',
        method: 'GET',
        success: function(data){
          console.log(data);
          $('.panel-group').html('');
          data.forEach(function(bookmark){

            bookmarkhtml = '<div class="panel"><div class="panel-heading" role="tab" id="heading' + bookmark.id +'"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse' + bookmark.id +'" aria-expanded="false" aria-controls="collapse' + bookmark.id +'">' + bookmark.title +
              '</a></h4></div>' +
              '<div id="collapse' + bookmark.id +'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + bookmark.id +'"><div class="panel-body">' +
              '<a href="#"><p class="bookmark-delete fa fa-trash-o fa-1x" data-id="' + bookmark.id +'"></p></a>' +
              bookmark.content +'</div></div>';
              console.log(bookmarkhtml);
            $('.panel-group').append(bookmarkhtml);
          })
        }
      })
    },
    deleteBookmark: function(id, cb){
      $.ajax({
        url: '/bookmark/' + id,
        method: 'DELETE',
        success: function(resp){
          console.log(resp);
          cb();
          $('#bookmark-noty').noty({
            text: 'Bookmark removed',
            type: 'warning',
            timeout: 2000
          })
        }
      })
    },
    addBookmark: function(params){
      $.ajax({
        url: '/bookmark',
        method: 'POST',
        data: params,
        success: function(resp){
          if (resp.destroyed) {
            $('#feeds-noty').noty({
              text: 'Bookmark removed',
              type: 'warning',
              timeout: 2000
            })
          } else {
            $('#feeds-noty').noty({
              text: 'Bookmark added',
              type: 'success',
              timeout: 2000
            })
          }
        }
      })
    },
    bindBookmarkClick: function(){
      var that = this;
      $('#feed_content').on('click', '.fa-bookmark', function(e){
        e.preventDefault();
        var link = $(this).data('id');
        var entry = feeds.find(function(feed){
          return feed.link == link;
        })
        var params = {
          bookmark: {
            title: entry.title,
            link: entry.link,
            content: entry.description,
            date: entry.date
          }
        }
        console.log(params);
        that.addBookmark(params);
      })
    },
    bindGetBookmarks: function(){
      // var that = this;
      $('#bookmark-menu-button').on('click', this.getBookmarks);
    },
    bindDeleteBookmark: function(){
      var that = this;
      $('#bookmark-modal').on('click', '.bookmark-delete', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        that.deleteBookmark(id, that.getBookmarks);
      })
    },

    init: function(){
      this.bindDeleteBookmark();
      this.bindGetBookmarks();
      this.bindBookmarkClick();
    }
  };
  ajaxBookmark.init();
})