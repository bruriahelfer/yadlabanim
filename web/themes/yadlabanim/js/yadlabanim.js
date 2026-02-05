(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.yadlabanim_js = {
    attach: function (context, settings) {
      $(document).ready(function() {


        // main menu

        $("#block-yadlabanim-mainmenu .menu-level-0 > li.menu-item--expanded").on('click', function (e) { 
          if ($(this).hasClass('open-sub-menu')) {
            $("body").removeClass('sub-menu-open');
            $(this).removeClass('open-sub-menu');
          } else {
            if ($("body").hasClass('sub-menu-open')){
              $("#block-yadlabanim-mainmenu .menu-level-0 > li.open-sub-menu").addClass('to-be-removed');
              $("#block-yadlabanim-mainmenu .menu-level-0 > li.open-sub-menu").removeClass('open-sub-menu');
              $(this).addClass('open-sub-menu');
              setTimeout(() => {
                $("#block-yadlabanim-mainmenu .menu-level-0 > li.to-be-removed").removeClass('to-be-removed');
              }, 1000);
            } else {
              $(this).addClass('open-sub-menu');
              $("body").addClass('sub-menu-open');
              $(".bottom.search-open").removeClass('search-open');
            }
          }
        });

        $(".search-button").on('click', function (e) { 
          if ($(this).parent().hasClass('search-open')) {
            $(this).parent().removeClass('search-open');
          } else {
            $(this).parent().addClass('search-open');
            $("body").removeClass('sub-menu-open');
            $("#block-yadlabanim-mainmenu .menu-level-0 > li.open-sub-menu").removeClass('open-sub-menu');
          }
        });

        $(document).on('click', function(e) {
          if (!$(e.target).closest('header').length) {
            $("body").removeClass('sub-menu-open');
            $("#block-yadlabanim-mainmenu .menu-level-0 > li.open-sub-menu").removeClass('open-sub-menu');
            $(".bottom.search-open").removeClass('search-open');
          }
        });

        // gallery
        function updateImageTitlesWidth() {
          $('.field--name-field-media-image img[data-title="true"]').each(function() {
            var $img = $(this);
            var $title = $img.siblings('.image-title');
            if ($title.length) {
              $title.width($img.width());
            }
          });
        }

        // Initial set
        updateImageTitlesWidth();

        // Update on window resize
        $(window).on('resize', function() {
          updateImageTitlesWidth();
        });

        // fallen menu

        $("header .open-close-arrow").on('click', function (e) { 
          if ($("header").hasClass('close-side-menu')){
            $("header").removeClass('close-side-menu').addClass('open-side-menu');
            $(".open-close-arrow .open-icon").addClass('hide');
            $(".open-close-arrow .close-icon").removeClass('hide');
            setTimeout(function() {
              $("header").addClass('side-menu-activated');
            }, 500);            
          } else {
            $("header").removeClass('open-side-menu').addClass('close-side-menu').removeClass('side-menu-activated');
            $(".open-close-arrow .close-icon").addClass('hide');
            $(".open-close-arrow .open-icon").removeClass('hide');
            $("body").removeClass('sub-menu-open');
            $(".open-sub-menu").removeClass('open-sub-menu');
          }
        });



      });
     }
  };

})(jQuery, Drupal);

