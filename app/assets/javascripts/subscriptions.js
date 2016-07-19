// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  if (!$('body').hasClass('ajax')) { return false; }
console.log("subscription loaded")
  var addFeeds = {
    bindAddFeedsClick: function () {
      $('#search').on('click', function (e) {
        e.preventDefault();

        $('#search-modal').modal('show');
      });
    },
    init: function () {
      this.bindAddFeedsClick();
    }
  }
});