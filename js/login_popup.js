$( function() {
    $("#login_open").on("click", function(){
        $("#login_popup").toggleClass("login_popup__active");
        $('.header_burger, .header_menu__mobile').removeClass('burger__active');    // скрываем бургер, чтоб не загораживал
    });

    $("#login_close, #signup_close").on("click", function(){
        $(this).closest('.login_popup').removeClass("login_popup__active");
    });

    $("#end_login_button").on("click", function(){
        window.location.href = "profile_active.html";
    });
    
    $("#goto_singup").on("click", function(){
        $("#login_popup").toggleClass("login_popup__active");
        $("#signup_popup").toggleClass("login_popup__active");
    });

    $("#goto_login").on("click", function(){
        $("#signup_popup").toggleClass("login_popup__active");
        $("#login_popup").toggleClass("login_popup__active");
    });
  });