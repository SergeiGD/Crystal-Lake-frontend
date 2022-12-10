$(document).ready(function(){

    $('#accordion_body_images').on('click', '.upload_new_img_button', function(){
        $(this).siblings('.upload_new_img_input').trigger('click');     // при клике вызываем скрытый загрузчик файлов
    });

    $('#accordion_body_images').on('change', '.upload_new_img_input', function(){
        file = $(this).get(0).files[0];                          // получаем коллекцию загруженных файлов

        if(file){
            const items_count =  $('#accordion_body_images').children('[data-order]').length;
            const active_load_container = $(this).parent(':first');
            const img_order = items_count;
            const reader = new FileReader();

            reader.onloadend = function(){
                var img_src = reader.result;                            // получаем base64 картинки

                built_img =  create_img_container(img_order, img_src);
                active_load_container.parent().before(built_img);                           // строим новый элемент с картинкой и отображаем его

                new_load_container = built_load_container();
                active_load_container.after(new_load_container);                 // создаем новый контейнер с инпутом

                active_load_container.attr('hidden', true);                 // скрываем отработанный инпут
                $('#accordion_body_images').trigger('refresh_required');    // вызываем обновление стрелок
            }

            reader.readAsDataURL(file);
        }
    });

    function create_img_container(order, src){
        return  `
            <div class="col-lg-4 col-sm-6 col-12 mb-4" data-order="${order}">

                <div class="w-100">
                    <div class="img_wrapper">

                        <img src="${src}" alt="Доп. фото" class="img-fluid w-100 img rounded">

                        <button class="btn open_img btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#show_img_modal">
                            <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
                        </button>

                        <button class="btn btn-primary update_img w-10r">
                            <i class="fa-solid fa-arrow-up-from-bracket"></i>
                            Обновить
                        </button>

                        <button class="btn btn-danger delete_img w-10r">
                            <i class="fa-solid fa-xmark"></i>
                            Удалить
                        </button>

                    </div>
                </div>

                <div class="mt-2 text-center">
                    <i class="fa-solid fa-arrow-left fs-2 move_prev" role="button"></i>
                    <i class="fa-solid fa-arrow-right fs-2 ms-5 move_next" role="button"></i>
                </div>

            </div>
        `
    }

    function built_load_container(){
        return `
        <div class="w-100">
            <button class="btn btn-c_yellow-700 btn-lg w-100 mx-auto upload_new_img_button" type="button">Загрузить еще</button>
            <input type="file" class="upload_new_img_input" accept="image/png, image/gif, image/jpeg"/ hidden>
        </div>
        `
    }

});