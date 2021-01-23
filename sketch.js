var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacle
var score;
var JumpSound, DieSound, checkpointSound;

var gameover, restart;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  JumpSound= loadSound ("jump.mp3");
  DieSound= loadSound ("die.mp3");
  
  obstacle1 = loadImage("cactus.png");
  obstacle2 = loadImage("ccactus2.png");
  obstacle3 = loadImage("cactus.png");
  obstacle4 = loadImage("cactus.png");
  obstacle5 = loadImage("cactus.png");
  obstacle6 = loadImage("cactus.png");
  
  gameover_img= loadImage ("gameOver.png");
  restart_img= loadImage ("restart.png");
  checkpointSound= loadSound ("checkPoint.mp3");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
 
  trex = createSprite(50,height-20,10,20);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,height-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  gameover= createSprite (width/2, height-100, 10, 10);
  gameover.addImage (gameover_img);
  gameover.scale=2;
  
  restart=createSprite (width/2, height-50, 10, 10);
  restart.addImage (restart_img);
  restart.scale=0.5;

  
  
  invisibleGround = createSprite(200,height-10 ,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
  
  trex.setCollider ("rectangle", 0, 0, 100, 70)
   trex.debug=true;
}

function draw() {
  background(0 , 255, 205);
  fill ("red");
  text("Score: "+ score, width-100 ,height-150);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(4+ score/100);
    score = score + Math.round(frameCount/60);
    
    if((touches.length>0||keyDown("space"))&& trex.y >= height-100) {
    trex.velocityY = -13;
      JumpSound.play ();
      touches=[]
  }
    
     //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
    
    trex.velocityY = trex.velocityY + 0.8
  
    gameover.visible=false;
    restart.visible=false;
  

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if (trex.isTouching (obstaclesGroup)) {
      gameState= END;
      DieSound.play ();
    }
      }
      
  
 
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    trex.changeAnimation("collided",trex_collided)
  obstaclesGroup.setVelocityXEach (0);
    cloudsGroup.setVelocityXEach (0);
    obstaclesGroup.setLifetimeEach (-1);
    cloudsGroup.setLifetimeEach (-1);
    gameover.visible=true;
    restart.visible=true;
  }
  
  if (score% 100 ===0 && score>0) {
    checkpointSound.play ();
  }
  
  if (mousePressedOver (restart)) {
    console.log ("restart")
    gameRestart ()
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    score=0;
    trex.changeAnimation ("running", trex_running);
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function gameRestart () {
  gameState=PLAY;
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   obstacle = createSprite(400,height-35 ,10,40);
   obstacle.velocityX = -(6+ score/100);

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1:
        obstacle.addImage(obstacle1);
        obstacle.scale=0.03;
              break;
      case 2: obstacle.addImage(obstacle2);
        obstacle.scale=0.06;
              break;
      case 3: 
        obstacle.addImage(obstacle3);
        obstacle.scale=0.03;
              break;
      case 4: 
        obstacle.addImage(obstacle4);
        obstacle.scale=0.03;
              break;
      case 5: 
        obstacle.addImage(obstacle5);
        obstacle.scale=0.03;
              break;
      case 6: 
        obstacle.addImage(obstacle6);
        obstacle.scale=0.03;
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,height-100,40,10);
    cloud.y = Math.round(random(height-190,height-140));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}