const BODY = document.querySelector('body');
const VIEWPORT = document.querySelector('meta[name=viewport');
const IFRAME = document.querySelector('iframe');
const VP_CONTENT = 'width=device-width,initial-scale=1, maximum-scale=1';
const MENU = document.querySelector('body #header .sr-list');
const SIDEBAR = document.querySelector('body>.side');

let xStart = 0;

if(VIEWPORT.getAttribute('content') !== VP_CONTENT)
    VIEWPORT.setAttribute('content', VP_CONTENT)
VIEWPORT.setAttribute('content', 'width=device-width,initial-scale=1')

IFRAME.setAttribute('width', '100%')


document.addEventListener('touchstart', startTouch, false, true);
document.addEventListener('touchend', endTouch, false, true);

//hide/show sidebars
function startTouch(e){
    xStart= e.changedTouches[0].pageX;
}
function endTouch(e){
    //show/hide right sidebar
    if(xStart - e.changedTouches[0].pageX > 50 && xStart > window.innerWidth/2 && !MENU.classList.contains('active')){
        SIDEBAR.classList.add('active')
     //show/hide main menu
    }else if(xStart - e.changedTouches[0].pageX < -50 && xStart < window.innerWidth/2 && !SIDEBAR.classList.contains('active')){
        MENU.classList.add('active')
    }else if(xStart - e.changedTouches[0].pageX > 50){
        MENU.classList.remove('active')
    }else if(xStart - e.changedTouches[0].pageX < -50){
        SIDEBAR.classList.remove('active')
    }

    xStart=0;
}
