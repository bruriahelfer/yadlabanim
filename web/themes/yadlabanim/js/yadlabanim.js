(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.yadlabanim_js = {
    attach: function (context, settings) {
      $(document).ready(function() {


        // list - gallery
        // Load saved preference on page load
        var savedView = localStorage.getItem('galleryView');
        if (savedView) {
          $(".list-gallery .active").removeClass('active');
          $(".list-gallery ." + savedView).addClass('active');
          $(".list-gallery .gallery").addClass('active');
          $(".view").removeClass('grid-5').removeClass('list').addClass(savedView);
        }

        $(".list-gallery > div").unbind('click').bind('click', function (e) {
          if (!$(this).hasClass('active')) {
            var clicked = $(this).attr('class');
            $(".list-gallery .active").removeClass('active');
            $(this).addClass('active');
            $(".list-gallery .gallery").addClass('active');
            $(".view").removeClass('grid-5').removeClass('list').addClass(clicked);

            // Save preference
            localStorage.setItem('galleryView', clicked);
          }
        });
        $(".view-content").css('opacity', '1');

        // load more

      once('auto-load-more', '.view-fallen', context).forEach(function (view) {
        var isLoading = false;

        function checkPagerVisibility() {
          var $pager = $(view).find('.pager--load-more .pager__item a');

          if ($pager.length === 0 || isLoading) return;

          var pagerTop = $pager[0].getBoundingClientRect().top;
          var windowHeight = window.innerHeight;

          if (pagerTop <= windowHeight) {
            isLoading = true;

            // Mark all current rows BEFORE clicking load more
            $('.view-fallen .views-row').attr('data-loaded', 'true');

            $pager[0].click();

            $(document).one('ajaxComplete', function () {
              isLoading = false;

              // Now find rows WITHOUT the marker = new rows
              var $newRows = $('.view-fallen .views-row:not([data-loaded])');

              $newRows.css({ opacity: 0, transform: 'translateY(40px)' });

              $newRows.each(function (index) {
                var $row = $(this);
                setTimeout(function () {
                  $row.css({
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    opacity: 1,
                    transform: 'translateY(0)',
                  });
                  $row.attr('data-loaded', 'true');
                }, index * 80);
              });

              setTimeout(checkPagerVisibility, 300);
            });
          }
        }

        $(window).on('scroll.autoLoadMore', checkPagerVisibility);
        setTimeout(checkPagerVisibility, 500);
      });


        // filters - search page

        $(".filter-icon").unbind('click').bind('click', function (e) {
          if ($(this).closest("form").find(".filters-wrapper").hasClass('hide')) {
            $(this).closest("form").find(".filters-wrapper").removeClass('hide');
          } else {
            $(this).closest("form").find(".filters-wrapper").addClass('hide');
          }
        });

        $(".search-icon").unbind('click').bind('click', function (e) {
          $(this).closest("form").find("[id^=edit-submit]").click();
        });

        // main menu

        $("#block-yadlabanim-mainmenu .menu-level-0 > li.menu-item--expanded").unbind('click').bind('click', function (e) {
          if ($(this).hasClass('open-sub-menu')) {

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

        $(".search-button").unbind('click').bind('click', function (e) { 
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

        if ($(".open-close-arrow").length > 0) {

          // fallen menu

          $("header .open-close-arrow").unbind('click').bind('click', function (e) {
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
        }
          // file field
        if ($("body").hasClass('page-node-fallen')) {

          function updateFileFieldState() {
            $('.js-form-type-managed-file').each(function () {
              const hasFile = $(this).find('.js-form-managed-file .file').length > 0;
              $(this).toggleClass('has-file', hasFile);
            });
          }
          updateFileFieldState();
          $(document).on('ajaxComplete', function () {
            updateFileFieldState();
          });

          // fallen - message

          if ($("body").hasClass('page-node-fallen') && $('.region-wrapper [data-drupal-messages]').length > 0) {
            $('.region-wrapper').closest('.lightbox').addClass('show');
            $("body").addClass('lightbox-show');
          }
          // description with ul and counter of dedic comment

          var $textarea = $(".js-form-item-field-dedic-0-value textarea");
          var $description = $textarea.closest('.form-item').find('.description');
          var $ul = $description.find('ul');
          var $counter = $description.find('.counter');
          var $number = $counter.find('.number');
          var maxLength = 400;
          if ($ul.length === 0) {
            return;
          }

          function updateCounter() {
            var length = $textarea.val().length;
            if (length > maxLength) {
              $textarea.val($textarea.val().substring(0, maxLength));
              length = maxLength;
            }
            $number.text(length);
          }

          $textarea.on('input', function() {
            var value = $(this).val().trim();
            if (value.length > 0) {
              $ul.css("opacity", "0");
            } else {
              $ul.css("opacity", "1");
            }
            updateCounter();
          });

            // Click suggestion
          $ul.find('li').on('click', function() {
            var text = $(this).text();
            $textarea.val(text);
            $ul.css("opacity", "0");
            $textarea.focus();
            updateCounter(); // Update counter after inserting text
          });

            // Initialize counter on page load
          updateCounter();


          var $textareaMemo = $(".js-form-item-field-file-description-0-value textarea");
          var $descriptionMemo = $textareaMemo.closest('.form-item').find('.description');
          var $counterMemo = $descriptionMemo.find('.counter');
          var $numberMemo = $counterMemo.find('.number');
          var maxLengthMemo = 300;

          function updateCounterMemo() {
            var length = $textareaMemo.val().length;
            if (length > maxLengthMemo) {
              $textareaMemo.val($textareaMemo.val().substring(0, maxLengthMemo));
              length = maxLengthMemo;
            }
            $numberMemo.text(length);
          }

          $textareaMemo.on('input', function() {
            var value = $(this).val().trim();
            updateCounterMemo();
          });

          // lightbox

          // Show the lightbox
          $(".lightbox-open").unbind('click').bind('click', function (e) { 
            $(this).closest('.lightbox-wrapper').find('.lightbox').addClass('show');
            $("body").addClass('lightbox-show');
          });

          // Close lightbox on click of the close button
          $(".lightbox .close img").unbind('click').bind('click', function (e) { 
            $(this).closest('.lightbox').removeClass('show');
            $("body").removeClass('lightbox-show');
          });
          $(".lightbox").unbind('click').bind('click', function (e) { 
            if (!$(e.target).closest('.wrapper').length) {
              $(this).removeClass('show');
              $("body").removeClass('lightbox-show');
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

