var isotopeGrid = function() {
  var $grid = $('.grid.active');
  $grid.imagesLoaded(function() {
    $grid.isotope({
      itemSelector: '.grid-item',
      layoutMode: 'packery',
      packery: {
        gutter: 10
      }
    });
  })
}
$(document).ready(function() {
  // var $grid = $('.grid.active');
  // $grid.imagesLoaded(function() {
  //   $grid.isotope({
  //     itemSelector: '.grid-item',
  //     layoutMode: 'packery',
  //     packery: {
  //       gutter: 10
  //     }
  //   });
  // })
setTimeout(isotopeGrid, 500)

  console.log("loaded isotope.js")
})

