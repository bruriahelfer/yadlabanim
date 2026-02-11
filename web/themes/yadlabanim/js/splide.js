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
// Initialize gallery
once('splide-init-fallen-gallery', '.fallen-gallery', context).forEach(function(element) {
  var gallerySplide = new Splide(element, {
    direction: 'rtl',
    gap: '17px',
    autoWidth: true,
    pagination: false,
    classes: {
      list: 'fallen-gallery', 
      slide: 'splide__slide',  
    },
  });

  const counterCurrent = document.querySelector('.splide-counter .current');
  const counterTotal   = document.querySelector('.splide-counter .total');

  gallerySplide.on('mounted move', function () {
    counterCurrent.textContent = gallerySplide.index + 1;
    counterTotal.textContent   = gallerySplide.length;
  });

  gallerySplide.mount();

  // Add click to each gallery slide
  gallerySplide.Components.Elements.slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {

      // Show the lightbox
      const lightboxEl = document.querySelector('#images .lightbox');
      if (lightboxEl){
        lightboxEl.classList.add('show');
        setTimeout(function() {
          $(".lightbox").css("transition", "none");
        }, 1000)
      }

      // Jump immediately to the clicked slide in lightbox
      const lightboxSplideEl = document.querySelector('.fallen-lightbox');
      if (lightboxSplideEl && lightboxSplideEl.splideInstance) {
        lightboxSplideEl.splideInstance.go(index, false); // <-- no animation
      }
    });
  });
});

// Initialize lightbox Splide
once('splide-init-fallen-lightbox', '.fallen-lightbox', context).forEach(function(element) {

  var lightboxSplide = new Splide(element, {
    direction: 'rtl',
    gap: '80px',
    perPage: 1,
    pagination: false,
    type: 'loop',
    classes: {
      list: 'fallen-lightbox',
      slide: 'splide__slide',
    },
  });

  // Save the instance on the element so we can access it later
  element.splideInstance = lightboxSplide;

  const counterCurrent = document.querySelector('.splide-counter-lightbox .current');
  const counterTotal   = document.querySelector('.splide-counter-lightbox .total');
  const relevantTitle  = document.querySelector('.lightbox .relevant-title');

  function updateSlideData() {
    counterCurrent.textContent = lightboxSplide.index + 1;
    counterTotal.textContent   = lightboxSplide.length;

    if (relevantTitle) {
      relevantTitle.textContent = '';
    }

    const activeSlide = lightboxSplide.Components.Slides.getAt(lightboxSplide.index);

    if (activeSlide) {
      const titleEl = activeSlide.slide.querySelector('.image-title');
      if (titleEl && titleEl.textContent.trim() !== '' && relevantTitle) {
        relevantTitle.textContent = titleEl.textContent;
      }
    }
  }

  lightboxSplide.on('mounted move', updateSlideData);

  lightboxSplide.mount();
});




    }
  };

})(jQuery, Drupal, once);