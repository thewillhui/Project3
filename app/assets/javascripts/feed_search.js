$(document).ready(function(){
  if (!$('body').hasClass('ajax')) { return false; }
console.log("loaded")
  var search = {
    subscribe: function () {
      var params ={
        subscription: {
          title: $(this).parent().children('.feed-title').text(),
          url: $(this).data('feed-url')
          folder:
        }
      };
      console.log(params);
      $.ajax({
        method: 'POST',
        url: '/subscriptions/add',
        data: params,
        success: function(data) {
          console.log(data);
        }
      })
    },

    searchFeed: function() {
      var keyword = $('#searchbox').val();
      $.ajax({
        method: 'GET',
        url: '/feedlr/search?query='+keyword,
        success: function(feeds){
          $('#result').html('');
          feeds.results.forEach(function(result){
            html = '<div class="feed-container col-md-6 col-sm-12"><div class="title-template"><img src="' + result.visualUrl +
                                '" style="width: 100%; height: 100%;"><h6 class="feed-content feed-title">' + result.title +
                                '</h6><div class="feed-content feed-description">' + result.description +
                                '</div><button class="btn btn-feed" type="button" data-feed-url="' + result.feedId.slice(5) +
                                // - button tag doesn't work with href
                                // - add button haven't add dropbox yet
                                '">Add</button><button class="btn btn-feed-web" type="button" href="' + result.feedId.slice(5) +
                                '">Website</button></div></div>';
            $('#result').append(html).css({width: '100%', height: '100%', display: 'block'});
          })
          isotopeGrid();
        }
      })
    },
    init: function () {
      // on clicking search submit
      $('#result').on('click', '.btn-feed', search.subscribe)
      $('#search-btn').on('click', search.searchFeed);
    }
  };
  search.init();
});