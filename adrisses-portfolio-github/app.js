const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
if(menuButton&&nav){
 const close=()=>{menuButton.setAttribute('aria-expanded','false');nav.classList.remove('is-open');menuButton.querySelector('span').textContent='＋';};
 menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);menuButton.querySelector('span').textContent=open?'−':'＋';});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const wasOpen=nav.classList.contains('is-open');close();if(wasOpen)menuButton.focus();}});
 window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)close();});
}
const typed=document.querySelector('#typed-role');
if(typed&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const word='Designer';let length=word.length;let removing=true;let timer;
 const tick=()=>{if(document.hidden){timer=setTimeout(tick,1000);return;}length+=removing?-1:1;typed.textContent=word.slice(0,length)||'\u200b';let delay=removing?75:125;if(length===0){removing=false;delay=420;}if(length===word.length){removing=true;delay=4500;}timer=setTimeout(tick,delay);};
 timer=setTimeout(tick,4500);
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');motion.addEventListener('change',e=>{if(e.matches){clearTimeout(timer);typed.textContent=word;}});
}
