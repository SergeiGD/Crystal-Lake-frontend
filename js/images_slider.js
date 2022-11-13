"use strict";

$(document).ready(function(){
    $('.photos_img').on("click", function(){
        $("#images_modal").toggleClass("modal_wrapper__active");
    });

    $('#images_modal, #images_close').on("click", function(){
        $("#images_modal").removeClass("modal_wrapper__active");
    });

    $(".images").on("click", function(e) {
        e.stopPropagation();
    });

    $('.images').on('swipeleft', function(){
        $("#images_next").trigger("click");
    });

    $('.images').on('swiperight', function(){
        $("#images_prev").trigger("click");
    });
   

   $(document).on("keyup", function(e) {
        if (e.key === "Escape") { 
            $('#images_modal').trigger('click');
        }
    });

    $("#images_next").on("click", function(){
        const current_img = $(this).siblings('.images_popup_item__active');
        var next_img = current_img.next('.images_popup_item');
        if(next_img.length == 0){
            next_img = $(this).siblings('.images_popup_item').first();
        }
        current_img.removeClass('images_popup_item__active');
        next_img.addClass('images_popup_item__active');
    });

    $("#images_prev").on("click", function(){
        const current_img = $(this).siblings('.images_popup_item__active');
        var next_img = current_img.prev('.images_popup_item');
        if(next_img.length == 0){
            next_img = $(this).siblings('.images_popup_item').last();
        }
        current_img.removeClass('images_popup_item__active');
        next_img.addClass('images_popup_item__active');
    });
});