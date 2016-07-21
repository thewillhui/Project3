var createIsotope = function() {
  var $grid = $('.grid');
  $grid.imagesLoaded(function() {
    $grid.isotope({
      itemSelector: '.grid-item',
      layoutMode: 'packery',
      packery: {
        gutter: 10
      }
    });
  })
};

var destroyIsotope = function () {
  var $grid = $('.grid');
  $grid.isotope('destroy');
};

var checkIsotopeInstance = function () {
  var $grid = $('.grid');
  return $grid.data('isotope');
}

$(document).ready(function() {
  $('#categories').on('click', 'li', function() {
    var filterValue = $(this).attr('data-filter');
    $('.grid').isotope({ filter: filterValue });
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

  console.log("loaded isotope.js")
})

