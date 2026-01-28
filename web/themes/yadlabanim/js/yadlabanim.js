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

        // parallax



      });
     }
  };

})(jQuery, Drupal);

