'use strict';
 
const Page = (function(){

    // DOM elements 
    const header = document.querySelector('#header'); 
    const main = document.querySelector('main'); 
    const presentation = main.querySelector('#presentation'); 
    const mySkills = main.querySelector('#mySkills'); 
    const myWork = main.querySelector('#myWork'); 
    const contactMe = main.querySelector('#contactMe'); 
    const aboutKyh = main.querySelector('#aboutKyh'); 
    const scrollAnchor = main.querySelector('#scroll-arrow');
    
    // Page info object 
    const pageInfo = {
        sections: {
            header: {
                element: header, 
            },
            presentation: {
                element: presentation,
                yPos: presentation.offsetTop,
                skillList: ['JavaScript.', 'HTML5.', 'CSS.', 'React.', 'Node.', 'Express.', 'Socket.io.', 'Wordpress.','MySQL','Sass.'],
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
    }

    // Functions 
    function typeWrite(phrase, target, SPEED_MILLIS = 1000, clearHTML = false){
        let phraseToWrite = Array.from(phrase); 
        let done = false; 
        
        if(clearHTML) {
            target.innerHTML = ""; 
        }

        let counter = 0; 

        let interval = setInterval(function(){
            write(); 
        },SPEED_MILLIS); 

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
        scroll(0); 
    })

    // TODO: Clean up
    window.addEventListener('scroll', function(e){
        if(window.scrollY >= pageInfo.sections.mySkills.element.getBoundingClientRect().top) {
            header.className = 'header-scrolling';
            scrollAnchor.classList.add('scroll-top');
            scrollAnchor.classList.remove('hidden');

        } else {
            header.className = 'header-initial'; 
            scrollAnchor.classList.add('hidden'); 
            scrollAnchor.classList.remove('scroll-top'); 
        }
    })

    // API for other modules 
   return {
       pageInfo,
       scroll,
       typeWrite
   }

})();

const HeaderModule = (function(){

    // Brings in section object from Page module 
    const { sections } = Page.pageInfo; 

    // Header module elements 
    const header = sections.header.element; 
    const navLinks = header.querySelector('#navLinks'); 
    const socialLinks = header.querySelector('#socialLinks'); 
    const socialLinksToggle = header.querySelector('#socialLinksToggle'); 
    const hamburger = header.querySelector('#hamburger i'); 

    // Eventlisteners 
    navLinks.addEventListener('click', navigate); 
    hamburger.addEventListener('click', toggleMenu); 

    // Functions 
    function toggleMenu(e) {
        const target = e.target; 
        header.querySelector('nav').classList.toggle('open'); 
    }

    function navigate(e){
        const nav = header.querySelector('nav'); 
        const target = e.target; 
        if(target.nodeName == 'LI' && target.dataset.section) {
            Page.scroll(sections[target.dataset.section].yPos); 
            nav.classList.remove('open'); 
        } else if(target.nodeName == 'I' || target.nodeName == 'P') {
            // If target was not LI, select the parent node
            // which is the LI that contains the html data-attribute for target
            Page.scroll(sections[target.parentNode.dataset.section].yPos); 
            nav.classList.remove('open');             
        }
    }

})();

const IntroModule = (function(){
    // Initiates the canvas animation
    initCanvas.animate();

    // Brings in section object from Page module 
    const { sections } = Page.pageInfo;  

    // Intro module elements 
    const introModule = sections.presentation.element; 
    const skills = introModule.querySelector('.name #skillList'); 
    const checkItOut = introModule.querySelector('#checkItOut'); 
    console.log(checkItOut); 

    checkItOut.addEventListener('click', e => {
        Page.scroll(sections.mySkills.yPos); 
    })
    
    // Functions 
    let counter = 0; 
    function toggleSkill(targetElement, skillList){
        if(counter > skillList.length - 1) {
            counter = 0; 
        }
        targetElement.innerHTML = skillList[counter]; 
        counter++; 
    }

    setInterval(()=>{
        toggleSkill(skills, sections.presentation.skillList); 
    },1400)

    

})();

const SkillsModule = (function(){

    // Brings in section object from Page module 
    const { sections } = Page.pageInfo;   

    // Skills module elements 
    const mySkills = sections.mySkills.element;
    const skills = mySkills.querySelectorAll('.skill'); 

    // Adds class of swoosh to all skill elements 
    skills.forEach(skill => {
        skill.classList.add('off-screen'); 
    })

    // Eventlisteners 
    window.addEventListener('scroll', e => {
        if(window.scrollY >= (sections.mySkills.yPos / 2)) {
            skills.forEach(skill => {
                skill.classList.remove('off-screen');
                skill.classList.add('fade-in');            
            })    
        }
    });
})();


const contactModule = (function(){

    // Brings in section object from Page module 
    const { sections } = Page.pageInfo;  
    
    // Contact module elements 
    const contactMe = sections.contactMe.element;  
    const me = contactMe.querySelector('.editor .me'); 
    const code = contactMe.querySelector('.editor .line #code');    

    // Sets the display to none 
    me.style.display = 'none';     

    // Event listeners 
    window.addEventListener('scroll', ()=>{
        if(window.scrollY >= Page.pageInfo.sections.contactMe.yPos) {
            terminalIntro(); 
        }
    }); 

    // Functions 
    let introFinished = false; 
    let printing = false; 

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


