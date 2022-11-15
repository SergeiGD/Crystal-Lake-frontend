$(document).ready(function(){

    const myEvents = [
        { 
            id: "required-id-3",
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


    // $('#evoCalendar').on('selectMonth', function(){
    //     $(".event-indicator").each(function(){              // если на день есть событие, то номер занят
    //         $(this).parent().addClass('day-busy');
    //     });
    // });

    $('.calendar-events').addClass('calendar-events__required');
   

    $('#evoCalendar').on('selectMonth', function(){
        $(".event-indicator").each(function(){              // если на день есть событие, то номер занят
            $(this).parent().addClass('day-enable');
        });

    });

    $('#evoCalendar').evoCalendar('selectMonth', new Date().getMonth());    // выбираем текущий месяц

    // $('#evoCalendar').on("selectDate", function(){
    //     console.log("asd")
    //     $(this).evoCalendar('toggleEventList', true);
    // });

    

    $('#evoCalendar').evoCalendar('selectMonth', new Date().getMonth());    // выбираем текущий месяц

});