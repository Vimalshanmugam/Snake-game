const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');// context irutha tha color full panna mudium 
 const score = document.getElementById('scoreVal');
const WIDTH = gameBoard.width;
const HIGHT = gameBoard.height;
const UNIT = 25;// food oda size
let foodX;//function kulla iruka foodx ah veliya oru vaiable ah tharm 
let foodY;//function kulla iruka foody ah veliya oru vaiable ah tharm 
let xVal = 25; //  snake move ku 
let yVal= 0; //  snake move ku
let scores=0;//score value 
let active=true; //game over
let satrted = false// starting la game start or not
let snake= [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
 
]
window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
   context.fillStyle = '#212121';
   context.fillRect(0,0,WIDTH,HIGHT)
   createFood();
   displayFood();
   drawSnake();
//    moveSnake();
//    clearBord();
//    drawSnake();
//    nextTick();
}

function createFood(){
   foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT // food randoma oru place vara 
   foodY = Math.floor(Math.random()*HIGHT/UNIT)*UNIT 
}

function displayFood(){
    context.fillStyle = 'red'
    context.strokeStyle = '#212121';
    context.fillRect(foodX,foodY,UNIT,UNIT)
}
function clearBord(){
        context.fillStyle = '#212121';
        context.fillRect(0,0,WIDTH,HIGHT)
}
function drawSnake(){
    context.fillStyle='aqua' // box thani thani ah prika use aagum
    // context.fillStyle = '#212121';
    snake.forEach((snakePart)=>{
      context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)// full box varum
      context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)// full box thani thani ah panrom

      
    })
    
}
function moveSnake(){
   const head = {x:snake[0].x+xVal,
                     y:snake[0].y+yVal}
    snake.unshift(head)//first la value add aagum 
    if(snake[0].x==foodX && snake[0].y==foodY){
        scores+=1;
        score.textContent=scores
        createFood();
    }else{
    snake.pop()// back la iruka value remove panitum
    }
}

function nextTick(){
    if(active){
    setTimeout(()=>{
        clearBord();
        displayFood();
        drawSnake();
        moveSnake();
        checkGameover();
       nextTick();// mela iruka function la again again display aganum so intha funcion call pamom
    },150)//evlo speed nu solrom
 } 
  else if(!active){
        clearBord();
        context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over!!",WIDTH/2,HIGHT/2)

 }
}
function keyPress(event){// enna key presas panraga nu pakka event call panrom
    if(!satrted){
        satrted=true
        nextTick();// mela iruka function la again again display aganum so intha funcion call pamom
    }
    //pause when space is pressed
    if(event.keyCode===32){
        console.log('clicked')
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }
    const LEFT =37
    const UP =38 // ethu key oda default value 
    const RIGHT =39
    const DOWN = 40

    switch(true){
       //left key pressed and not going right
       case(event.keyCode==LEFT  && xVal!=UNIT)://&& la enna tharam na x value positive va ilana mattum change panna solrom
       xVal=-UNIT;
       yVal = 0;
       break;
   //right key pressed and not going left
   case(event.keyCode==RIGHT && xVal!=-UNIT)://&& la enna tharam na x value positive va ilana mattum change panna solrom
       xVal=UNIT;
       yVal=0;
       break;
   //Up key pressed and not going down
   case(event.keyCode==UP && yVal!=UNIT)://&& la enna tharam na x value positive va ilana mattum change panna solrom
       xVal=0;
       yVal=-UNIT;
       break;
   //down key pressed and not going up
   case(event.keyCode==DOWN && yVal!=-UNIT)://&& la enna tharam na x value positive va ilana mattum change panna solrom
       xVal=0;
       yVal=UNIT;
       break;
    }
}
function checkGameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HIGHT):
            active=false;
            break;
    }
}
