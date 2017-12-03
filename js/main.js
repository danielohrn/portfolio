'use strict'; 

const Page = (function(){

    // DOM elements 
    const presentation = document.querySelector('#presentation'); 
    const mySkills = document.querySelector('#mySkills'); 
    const myWork = document.querySelector('#myWork'); 
    const contactMe = document.querySelector('#contactMe'); 
    const aboutKyh = document.querySelector('#aboutKyh'); 
    
    const scrollAnchor = document.querySelector('#scrollAnchor'); 
    
    // Page info object 
    const pageInfo = {
        sections: {
            presentation: {
                yPos: presentation.getBoundingClientRect().top, 
            },
            mySkills: {
                yPos: mySkills.getBoundingClientRect().top
            },
            myWork: {
                yPos: myWork.getBoundingClientRect().top
            },
            contactMe: {
                yPos: contactMe.getBoundingClientRect().top
            },
            aboutKyh: {
                yPos: aboutKyh.getBoundingClientRect().top
            }
        }, 
        scrollAnchorYpos: scrollAnchor.getBoundingClientRect().top
    }

    function scroll(yPos, xPos = 0){
        window.scrollTo({top: yPos, left: xPos, behavior: 'smooth'}); 
    }

    scrollAnchor.addEventListener('click', function(){
        scroll(scrollAnchor.dataset.target); 
    })


    window.addEventListener('scroll', function(e){
        if(window.scrollY >= pageInfo.scrollAnchorYpos) {
            scrollAnchor.classList.add('arrow-flipped');
            scrollAnchor.dataset.target = 0;             
        } else {
            scrollAnchor.classList.remove('arrow-flipped'); 
            scrollAnchor.dataset.target = pageInfo.sections.mySkills.yPos;             
        }
    })

   return {
       pageInfo,
       scroll
   }

})();

const HeaderModule = (function(){

    // DOM
    const header = document.querySelector('#header'); 
    const navLinks = header.querySelector('#navLinks'); 

    navLinks.addEventListener('click', navigate); 

    function navigate(e){
        const target = e.target; 
        if(target.nodeName == 'LI' && target.dataset.section) {
            Page.scroll(Page.pageInfo.sections[target.dataset.section].yPos);  
        }
    }

})();


