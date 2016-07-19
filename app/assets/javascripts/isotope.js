var $grid = $('.grid').imagesLoaded(function() {
      $grid.isotope({
        itemSelector: '.grid-item',
        layoutMode: 'packery',
        packery: {
          gutter: 10
        }
      });
    });

var isotopeGrid = function () {
  var $grid = $('.grid').imagesLoaded(function() {
        $grid.isotope({
          itemSelector: '.grid-item',
          layoutMode: 'packery',
          packery: {
            gutter: 10
          }
      });
    });
  }