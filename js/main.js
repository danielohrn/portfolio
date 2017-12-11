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
                yPos: presentation.offsetTop,
                skillList: ['JavaScript', 'HTML5', 'CSS', 'React', 'Node']
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
                yPos: contactMe.offsetTop,
                code: 'dev.getInfo();'
            },
            aboutKyh: {
                element: aboutKyh,                
                yPos: aboutKyh.offsetTop
            }
        }, 
        scrollAnchorYpos: scrollAnchor.getBoundingClientRect().top
    }

    function typeWrite(phrase, target, speed = 1000, clearHTML = false){
        let phraseToWrite = Array.from(phrase); 
        let done = false; 
        
        if(clearHTML) {
            target.innerHTML = ""; 
        }

        let counter = 0; 

        let interval = setInterval(function(){
            write(); 
        },speed); 

        function write(){
            if(counter >= phraseToWrite.length) {
                clearInterval(interval);
                done = true;  
                return done; 
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

    // API for other modules 
   return {
       pageInfo,
       scroll,
       getSectionPos, 
       typeWrite
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

const IntroModule = (function(){

    const skillSpan = document.querySelector('.name span'); 
    let counter = 0; 

    function toggleSkill(targetElement, skillList){
        if(counter > skillList.length - 1) {
            counter = 0; 
        }
        targetElement.innerHTML = skillList[counter]; 
        counter++; 
    }

    setInterval(()=>{
        toggleSkill(skillSpan, Page.pageInfo.sections.presentation.skillList); 
    },1400)

})();

const SkillsModule = (function(){

    // DOM
    const mySkills = Page.pageInfo.sections.mySkills.element;
    const skills = mySkills.querySelectorAll('.skill'); 

    skills.forEach(skill => {
        skill.classList.add('swoosh'); 
    })

    window.addEventListener('scroll', e => {
        if(window.scrollY >= Page.pageInfo.sections.mySkills.yPos / 2) {
            skills.forEach(skill => {
                skill.classList.remove('swoosh');
                skill.classList.add('fade-in');            
            })    
        }
    });
})();


const contactModule = (function(){
    // TODO: Clean up 
    const contactMe = document.querySelector('#contactMe'); 
    const me = document.querySelector('.editor .me'); 
    const code = document.querySelector('.editor .line #code');    

    me.style.display = 'none';     

    let introFinished = false; 
    let printing = false; 

    window.addEventListener('scroll', ()=>{
        if(window.scrollY >= Page.pageInfo.sections.contactMe.yPos) {
            terminalIntro(); 
        }
    }); 

    function terminalIntro(){
        if(!introFinished && !printing) {
            printing = true;
            Page.typeWrite(Page.pageInfo.sections.contactMe.code, code, 140, true);        
            setTimeout(()=>{
                me.style.display = ''; 
                introFinished = true; 
                printing = false; 
            },2500)
        } else {
            return false; 
        }
    }
    
})(); 


