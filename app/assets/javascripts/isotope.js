// var isotopeGrid = function() {
//   var $grid = $('.grid');
//   $grid.imagesLoaded(function() {
//     $grid.isotope({
//       itemSelector: '.grid-item',
//       layoutMode: 'packery',
//       packery: {
//         gutter: 10
//       }
//     });
//   })
// }
$(document).ready(function() {
  $grid = $('.grid');
  $grid.imagesLoaded(function() {
    $grid.isotope({
      itemSelector: '.grid-item',
      layoutMode: 'packery',
      packery: {
        gutter: 10
      }
    });
  })
  $('#categories').on('click', 'li', function() {
    var filterValue = $(this).attr('data-filter');
    $('.grid').isotope({ filter: filterValue });
  });

  $('.grid').on('click', '.grid-item', function() {
    // console.log(feeds);
    var origlink = $(this).find('.title').data('entryid');
    var entry = feeds.find(function(feed) {
      return feed.origlink == origlink;
    })
    $('.modal-header').text(entry.title);
    $('.modal-body').html(entry.description);
    $('.bookmark').attr('data-entry', entry.origlink);
  });




  console.log("loaded isotope.js")
})

