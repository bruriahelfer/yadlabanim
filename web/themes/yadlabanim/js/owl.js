/*(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.owl = {
    attach: function (context, settings) {
      $(document).ready(function() {
        if ($('.field--name-field-event-images > .field__item').length > 1) {
          $('.field--name-field-event-images').owlCarousel({
            rtl: true,
            nav: true,
            dots: false,
            autoWidth:true,
            loop: false, 
            margin: 20,
            navRewind: false,
            navText: ['', ''],  
          });
        }


      });
    }
  }
})(jQuery, Drupal);*/