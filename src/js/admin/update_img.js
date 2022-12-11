$(document).ready(function(){
    $('#edit_main_info_form').on('click', '.update_img_button', function(){
        $(this).siblings('.update_img_input').trigger('click');     // при клике вызываем скрытый загрузчик файлов
    });

    $('#edit_main_info_form').on('change', '.update_img_input', function(){
        file = $(this).get(0).files[0];                          // получаем загруженный файл

        if(file){
            const img_elem = $(this).siblings('img');
            const reader = new FileReader();

            reader.onloadend = function(){
                var img_src = reader.result;                            // получаем base64 картинки

                img_elem.attr('src', img_src);                          // устанавливаем img новый src
            }

            reader.readAsDataURL(file);
        }
    });

})