/*
isotope loads an instance when the page loads and binds itself to the .grid container. at this point the container is empty so the layout will not work. the instance must be destroyed first and reinitialised in content.js
*/

var createIsotope = function() {
  var $grid = $('.grid');
  $grid.imagesLoaded(function() {
    $grid.isotope({
      itemSelector: '.grid-item',
      layoutMode: 'packery',
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      },
      packery: {
        gutter: 10
      },
      getSortData: {
        date: function(elem) {
          var date = $(elem).find('[data-date]').data('date');
          return date
        }
      },
      sortBy: 'date',
      sortAscending: false
    });
  })

};


var updateIsotope = function() {
  var $grid = $('.grid');
  $grid.isotope('reloadItems');
  $grid.isotope();
}

$(document).ready(function() {

  createIsotope();


  $('#categories').on('click', 'li.filter', function() {
    var filterValue = $(this).attr('data-filter');
    $('.grid').isotope({ filter: filterValue });
    $('li.filter').removeClass('active');
    $(this).addClass('active');
  });

  // $('.grid').on('click', '.grid-item', function() {
  //   // console.log(feeds);
  //   var origlink = $(this).find('.title').data('entryid');
  //   var entry = feeds.find(function(feed) {
  //     return feed.origlink == origlink;
  //   })
  //   $('.modal-header').text(entry.title);
  //   $('.modal-body').html(entry.description);
  //   $('.bookmark').attr('data-entry', entry.origlink);
  // });

})
