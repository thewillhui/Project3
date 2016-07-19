var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'packery',
  packery: {
    gutter: 10
  }
});

var isotopeGrid = function() {
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

$(document).ready(function() {
  // $('#feed').on( 'click', '.grid-item', function() {
  //   console.log("click")
  //   // change size of item by toggling gigante class
  //   $( this ).toggleClass('gigante');
  //   $('#feed').isotope('layout');
console.log('=================')
  $('.description').slideUp();
  $('.entry-div').click(function() {
    console.log('click')
    $(this).next(".description").slideToggle(function() {
      $('.grid').isotope("layout")
    });
  })
})
