import './evo-calendar'

$(document).ready(function(){

    const myEvents = [
        { 
            id: "required-id-1",
            name: "busy", 
            date: "2022/11/11",
            type: "enable", 
            name:"15:00 - 17:00",
            description:"3 мест(а)"
        },

    ];


    $('#evoCalendar').evoCalendar({
        calendarEvents: myEvents,

        format: 'yyyy/mm/dd',

        sidebarDisplayDefault: false,
        sidebarToggler: true,

        eventListToggler: false,

        eventDisplayDefault: false,

        language:'ru',

        firstDayOfWeek: 1
    });

    $('.calendar-events').addClass('calendar-events__required');
   

    $('#evoCalendar').on('selectMonth', function(){
        $(".event-indicator").each(function(){              // если на день есть событие, то номер занят
            $(this).parent().addClass('day-enable');
        });

    });

    $('#evoCalendar').evoCalendar('selectMonth', new Date().getMonth());    // выбираем текущий месяц
    

    $('#evoCalendar').evoCalendar('selectMonth', new Date().getMonth());    // выбираем текущий месяц

});