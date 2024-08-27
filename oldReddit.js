const BODY = document.querySelector('body');
const VIEWPORT = document.querySelector('meta[name=viewport');
const IFRAME = document.querySelector('iframe');
const VP_CONTENT = 'width=device-width,initial-scale=1, maximum-scale=1';
const MENU = document.querySelector('body #header .sr-list');
const SIDEBAR = document.querySelector('body>.side');
const ENTRIES = document.querySelectorAll('body .content .sitetable .thing');

let xStart = 0;

if(VIEWPORT.getAttribute('content') !== VP_CONTENT)
    VIEWPORT.setAttribute('content', VP_CONTENT)
if (window.location.href.indexOf("/comments/") > -1) {
    VIEWPORT.setAttribute('content', 'width=device-width,initial-scale=1')
    document.querySelector('.thing .thumbnail').style.display ='none';
}

ENTRIES.forEach(entry => {
    const spacer = document.createElement('img');
    const spacerHeight = entry.querySelector('.thumbnail').clientHeight === 0 ? 50 : entry.querySelector('.thumbnail').clientHeight;
    spacer.classList.add('imgwrap');
    spacer.setAttribute('style', `height:${spacerHeight}px`);
    spacer.setAttribute('align', 'left');
    entry.querySelector('.entry').prepend(spacer);
    if (window.location.href.indexOf("/comments/") > -1) {
        entry.querySelector('.thumbnail').style.display ='none';
        entry.querySelector('.entry').setAttribute('style', `margin-left:0`);
    }
});

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
