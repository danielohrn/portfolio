const header = document.querySelector("header"); 
const name = document.querySelector(".logo h1"); 
const initials = document.querySelectorAll(".presentation span"); 

const navs = document.querySelectorAll("header span"); 

const menuLinks = document.querySelectorAll("header nav li"); 
menuLinks.forEach(function(link, index){
    link.addEventListener('click',function(){
        const TARGET_POS = site[this.id].Ypos; 
        scroll(TARGET_POS); 
    })
});

// Eventlistener for mouseenter on header (shows menu)
header.addEventListener('mouseenter',function(){

    const SMALL_DEVICES_BREAKPOINT = 700; 
    
    if(window.innerWidth > SMALL_DEVICES_BREAKPOINT) {

        header.classList.toggle('header-large');
        initials.forEach((initial, index)=>{
            initial.classList.toggle("initials");
        }); 

        intervalHandler("DÖH.", name); 

        let menuItems = ["<My skills/>","<My work/>", "<Contact me/>","<Front End Developer på KYH/>","<Github/>", "<LinkedIn/>"]
        navs.forEach((el,i)=>{
            intervalHandler(menuItems[i], el, 50); 
            el.classList.toggle("nav-text"); 
        })
    }
    

}); 

// Eventlistener for mouseleave on header (hides menu)
header.addEventListener('mouseleave', function(){

    const SMALL_DEVICES_BREAKPOINT = 700; 

    if(window.innerWidth > SMALL_DEVICES_BREAKPOINT) {
        header.classList.toggle('header-large');
        initials.forEach((initial, index)=>{
            initial.classList.toggle("initials");
        });
        name.innerHTML = "D."; 
        navs.forEach((e)=>{
            e.classList.toggle("nav-text"); 
        });
    }

})

// Typewriter function 
function intervalHandler(phrase, target, TYPE_SPEED = 100) {
    
    let letterCounter = 0; 

    target.innerHTML = "";        

    let typeWriterInterval = setInterval(function(){
        typewrite(); 
    },TYPE_SPEED)

    function typewrite() { 
        
        if(letterCounter >= phrase.length) {
            clearInterval(typeWriterInterval); 
            letterCounter = 0;  
        } else { 
            target.innerHTML += phrase[letterCounter];
            letterCounter++;
        }
    }
}

// Eventlistener for scroll to My work-section
const arrow = document.querySelector("#scroll-anchor"); 
arrow.addEventListener('click',function(e){

    const TOP_OF_PAGE = 0; 
    const INITIAL_ARROW_POS = 601; 
    const MY_WORK_POS = 785;  

    if(window.scrollY < INITIAL_ARROW_POS) {
        scroll(MY_WORK_POS); 
    } else {
        scroll(TOP_OF_PAGE);                 
    }
})


// Scroll function 
function scroll(yPos, xPos = 0){
    window.scrollTo({left: xPos, top: yPos, behavior: 'smooth'})
}

// Eventlistener for scroll-navigation-arrow 
window.addEventListener('scroll',function(){

    // getCurrentSection(site); 
    console.log(window); 
    
    if(window.scrollY >= 601) {
        arrow.style.position = "fixed"; 
        arrow.style.top = "10px"; 
        arrow.style.transform = "rotate(180deg)"; 
        arrow.style.opacity = ".5"; 
    } else {
        arrow.style.position = "static"; 
        arrow.style.transform = "rotate(0deg)"; 
        arrow.style.opacity = "1";
    }

}); 

const is = document.querySelectorAll("header nav li i");     

// if(window.scrollY >= site.skills.Ypos) {
// }


// function getCurrentSection(site) {

//     const siteArr = []; 

//     for(section in site) {
//         siteArr.push(site[section]); 
//     }

//     // console.log(siteArr); 

//     for(let i = 0; i < siteArr.length; i++) {
//         // console.log(siteArr[i], window.scrollY); 
//         if(siteArr[i].Ypos >= window.scrollY) {
//             console.log(siteArr[i].color); 
//         }
//     }

//     // return currentSection; 
// }


const site = {
    skills: {
        Ypos: 242,
        color: "#f1f1f1"
    },
    myWork: {
        Ypos: 785,
        color: "#4caf50"        
    }, 
    contactMe: {
        Ypos: 1589,
        color: "#f1f1f1"        
    }, 
    aboutKYH: {
        Ypos: 2556,
        color: "#e77451"        
    }
}


document.__proto__.sections = site; 


