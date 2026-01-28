(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.my_custom_basic = {
    attach: function (context, settings) {


      /**** hamburger  **********/

      $("body").addClass("close-menu");
      $("#menu-toggle #hamburger").unbind('click').bind('click', function (e) {
        if ($("body").hasClass("open-menu")){
          $("body").removeClass("open-menu");
          $("body").addClass("close-menu");
        }
        else {
          $("body").addClass("open-menu");
          $("body").removeClass("close-menu");
          $("body").removeClass("open-search");
        }
      });

      $(".layout-center").unbind('click').bind('click', function (e) {
          $("body").removeClass("open-menu");
          $("body").addClass("close-menu");

      });
    
      $("#menu-toggle .close-sub-menu").unbind('click').bind('click', function (e) {
          $("body").removeClass("more-details");
      });

  /******  input & textarea ********/
  $("input").on("focus",function(){
    $(this).parent().addClass("input-full");
 });

$("input").on("input",function(){
  if($(this).val() != ''){
    $(this).parent().addClass("input-full");
  } else {
    $(this).parent().removeClass("input-full");
  }
});

$("input").each(function(){
  if($(this).val() == ''){
    $(this).parent().removeClass("input-full");
  }
  else{
    $(this).parent().addClass("input-full");
  }
});

$("input").blur(function(){
  if($(this).val() == ''){
    $(this).parent().removeClass("input-full");
  }
  else{
    $(this).parent().addClass("input-full");
  }
});

$("textarea").on("focus",function(){
  $(this).parent().parent().addClass("input-full");
});


$("textarea").on("input",function(){
  if($(this).val() != ''){
    $(this).parent().parent().addClass("input-full");
  } else {
    $(this).parent().parent().removeClass("input-full");
  }
});

$("textarea").each(function(){
  if($(this).val() == ''){
    $(this).parent().parent().removeClass("input-full");
  }
  else{
    $(this).parent().parent().addClass("input-full");
  }
});

$("textarea").blur(function(){
  if($(this).val() == ''){
    $(this).parent().parent().removeClass("input-full");
  }
  else{
    $(this).parent().parent().addClass("input-full");
  }
});

$("select").each(function(){
  if ($(this).find("option:selected").attr('value')!=""){
    $(this).parent().addClass("input-full")
  } else {
    $(this).parent().removeClass("input-full")
  }
});

$('select').change(function(){
  if ($(this).find("option:selected").attr('value')!=""){
    $(this).parent().addClass("input-full");
  } else {
    $(this).parent().removeClass("input-full");
  }
});

      /********  link active   ***********/

     var path = window.location.href; 
     $('a').each(function() {
      if (this.href === path) {
       $(this).addClass('active');
      }
     });


     $("a.toscroll").on('click',function(e) {
      var url = e.target.href;
      var hash = url.substring(url.indexOf("#")+1);
      $('html, body').animate({scrollTop: $('#'+hash).offset().top - 60}, 500);
      $("body").removeClass("open-menu");
      return false;
    });

    $(".field--name-field-button a").on('click', function (e) {
      var url = e.target.href;
        if (url.includes("#") && url.indexOf("#") < url.length - 1) {
          var hash = url.substring(url.indexOf("#") + 1);
          var target = $('#' + hash);
            if (target.length) {
              $('html, body').animate({ scrollTop: target.offset().top - 120 }, 500);
              $("body").removeClass("open-menu");
              return false;
          }
      }
  });

        /********  scroll ********/

        var scroll_pos = 0;
        $(document).scroll(function(e) {
            scroll_pos = $(this).scrollTop();
            if(scroll_pos > 0) {
              $("body").addClass('scroll');
              $("body").removeClass('not-scroll');
            }
            else {
              $("body").removeClass('scroll');
              $("body").addClass('not-scroll');
            }
        });

        var screenTop = $(document).scrollTop();
        if (screenTop > 0){
              $("body").addClass('scroll');
        } else{
              $("body").addClass('not-scroll');
        }



     }
  };

})(jQuery, Drupal);