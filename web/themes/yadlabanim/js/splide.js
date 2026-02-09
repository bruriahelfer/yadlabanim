(function ($, Drupal, once) {

  'use strict';

  Drupal.behaviors.splide = {
    attach: function (context, settings) {
      
      // events front 
      once('splide-init-events', '.view-content-events', context).forEach(function(element) {
        var splide = new Splide(element, {
          direction: 'rtl',
          perPage  : 2,
          padding: { 
            left: '554px',  
            right: 0
          },
          pagination: false,
          gap: '120px',
          classes: {
            list: '.view-content-events', 
            slide: 'views-row',  
          },
          breakpoints: {
            1750: {
              padding: { 
                left: '400px',  
                right: 0
              }
            },
            1490: {
              gap: '40px',
              padding: { 
                left: '200px',  
                right: 0
              }
            },
            1200: {
              perPage: 1,
            },
            1024: {
              perPage: 2,
              padding: { 
                left: '80px',  
                right: 0
              }              
            },
            480: {
              perPage: 1,
              padding: {  
                left: '100px',  
                right: 0
              }              
            },
            320: {
              padding: {  
                left: '70px',   
                right: 0
              }              
            }
          },
        });
        
        splide.mount();
      });

      // Gallery slider
    once('splide-init-gallery', '.view-content-gallery', context).forEach(function(element) {
      var splide = new Splide(element, {
        direction: 'rtl',
        type: 'loop',
        drag   : 'free',
        focus    : 'center',
        autoWidth: true,
        gap: '14px',
        arrows: false,
        pagination: false,
        autoScroll: {
          speed: 1,
          pauseOnHover: false, 
        },
      });
      
      splide.mount(window.splide.Extensions);
    });

      // fallen gallery 
      once('splide-init-fallen-gallery', '.fallen-gallery', context).forEach(function(element) {
        var splide = new Splide(element, {
          direction: 'rtl',
          gap: '17px',
          autoWidth: true,
          classes: {
            list: 'fallen-gallery', 
            slide: 'splide__slide',  
          },
        });
        
        const counterCurrent = document.querySelector('.splide-counter .current');
        const counterTotal   = document.querySelector('.splide-counter .total');

        splide.on('mounted move', function () {
          counterCurrent.textContent = splide.index + 1;
          counterTotal.textContent   = splide.length;
        });

        splide.mount();
      
      });


    }
  };

})(jQuery, Drupal, once);