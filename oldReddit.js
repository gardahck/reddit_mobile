const BODY = document.querySelector('body');
const VIEWPORT = document.querySelector('meta[name=viewport');
const IFRAME = document.querySelector('iframe');
const VP_CONTENT = 'width=device-width,initial-scale=1, maximum-scale=1';
const MENU = document.querySelector('body #header .sr-list');
const SIDEBAR = document.querySelector('body>.side');
const ENTRIES = document.querySelectorAll('body > .content > .sitetable > .thing');

let xStart = 0;

if(VIEWPORT.getAttribute('content') !== VP_CONTENT)
	VIEWPORT.setAttribute('content', VP_CONTENT)

if (window.location.href.indexOf("/comments/") > -1) {
	VIEWPORT.setAttribute('content', 'width=device-width,initial-scale=1')
	document.querySelector('.thing .thumbnail').style.display ='none';
}

ENTRIES.forEach(entry => {
	if (window.location.href.indexOf("/comments/") === -1) {
		const spacer = document.createElement('img');
		const spacerHeight =  entry.querySelector('.thumbnail') ? entry.querySelector('.thumbnail').clientHeight === 0 ? 50 : entry.querySelector('.thumbnail').clientHeight : 50;
		
		spacer.classList.add('imgwrap');
		spacer.setAttribute('style', `height:${spacerHeight}px`);
		spacer.setAttribute('align', 'left');
		entry.querySelector('.entry').prepend(spacer);
		
		// if(entry.querySelector('.thumbnail img')){
		// 	console.log(entry.querySelector('.entry'))
		// 	entry.querySelector('.entry').style.left="120px";
		// }

		//set up blocking
		if(entry.querySelector('.subreddit')){
			const tagline = entry.querySelector('.subreddit')
			const subreddit = tagline.href.split('/').at(-2);
			const blockLink = document.createElement('li');

			blockLink.addEventListener('click', (e)=>{
				e.preventDefault();
				const hidden = localStorage.getItem('hidden') ? localStorage.getItem('hidden') : null ;
				if(hidden){
					if(!hidden.includes( `-${subreddit}`)){
						localStorage.setItem('hidden', `${hidden}|-${subreddit}` )
						entry.style.display='none';
					}
				}else{
					localStorage.setItem('hidden', `-${subreddit}`)
					entry.style.display='none';
				}
			})
			const hidden = localStorage.getItem('hidden');
		blockLink.innerHTML = '<a class="blockLink" href="#">block</a>'
		entry.querySelector('.flat-list.buttons').appendChild(blockLink)
		if(hidden){
			if(hidden.includes( `-${subreddit}`)){
				entry.style.display='none';
			}
		}
		}

		

	}
});

//add blocked list
const hidden = localStorage.getItem('hidden') ? localStorage.getItem('hidden') : null ;
if(hidden){
	const footer = document.querySelector('.footer-parent')
	const blockList = document.createElement('div');
	blockList.setAttribute('id', 'blockList');
	blockList.innerHTML = getHidden();
	function getHidden() {
		const hidden = localStorage.getItem('hidden').split('|');
		let result='';
		hidden.forEach(function (blocked) {
			result += `<div class="blockedItem">${blocked.replace('-', '')}</div>`;
		});
		return result;
	}
	footer.prepend(blockList);

	const blockedItems = document.querySelectorAll('.blockedItem');
	blockedItems.forEach(blockedItem => blockedItem.addEventListener('click', e => {
		const hidden = localStorage.getItem('hidden').split('|');
		hidden.pop('-'+ e.target.innerHTML);
		localStorage.removeItem('hidden');
		if(hidden.length > 0){
			localStorage.setItem('hidden', hidden.join('|'));
		}
		e.target.remove();
	}));

	const blockButton = document.createElement('div');
	blockButton.innerHTML = 'Blocked List';
	blockButton.setAttribute('id', 'blockButton');
	blockButton.addEventListener('click', ()=>{
		const blockList = document.getElementById('blockList');
		if(blockList.classList.contains('showBlockList')){
			blockList.classList.remove('showBlockList')
		}else{
			blockList.classList.add('showBlockList')
		}
	})
	footer.prepend(blockButton);
}

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
