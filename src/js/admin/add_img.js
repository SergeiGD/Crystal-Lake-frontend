$(document).ready(function(){

    var last_loaded_index = -1

    $('#upload_new_img_button').on('click', function(){
        $( '#upload_new_img_input' ).trigger( 'click' );            // при клике вызываем скрытый загрузчик файлов
    });

    $('#upload_new_img_input').on('change', function(){
        files_list = $(this).get(0).files;                          // получаем коллекцию загруженных файлов

        if(files_list && files_list.length != last_loaded_index){
            var items_count =  $('#accordion_body_images').children('[data-order]').length;
            var img_order = items_count + 1;
            var reader = new FileReader();

            var img_src = ''
            reader.onloadend = function(){
                img_src = reader.result;                            // получаем base64 картинки
                built_elem =  create_container(img_order, img_src);
                $('#upload_new_img_container').before(built_elem);  // строим новый элемент с картинкой и отображаем его

                $('#accordion_body_images').trigger('refresh_required');    // вызываем обновление стрелок
            }

            var file = files_list[last_loaded_index + 1];           // получаем последнюю картинку
            if (file){
                reader.readAsDataURL(file);
            }

        }
    });

    function create_container(order, src){
        return  `
            <div class="col-lg-4 col-sm-6 col-12 mb-4" data-order="${order}">

                <div class="w-100">
                    <span class="input-group-text rounded-top rounded-0">Фото ${order}:</span>
                    <div class="img_wrapper">

                        <img src="${src}" alt="Фото" class="img-fluid w-100 img">

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

});