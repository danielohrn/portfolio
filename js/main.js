'use strict'; 

const Page = (function(){

    // DOM elements 
    const main = document.querySelector('main'); 
    const presentation = main.querySelector('#presentation'); 
    const mySkills = main.querySelector('#mySkills'); 
    const myWork = main.querySelector('#myWork'); 
    const contactMe = main.querySelector('#contactMe'); 
    const aboutKyh = main.querySelector('#aboutKyh'); 
    
    const scrollAnchor = document.querySelector('#scrollAnchor'); 
    
    // TODO: Clean up
    // Change to offsetHeight? 
    function getSectionPos(section){
        return section.getBoundingClientRect().top;        
    }
    
    // Page info object 
    const pageInfo = {
        sections: {
            presentation: {
                element: presentation,
                yPos: presentation.offsetTop
            },
            mySkills: {
                element: mySkills,                
                yPos: mySkills.offsetTop
            },
            myWork: {
                element: myWork,                
                yPos: myWork.offsetTop
            },
            contactMe: {
                element: contactMe,                
                yPos: contactMe.offsetTop
            },
            aboutKyh: {
                element: aboutKyh,                
                yPos: aboutKyh.offsetTop
            }
        }, 
        scrollAnchorYpos: scrollAnchor.getBoundingClientRect().top
    }

    // TODO: Clean up 
    typeWriteHandler(document.querySelector('.me h1').innerText, document.querySelector('.me h1'), 100, true); 
    typeWriteHandler(document.querySelector('.me h2').innerText, document.querySelector('.me h2'), 100, true); 
    
    function typeWriteHandler(phrase, target, speed = 1000, clearHTML = false){
        console.log(clearHTML); 
        let phraseToWrite = Array.from(phrase); 

        if(clearHTML) {
            console.log(phrase)            
            target.innerHTML = ""; 
        }

        let counter = 0; 

        let interval = setInterval(function(){
            typeWrite(); 
        },speed); 

        function typeWrite(){
            if(counter >= phraseToWrite.length) {
                clearInterval(interval); 
                console.log('cleared'); 
            } else {
                target.innerHTML += phraseToWrite[counter];
                counter++;
            }
        }

    }

    function scroll(yPos, xPos = 0){
        window.scrollTo({top: yPos, left: xPos, behavior: 'smooth'}); 
    }

    scrollAnchor.addEventListener('click', function(){
        scroll(scrollAnchor.dataset.target); 
    })

    // TODO: Clean up
    window.addEventListener('scroll', function(e){
        if(window.scrollY >= pageInfo.scrollAnchorYpos) {
            document.querySelector('header').className = 'header-scrolling';
            scrollAnchor.classList.add('arrow-flipped');
            scrollAnchor.dataset.target = 0;             
        } else {
            document.querySelector('header').className = 'header-initial'; 
            scrollAnchor.classList.remove('arrow-flipped'); 
            scrollAnchor.dataset.target = pageInfo.sections.mySkills.yPos;             
        }
    })

   return {
       pageInfo,
       scroll,
       getSectionPos
   }

})();

// TODO: Clean up
const HeaderModule = (function(){

    // DOM  
    const header = document.querySelector('#header'); 
    const navLinks = header.querySelector('#navLinks'); 
    const socialLinks = header.querySelector('#socialLinks'); 
    const socialLinksToggle = header.querySelector('#socialLinksToggle'); 
    const hamburger = header.querySelector('#hamburger i'); 

    navLinks.addEventListener('click', navigate); 
    socialLinksToggle.addEventListener('click', toggleHide); 
    hamburger.addEventListener('click', toggleMenu); 

    function toggleHide(e) {
        const target = e.target; 
        socialLinks.classList.toggle('hidden'); 
    }

    function toggleMenu(e) {
        const target = e.target; 
        header.querySelector('nav').classList.toggle('open'); 
        target.className == 'fa fa-hand-o-left fa-3x' ? target.className = 'fa fa-hand-o-right fa-3x' : target.className = 'fa fa-hand-o-left fa-3x'; 
    }

    function navigate(e){
        const target = e.target; 
        if(target.nodeName == 'LI' && target.dataset.section) {
            console.log(Page.pageInfo.sections[target.dataset.section]); 
            Page.scroll(Page.pageInfo.sections[target.dataset.section].yPos); 
        }
    }

})();


