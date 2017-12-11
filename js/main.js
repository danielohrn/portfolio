'use strict'; 

// Header module 
const headerModule = (function(){

    // DOM 
    const main = document.querySelector('main'); 
    main.className = 'main-initial'; 

    const header = document.querySelector('header');
    header.className = 'header-initial'; 

    const nav = header.querySelector('#navLinks');  

    window.addEventListener('scroll', colapseHeader); 

    function colapseHeader(e){
        const NAV_POSITION = 350; 
        console.log(window.scrollY, nav.scrollY); 
        if(window.scrollY >= NAV_POSITION) {
            header.classList.add('header-colapsed'); 
            header.classList.remove('header-initial'); 
            main.className = 'main-normal';  
        } else {
            header.classList.remove('header-colapsed'); 
            header.classList.add('header-initial');  
            main.className = 'main-initial'; 
        }
    }

})(); 

    