// Canvas element and context
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d'); 

// Sets canvas width and height to browser size
canvas.width = innerWidth;
canvas.height = innerHeight; 

// Colors array
const colors = [
    '#C6D8D3',
    '#5fc35f'
];

// Ball prototype 
function Ball(xPos, yPos, radius, start, end){
    this.xPos = xPos; 
    this.yPos = yPos; 
    this.radius = radius;
    this.start = start; 
    this.end = end;

    this.color = colors[Math.floor(Math.random() * colors.length)]; 

    this.xVel = Math.random() - 0.5; 
    this.yVel = Math.random() - 0.5;
}

// Draw method on ball prototype
Ball.prototype.draw = function(){
    ctx.beginPath(); 
    ctx.strokeStyle = this.color; 
    ctx.arc(this.xPos, this.yPos, this.radius, this.start, this.end);
    ctx.stroke();
    ctx.closePath(); 
}

// Move method on ball prototype 
Ball.prototype.move = function() {
    if(this.xPos > canvas.width || this.xPos < 0) {
        this.xVel = -this.xVel;
    }

    if(this.yPos > canvas.height || this.yPos < 0) {
        this.yVel = -this.yVel; 
    }

    this.xPos += this.xVel; 
    this.yPos += this.yVel; 
    this.draw(); 

}

// Sets up canvas animation and balls to animate, returns animate function
const canvasModule = (function(){

    let balls = []; 

    function spawn(_x, _y, amount = 10){
        let x; 
        let y; 
        for(let i = 0; i < amount; i++) { 
            if(!_x && !_y) {
                x = Math.floor(Math.random() * canvas.width);
                y = Math.floor(Math.random() * canvas.height);
            } else {
                x = _x; 
                y = _y; 
            }

            const ball = new Ball(x,y, 1, 0, Math.PI * 2); 
            ball.draw(); 
            balls.push(ball); 
        }
    }

    let quarterWidth = canvas.width / 4; 
    let quarterHeight = canvas.height / 4; 
    
    function initCanvas(){
        spawn(quarterWidth, quarterHeight, 33);
        setTimeout(()=>{
            spawn(quarterWidth * 2, quarterHeight, 33);
        },1000)
         
        setTimeout(()=>{
            spawn(quarterWidth * 3, quarterHeight,33); 
        },2000)
    }

    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height); 
        ctx.fillRect(0,0, canvas.width, canvas.height); 
        ctx.fillStyle = '#262934'; 
     
        for(let i = 0; i < balls.length; i++){
            balls[i].move();
            balls[i].draw(); 
        }
        requestAnimationFrame(animate);  
    }

    canvas.addEventListener('click', e => {
        spawn(e.x, e.y, 10); 
    })

    window.addEventListener('resize', e =>{
        canvas.width = innerWidth; 
        canvas.height = innerHeight; 
    })

    return {
        initCanvas,
        animate,
        spawn
    }

})(); 
