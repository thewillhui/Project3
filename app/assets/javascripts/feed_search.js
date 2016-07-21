$(document).ready(function(){
  if (!$('body').hasClass('ajax')) { return false; }
console.log("loaded")
  var search = {
    subscribe: function () {
      var params ={
        subscription: {
          title: $(this).parents('.feed-container').find('h5').children('a').text(),
          url: $(this).parent().prev().data('feed-url'),
          folder: $(this).data('folder'),
          logoUrl: $(this).parents('.title-template').children('.feed-logo').find('img').attr('src')
        }
      };
      console.log(params);
      $.ajax({
        method: 'POST',
        url: '/subscriptions/add',
        data: params,
        success: function(data) {
          console.log('succeed');
          // console.log(data);
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
            html = '<div class=\"feed-container col-sm-12\"><div class=\"title-template col-sm-12\"><div class=\"feed-logo col-sm-3\"><img src=\"' + result.visualUrl +'\" style=\"width: 75px; height: 75px;\"></div><div class=\"col-sml-9\"><h5 class=\"feed-content feed-title\"><a href=\"' + result.feedId.slice(5) + '\">' +result.title + '</a></h5><div class=\"feed-content feed-description\">' + result.description +
              '</div></div><div class=\"pull-right subscribe-btn dropdown\"><button class=\"dropdown-toggle btn btn-feed\" type=\"button\" data-toggle=\"dropdown\" data-feed-url=\"' + result.feedId.slice(5) +'\">Subscribe to:<span class=\"caret\"></span></button><ul class=\"folder-add dropdown-menu\"><li class=\"subscribe\" data-folder=\"General\"><a href\"#\">General</a></li><li class=\"subscribe\" data-folder=\"News\"><a href\"#\">News</a></li><li class=\"subscribe\" data-folder=\"Technology\"><a href\"#\">Technology</a></li><li class=\"subscribe\" data-folder=\"Sports\"><a href\"#\">Sports</a></li><li class=\"subscribe\" data-folder=\"Finance\"><a href\"#\">Finance</a></li><li class=\"subscribe\" data-folder=\"Fashion\"><a href\"#\">Fashion</a></li></ul></div></div>';
            $('#result').append(html).css({width: '100%', height: '100%', display: 'block'});
          })
          // isotopeGrid();
        }
      })
    },
    init: function () {
      // on clicking search submit
      $('#result').on('click', '.subscribe', search.subscribe)
      $('#search-btn').on('click', search.searchFeed);
    }
  };
  search.init();
});