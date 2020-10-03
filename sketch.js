
var gameState = "play";

var backDrop,ground,back;
var monkey_running,monkey_collided;
var banana,fruitGroup;
var stone,stoneGroup;

var st,ban;

var count,score;

var size,size1,size2,size3;

var gameOver, restart , gameOver_img , restart_img; 

function preload(){

 backDrop = loadImage("jungle.jpg");
 monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkey_collided = loadImage("Monkey_05.png");
  
   gameOver_img = loadImage("gameOver.png");
  
  restart_img = loadImage("restart.png");
  
  
  banana_img = loadImage("banana.png");
  fruitGroup = new Group();
  
  stone_img  = loadImage("stone.png");
  stoneGroup = new Group();
}
function setup() {
  createCanvas(500, 360);
  
  gameOver = createSprite(200,100);
 restart = createSprite(200,140);
gameOver.addImage("gameOver", gameOver_img);
gameOver.scale = 0.5;
restart.addImage("restart",restart_img);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

  back = createSprite(200,150,50,50);
  back.addImage("back1",backDrop)
  back.velocityX = -4;
  
  ground = createSprite(200,370,700,50);
  
  count = 15;
  size =  0.03;
  size1 = 0.1;
  size2 = 210;
  size3 = 270;
  score = 0;
  monkey = createSprite(100,300,20,20);
  monkey.addAnimation("monk",monkey_running);
  monkey.addAnimation("monk1",monkey_collided);
  monkey.scale = 0.1;
  
    gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage("gameOver", gameOver_img);
gameOver.scale = 0.5;
restart.addImage("restart",restart_img);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
}

function draw() {
  background(220);
  
  ground.visible = false;
  
  monkey.collide(ground);
  
  if(back.x<0){
    back.x = back.width/2
  }
  if(gameState === "play"){
  
 createStone();
 createBanana();
  
  for(var i=0;i<fruitGroup.length;i++){
      if(fruitGroup.get(i).isTouching(monkey)){
       fruitGroup.get(i).destroy();
        count = count + 5; 
        monkey.scale = monkey.scale + 0.005;
       size3 = size3 - 10;
        size2 = size2 - 6;
        size1 = size1 + 0.01
        size = size + 0.003;
        score = score +5;
      }
      }
  
  if(frameCount%50 === 0){
    count = count  - 1;
  }
  
  if(monkey.isTouching(stoneGroup)){  
     monkey.scale = monkey.scale - 0.0003;
   }  

 
  
  
  if(keyDown("space") && monkey.y>size3){
    monkey.velocityY = -12;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(count === 0){
      gameState = "end";
      monkey.velocityY = 0;
      back.velocityX = 0;
    }
  } else if(gameState === "end"){
    monkey.changeAnimation("monk1",monkey_collided)
    fruitGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    fruitGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
   
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      
      reset();
    }
  }
  
 drawSprites(); 
  textSize(20);
 textStyle(BOLD);
 fill("black");
 text("DEADLINE :  "+ count, 10, 40);
  text("SCORE :  "+ score, 350, 40);
  
}
function reset(){
  gameState = "play";
  
  gameOver.visible = false;
  restart.visible = false;
  
  stoneGroup.destroyEach()
  fruitGroup.destroyEach();
  
  monkey.changeAnimation("monk",monkey_running);
  
   back.velocityX = -4;
  
  
  score = 0;
  count = 15;
}
function createStone (){
   if(frameCount % 257 === 0){
   var stone = createSprite(400,330);
   stone.addImage("stone",stone_img);
   stone.velocityX = -4  - score/5 ;
   stone.scale = size1;
   stone.lifetime = 200; 
   stoneGroup.add(stone);
   //st.debug = true;
   stone.setCollider("circle",0,0,150);
   }
 }

function createBanana (){
  if(frameCount % 150 === 0){
    var ban  = createSprite(360,size2);
    ban.addImage("banana1",banana_img);
    ban.scale = size;
    ban.velocityX = -3 - score/5;
    ban.lifetime = 170;
    fruitGroup.add(ban);
  }
}