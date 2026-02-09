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

        if ($("body").hasClass('page-node-fallen')) {

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

          // tabs - fallen page

          $(window).on('scroll', function() {
            var scrollPos = $(window).scrollTop() + 100; 
            
            $('.content-tab').each(function() {
              var target = $(this);
              var targetId = target.attr('id');
              var targetTop = target.offset().top - 60;
              var targetBottom = targetTop + target.outerHeight();
              
              if (scrollPos >= targetTop && scrollPos < targetBottom) {
                $('.menu-tabs a').removeClass('active');
                $('.menu-tabs a[href="#' + targetId + '"]').addClass('active');
              }
            });
          });

          if ($('.content-tab').length > 0) {
            var firstTab = $('.content-tab').first().attr('id');
            $('.menu-tabs a[href="#' + firstTab + '"]').addClass('active');
          }

          // cut body - fallen page

          if (($("#body .field__item").css('height', 'auto').height()>244)) {
              $("#body .read-more").removeClass('hide');
              $("#body .field__item").css('height', '245px');
          }
          $("#body .read-more").unbind('click').bind('click', function (e) {
              var nav = $(this).parent().find('.field__item');
              var curHeight = nav.height();
              var autoHeight = nav.css('height', 'auto').height(); 
              nav.height(curHeight);
              nav.stop().animate({ height: autoHeight }, 500);
              $("#body .read-more").addClass('hide');
          });

        }













      });
     }
  };

})(jQuery, Drupal);

