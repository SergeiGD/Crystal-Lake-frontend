$(document).ready(function(){

    function update_arrows(){
        $('.move_prev, .move_next').removeClass('opacity-50');

        const first_elem =$('#accordion_body_images').children('[data-order]:first');
        const last_elem = $('#accordion_body_images').children('[data-order]:last');

        first_elem.find('.move_prev').first().addClass('opacity-50');
        last_elem.find('.move_next').last().addClass('opacity-50');
    }

    $('#accordion_body_images').on('click', '.move_next', function(){
        const current_item = $(this).closest('[data-order]');
        const number = current_item.attr('data-order');

        if (number == $(current_item).siblings('[data-order]').length) return;      // элемент является крайним, если число его братьев == его номеру (номера с нуля)

        const next_item = current_item.next();

        current_item.insertAfter(next_item);
        current_item.attr('data-order', Number(number) + 1);
        next_item.attr('data-order', Number(number));

        update_arrows();
    });

    $('#accordion_body_images').on('click', '.move_prev', function(){
        const current_item = $(this).closest('[data-order]');
        const number = current_item.attr('data-order');

        if (number == 0) return;

        const prev_item = current_item.prev();

        current_item.insertBefore(prev_item);
        current_item.attr('data-order', Number(number) - 1);
        prev_item.attr('data-order', Number(number));

        update_arrows();
    });

    $('#accordion_body_images').on('refresh_required', function(){
        update_arrows();
    });


});