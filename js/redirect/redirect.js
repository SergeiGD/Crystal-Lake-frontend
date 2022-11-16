"use strict";

$(document).ready(function(){

    $("[data-action=goto_rooms]").on('click', function(){
        window.location.href = "rooms.html";
    });

    $("[data-action=goto_room]").on('click', function(){
        window.location.href = "room.html";
    });

    $("[data-action=goto_room__book]").on('click', function(e){
        e.stopPropagation();
        window.location.href = "room.html#offer_book";
    });

    $("[data-action=goto_service]").on('click', function(){
        window.location.href = "service.html";
    });

    $("[data-action=goto_service__book]").on('click', function(e){
        e.stopPropagation();
        window.location.href = "service.html#offer_book";
    });

    $("[data-action=goto_sale]").on('click', function(){
        window.location.href = "sale.html";
    });

    // $('.card__room').on('click', function(){
    //     window.location.href = "room.html";
    // });

    // $('.card__service').on('click', function(){
    //     window.location.href = "service.html";
    // });

    // $('.card__sale').on('click', function(){
    //     window.location.href = "sale.html";
    // });
});