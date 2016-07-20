$(document).ready(function() {
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


  console.log("loaded isotope.js")
})

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
