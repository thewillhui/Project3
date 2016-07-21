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
      }
    });
  })
};

var destroyIsotope = function() {
  var $grid = $('.grid');
  $grid.isotope('destroy');
};

var checkIsotopeInstance = function() {
  var $grid = $('.grid');
  return $grid.data('isotope');
}

$(document).ready(function() {
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
