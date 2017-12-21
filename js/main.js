'use strict';
 
const Page = (function(){

    // DOM elements 
    const header = document.querySelector('#header'); 
    const main = document.querySelector('main'); 
    const presentation = main.querySelector('#presentation'); 
    const mySkills = main.querySelector('#mySkills'); 
    const myWork = main.querySelector('#myWork'); 
    const contactMe = main.querySelector('#contactMe'); 
    const aboutMe = main.querySelector('#aboutMe'); 
    const scrollAnchor = main.querySelector('#scroll-arrow');
    
    // Page info object 
    const pageInfo = {
        sections: {
            header: {
                element: header,
                scrollAnchor: scrollAnchor 
            },
            presentation: {
                element: presentation,
                canvas: CanvasModule.element,
                yPos: presentation.offsetTop,
                skillList: ['JavaScript.', 'HTML5.', 'CSS.', 'React.', 'Node.', 'Express.', 'Socket.io.', 'Wordpress.','Sass.'],
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
            aboutMe: {
                element: aboutMe,                
                yPos: aboutMe.offsetTop
            }
        }, 
    }

    // Functions 
    function tickHandler(targetValue, element, SPEED = 10){
        let i = 0; 

        let interval = setInterval(()=>{
            tick(0, targetValue, element);
        },SPEED)

        function tick(from, to, element){
            if(i > to) {
                i = 0; 
                clearInterval(interval); 
            } else {
                element.innerHTML = `${i}%`;
                i++; 
            }
        }
    }

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

    function swoosh(elements, sectionYpos){
        if(window.scrollY > sectionYpos) {
            elements.forEach(element => {
                element.classList.remove('off-screen'); 
            })
        }
    }

    function debounce(fn, wait) {
        let timeout;
        return function() {
            let ctx = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                fn.apply(ctx, args);
            }, wait || 100);
        };
    };

    // API for other modules 
   return {
       pageInfo,
       scroll,
       swoosh,
       tickHandler,
       typeWrite,
       debounce
   }

})();

const HeaderModule = (function(){

    // Brings in section object from Page module 
    const { sections } = Page.pageInfo; 

    // Header module elements 
    const header = sections.header.element; 
    const navLinks = header.querySelector('#navLinks'); 
    const socialLinks = header.querySelector('#socialLinks'); 
    const hamburger = header.querySelector('#hamburger i'); 

    // Eventlisteners 
    navLinks.addEventListener('click', navigateToSection); 
    hamburger.addEventListener('click', toggleMenu); 
    window.addEventListener('scroll', Page.debounce(toggleHeaderVisibility,20));
    sections.header.scrollAnchor.addEventListener('click', function(){
        Page.scroll(0); 
    })
    
    // Functions 
    function toggleMenu(e) {
        header.querySelector('nav').classList.toggle('open'); 
    }

    function toggleHeaderVisibility(e){
        if(window.scrollY >= sections.mySkills.element.getBoundingClientRect().top) {
            header.className = 'header-scrolling';
            sections.header.scrollAnchor.classList.add('scroll-top');
            sections.header.scrollAnchor.classList.remove('hidden');

        } else {
            header.className = 'header-initial'; 
            sections.header.scrollAnchor.classList.add('hidden'); 
            sections.header.scrollAnchor.classList.remove('scroll-top'); 
        }
    }

    function navigateToSection(e){
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

    // Initiates the canvas and its animation
    CanvasModule.initCanvas(); 
    CanvasModule.animate();

    // Brings in section object from Page module 
    const { sections } = Page.pageInfo;  

    // Intro module elements 
    const introModule = sections.presentation.element; 
    const skills = introModule.querySelector('.name #skillList'); 
    const checkItOut = introModule.querySelector('#checkItOut'); 

    // Eventlisteners 
    checkItOut.addEventListener('click', e => {
        Page.scroll(sections.mySkills.yPos); 
    })

    window.addEventListener('resize', Page.debounce(CanvasModule.resizeCanvas)); 

    // Functions 
    let counter = 0; 
    function toggleSkill(targetElement, skillList){
        if(counter > skillList.length - 1) {
            counter = 0; 
        }
        targetElement.innerHTML = skillList[counter]; 
        counter++; 
    }

    // Toggles skill-list 
    setInterval(()=>{
        toggleSkill(skills, sections.presentation.skillList); 
    },1400)

})();

const SkillsModule = (function(){

    // Brings in section object from Page module 
    const { sections } = Page.pageInfo;   

    // Skills module elements 
    const mySkills = sections.mySkills.element;
    const skills = mySkills.querySelectorAll('.skill-group');

    // Adds class of swoosh to all skill elements 
    skills.forEach(skill => {
        skill.classList.add('off-screen'); 
    })

    // Debounced event listener 
    window.addEventListener('scroll', Page.debounce(handleSkillsTick, 30))

    // Handles skills % tick
    let skillsRatingFinished = false; 
    const skillRatingSpans = mySkills.querySelectorAll('.skill-rating'); 
    const skillLoadingBars = mySkills.querySelectorAll('.skill-group ul li');  
    function handleSkillsTick() {
        if(window.scrollY >= (sections.mySkills.yPos / 2)) {
            skills.forEach(skill => {
                skill.classList.remove('off-screen');
                skill.classList.add('fade-in');            
            })
            if(!skillsRatingFinished) {
                skillRatingSpans.forEach((el, i)=>{
                    Page.tickHandler(skillLoadingBars[i].dataset.skillrating, el, 30);
                    skillLoadingBars[i].style.width = skillLoadingBars[i].dataset.skillrating + '%';
                    skillLoadingBars[i].classList.add('bg-ligthgray'); 
                })
                skillsRatingFinished = true; 
            }
        } 
    }

})();


const ContactModule = (function(){

    // Brings in section object from Page module 
    const { sections } = Page.pageInfo;  
    
    // Contact module elements 
    const contactMe = sections.contactMe.element;  
    const me = contactMe.querySelector('.editor .me'); 
    const code = contactMe.querySelector('.editor .line #code');    
    
    // Sets the display to none so contact info can be shown without JS
    me.style.display = 'none';  
    code.style.display = 'none';    

    // Debounced event listener 
    window.addEventListener('scroll', Page.debounce(handleTerminalIntro, 20));

    // Handles terminal / contact me intro  
    let introFinished = false; 
    let printing = false; 
    function handleTerminalIntro(){

        if(window.scrollY >= sections.contactMe.yPos - 200 && !introFinished && !printing) {
            terminalIntro();
        }
        
        function terminalIntro(){
            code.style.display = '';
            printing = true;
            Page.typeWrite(sections.contactMe.code, code, 140, true);        
            
            setTimeout(()=>{
                me.style.display = ''; 
                introFinished = true; 
                printing = false; 
            },2500)
        }
    }
    
})(); 

const AboutMe = (function(){

    const { sections } = Page.pageInfo; 
    const aboutMe = sections.aboutMe.element; 
    const articles = aboutMe.querySelectorAll('article'); 

    // Adds class off-screen to article elements 
    articles.forEach(article => {
        article.classList.add('off-screen'); 
    })

    // Debounced event listener 
    window.addEventListener('scroll',Page.debounce(handleSwoosh));

    // Handles swoosh effect for about me section 
    function handleSwoosh(e){
        Page.swoosh(articles, aboutMe.offsetTop - 300); 
    }

})(); 


const EasterEgg = (function(){

    const eagle = document.querySelector('#eagle'); 

    eagle.addEventListener('mouseenter', birdhunt);
    eagle.addEventListener('click', birdhunt);

    let tries = 0; 
    function birdhunt(e){        
        if(e.type == 'click' && tries > 10) {
            alert('GRATZ'); 
            tries = 0; 
        } else {
            move(); 
        }
        function move(){
            tries++;
            e.target.style.right = Math.random() * innerWidth + 'px'; 
        }
    }
})();