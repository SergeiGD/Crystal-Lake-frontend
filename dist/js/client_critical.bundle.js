/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************!*\
  !*** ./src/js/client_critical.js ***!
  \***********************************/
// HEADER BURGER MENU

const header_burger = document.getElementsByClassName('header_burger')[0];
const header_menu = document.getElementsByClassName('header_menu')[0];
header_burger.addEventListener('click', function(){
    header_burger.classList.toggle('burger__active');
    header_menu.classList.toggle('burger__active');
});


// REDIRECT

for(elem of document.querySelectorAll('[data-goto]')){
    elem.addEventListener('click', function(e){
        e.stopPropagation();
        window.location.href = e.currentTarget.getAttribute('data-goto');               // если есть атрибут goto, то перекидваем по значению
    });
}

document.getElementsByClassName('offers')[0]?.addEventListener('click',function(e){
    const elem = e.target.closest('[data-goto]');                                       // в списке офферов (скидки) есть элементы, добавляющиеся диначимески.
    if(!elem) return;                                                                   // поэтому будет искать в его дочерних элементах
    if (elem.dataset.goto) window.location.href = elem.dataset.goto;
 });
    
/******/ })()
;
//# sourceMappingURL=client_critical.bundle.js.map