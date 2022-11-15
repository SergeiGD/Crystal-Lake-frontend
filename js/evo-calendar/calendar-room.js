$(document).ready(function(){

    const myEvents = [
        { 
          name: "busy", 
          date: "2022/11/11",
          type: "busy", 
        },
        { 
            name: "busy", 
            date: "2022/11/12",
            type: "busy", 
        },
        { 
            name: "busy", 
            date: "2022/11/13",
            type: "busy", 
        },
    ];


    $('#evoCalendar').evoCalendar({
        calendarEvents: myEvents,

        format: 'yyyy/mm/dd',

        sidebarDisplayDefault: false,
        sidebarToggler: true,

        eventDisplayDefault: false,
        eventListToggler: false,

        language:'ru',

        firstDayOfWeek: 1
    });


    $('#evoCalendar').on('selectMonth', function(){
        $(".event-indicator").each(function(){              // если на день есть событие, то номер занят
            $(this).parent().addClass('day-busy');
        });
    });

    $('#evoCalendar').evoCalendar('selectMonth', new Date().getMonth());    // выбираем текущий месяц

});