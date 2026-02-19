(function ($, Drupal, once) {

  'use strict';

  Drupal.behaviors.splide = {
    attach: function (context, settings) {
      $(document).ready(function() {

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


// serach

once('splide-init-seacrh-1', '.view-content-search-1', context).forEach(function(element) {
  var seacrhSplide1 = new Splide(element, {
    classes: {
      list: 'view-content-search1', 
      slide: 'splide__slide',  
    },
    direction: 'rtl',
    gap: '80px',
    pagination: false,
    perPage: 4,
    breakpoints: {
      1700:{
        gap: '40px',
      },
      1600: {
        gap: '40px',
        perPage: 3,
      },
      1330: {
        gap: '40px',
        perPage: 2,             
      },
      1024: {
        gap: '40px',
        perPage: 2,             
      },
      600: {
        perPage: 1,             
      },
    },
  });

  const counterCurrent1 = document.querySelector('.search-counter-1 .current');
  const counterTotal1   = document.querySelector('.search-counter-1 .total');

  seacrhSplide1.on('mounted move', function () {
    counterCurrent1.textContent = seacrhSplide1.index + 1;
    counterTotal1.textContent   = seacrhSplide1.length;
  });

  seacrhSplide1.mount();

});

once('splide-init-seacrh-2', '.view-content-search-2', context).forEach(function(element) {
  var seacrhSplide2 = new Splide(element, {
    classes: {
      list: 'view-content-search-2', 
      slide: 'splide__slide',  
    },
    direction: 'rtl',
    gap: '30px',
    pagination: false,
    perPage: 5,
    breakpoints: {
      1700:{
        gap: '20px',
      },
      1600: {
        perPage: 4,
      },
      1330: {
        gap: '20px',
        perPage: 3,             
      },
      1024: {
        gap: '20px',
        perPage: 3,             
      },
      800: {
        perPage: 2,             
      },
      560: {
        perPage: 1, 
      }
    },
  });

  const counterCurrent2 = document.querySelector('.search-counter-2 .current');
  const counterTotal2   = document.querySelector('.search-counter-2 .total');

  seacrhSplide2.on('mounted move', function () {
    counterCurrent2.textContent = seacrhSplide2.index + 1;
    counterTotal2.textContent   = seacrhSplide2.length;
  });

  seacrhSplide2.mount();

});

      });
    }
  };

})(jQuery, Drupal, once);