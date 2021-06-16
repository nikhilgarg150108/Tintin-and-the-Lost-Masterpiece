var BG, seaBG, wreckBG;
var tintin, tintinImg, submarine, submarineImg;
var coin, coinImg, key, keyImg;
var fish, fishR, fGroup;
var fish1R, fish1Img, fish2R, fish2Img, fish3R, fish3Img, fish4R, fish4Img, fish5R, fish5Img;
var squid, squidImg, inkImg, eel, eelImg, fireImg, shark, sharkImg, skeletonImg;
var villain1, V1Image, bullet, bulletImg, bGroup, explosion;
var shipwreck, wreckImg, wGroup, painting, paintingImg;
var obstaclesGroup, eGroup, sqGroup, shGroup, coinGroup;
var lost, youLose, won, youWin;
var gameState = 0;
var score = 0;
var bulletCount = 0;


function preload(){
  seaBG = loadImage("images/underwater2.jpg");
  wreckBG = loadImage("images/shipwreck inside.jpg");
  storyBG = loadImage("images/intro.jpg");
  submarineImg = loadImage("images/tintin in submarine.png");
  tintin = loadImage("images/tintin.png");
  wreckImg = loadImage("images/shipwreck.png");

  fish1Img = loadImage("images/fish1.png");
  fish2Img = loadImage("images/fish2.png");
  fish3Img = loadImage("images/fish3.png");
  fish4Img = loadImage("images/fish4.png");
  fish5Img = loadImage("images/fish5.png");
  
  fish1R = loadImage("images/fish1R.png");
  fish2R = loadImage("images/fish2R.png");
  fish3R = loadImage("images/fish3R.png");
  fish4R = loadImage("images/fish4R.png");
  fish5R = loadImage("images/fish5R.png");

  squidImg = loadImage("images/squid.png");
  inkImg = loadImage("images/squid throwing ink.png");
  eelImg = loadImage("images/eel.png");
  fireImg = loadImage("images/submarine fire.png");
  sharkImg = loadImage("images/shark.png");
  skeletonImg = loadImage("images/skeletons.png")

  V1Image = loadImage("images/villain2.png");
  bulletImg = loadImage("images/bullet.png");
  explosion = loadImage("images/explosion.png")

  coinImg = loadImage("images/coin.png");

  paintingImg = loadImage("images/painting.png");
  youLose = loadImage("images/you lose.png");
  youWin = loadImage("images/you win.png");
}

function setup() {
  createCanvas(1200,800);
  bg = createSprite(600, 400, 10, 10);
  bg.addImage(storyBG);
  bg.scale = 0.6

  submarine = createSprite(150, 400, 50, 50);
  submarine.addImage(submarineImg);
  submarine.scale = 0.5;

  villain1 = createSprite(1000, 400);
  villain1.addImage(V1Image);
  villain1.scale = 0.4;
  villain1.visible = false;
  villain1.velocityY = 4;

  edges = createEdgeSprites();

  obstaclesGroup = new Group();
  eGroup = new Group();
  sqGroup = new Group();
  shGroup = new Group();
  bGroup = new Group();
  coinGroup = new Group();
  wGroup = new Group();
  fGroup = new Group();
  pGroup = new Group();
}

function draw() {
  //background(129, 191, 213); 
  background(180)

  if(bg.x < 350){
    bg.x = width/2;
  } 

  if(keyDown(UP_ARROW) && submarine.y >= 150){
    submarine.y = submarine.y - 10;
    
  }

  if(keyDown(DOWN_ARROW) && submarine.y <= 600){
    submarine.y = submarine.y + 10;
    
  }

  villain1.bounceOff(edges);

  submarine.bounceOff(edges);

  if(gameState===0){
    submarine.visible = false;
    //bg.addImagestoryBG;
    if(keyDown("space")){
      gameState = 1;
    }
  }

  if(gameState === 1){
    bg.addImage(seaBG)
    bg.scale = 1.3;
    bg.velocityX = -10;
    submarine.visible = true;

    spawnFishes();
    spawnObstacles();
    spawnCoins();
    

    if(score === 2){
      if(frameCount%120===0){
        shipwreck = createSprite(1200, 600, 10, 10);
        shipwreck.addImage(wreckImg);
        
        shipwreck.velocityX = -10;
        wGroup.add(shipwreck);
      }
      //wGroup.add(shipwreck);
      
    }

    if(wGroup.isTouching(submarine)){
      gameState = 2;
    }

    if(coinGroup.isTouching(submarine)){
      coinGroup.destroyEach();
      score++;
    }

    if(eGroup.isTouching(submarine)){
      submarine.addImage(fireImg);
      submarine.scale = 0.75;
      gameState = 4;
    }

    if(sqGroup.isTouching(submarine)){
      submarine.addImage(inkImg);
      submarine.scale = 0.65;
      gameState = 4;
    }

    if(shGroup.isTouching(submarine)){
      submarine.addImage(skeletonImg);
      submarine.scale = 0.35;
      gameState = 4;
    }
  }

  else if(gameState === 2){
    bg.addImage(wreckBG)
    bg.scale = 2.2;
    bg.velocityX = -10;
    submarine.visible = true;
    //submarine.addImage(tintin);
    //submarine.scale = 0.75;

    spawnFishes();
    spawnObstacles();
    spawnCoins();
    
    if(score === 5){
      gameState = 3;

    }    

    if(coinGroup.isTouching(submarine)){
      coinGroup.destroyEach();
      score++;
    }

    if(eGroup.isTouching(submarine)){
      submarine.addImage(fireImg);
      submarine.scale = 0.75;
      gameState = 4;
    }

    if(sqGroup.isTouching(submarine)){
      submarine.addImage(inkImg);
      submarine.scale = 0.65;
      gameState = 4;
    }

    if(shGroup.isTouching(submarine)){
      submarine.addImage(skeletonImg);
      submarine.scale = 0.35;
      gameState = 4;
    }
  }

  else if(gameState === 3){
    bg.addImage(wreckBG);
    bg.scale = 2.2;
    bg.velocityX = -7;

    spawnCoins();
    submarine.addImage(tintin);
    submarine.scale = 0.75;

    villain1.visible = true;

    if(coinGroup.isTouching(submarine)){
      coinGroup.destroyEach();
      score++;
    }

    for(var i = 0; i<5; i++){
      spawnBullets();
      
    }
    if(bulletCount>=5){
      gameState = 5;
    }

    if(bGroup.isTouching(submarine)){
      submarine.addImage(explosion);
      gameState = 4;
    }
    spawnFishes();
    text("Bullets left: " + bulletCount, 200, 60);
  }

  else if(gameState === 4){
    bg.velocityX = 0;
    //bg.x = 600;
    //bg.scale = 0.9;
    lost = createSprite(600, 400, 20, 20);
    lost.addImage(youLose);
    //submarine.visible = false;
    villain1.visible = false;
    //bullet.visible = false;
    //fGroup.destroyEach();
    coinGroup.destroyEach();
    obstaclesGroup.destroyEach();
    fish.velocityX = 0;
    fishR.velocityX = 0;
  }

  else if(gameState === 5){
    
    if(frameCount%120===0){
      painting = createSprite(1200, 600, 10, 10);
      painting.addImage(paintingImg);
      
      painting.velocityX = -10;
      pGroup.add(painting);
    }
      //wGroup.add(shipwreck);
      
    if(pGroup.isTouching(submarine)){
      bg.velocityX = 0;
      //bg.x = 600;
      //bg.scale = 0.9;
      won = createSprite(600, 400, 20, 20);
      won.addImage(youWin);
      //submarine.visible = false;
      villain1.visible = false;
      //bullet.visible = false;
      //fGroup.destroyEach();
      coinGroup.destroyEach();
      obstaclesGroup.destroyEach();
      fish.velocityX = 0;
      fishR.velocityX = 0;
    }
  }

  drawSprites();

  textSize(30);
  fill(180);
  strokeWeight(4)
  text("SCORE: " + score, 1000, 60);
}

function spawnFishes() {
  if(frameCount % 60 === 0){
    fish = createSprite(1200, random(100, 650), 15, 15);
    fish.scale = 0.25;
    fish.velocityX = -10;
    fGroup.add(fish);
    var rand = Math.round(random(1, 5));
    switch(rand){
      case 1: fish.addImage(fish1Img);
              break;
      case 2: fish.addImage(fish2Img);
              break;
      case 3: fish.addImage(fish3Img);
              break;
      case 4: fish.addImage(fish4Img);
              break;
      case 5: fish.addImage(fish5Img);
              break;
    }
  }

  if(frameCount % 240 === 0){
    fishR = createSprite(0, random(100, 650), 15, 15);
    fishR.scale = 0.25;
    fishR.velocityX = 2;
    fGroup.add(fishR);
    var rand = Math.round(random(1, 5));
    switch(rand){
      case 1: fishR.addImage(fish1R);
              break;
      case 2: fishR.addImage(fish2R);
              break;
      case 3: fishR.addImage(fish3R);
              break;
      case 4: fishR.addImage(fish4R);
              break;
      case 5: fishR.addImage(fish5R);
              break;
    }
  }
  
}

function spawnObstacles() {
  if(frameCount % 400 === 0){
    eel = createSprite(1200, random(150, 600), 15, 15);
    eel.scale = 0.5;
    eel.velocityX = -10;
    eel.lifetime = 130;
    eel.addImage(eelImg);
    eGroup.add(eel);
    obstaclesGroup.add(eel);
  }

  if(frameCount % 615 === 0){
    squid = createSprite(1200, random(150, 600), 15, 15);
    squid.scale = 0.65;
    squid.velocityX = -10;
    squid.lifetime = 130;
    squid.addImage(squidImg);
    sqGroup.add(squid);
    obstaclesGroup.add(squid)
  }

  if(frameCount % 475 === 0){
    shark = createSprite(1200, random(150, 600), 15, 15);
    shark.scale = 0.5;
    shark.velocityX = -10;
    shark.lifetime = 130;
    shark.addImage(sharkImg);
    shGroup.add(shark);
    obstaclesGroup.add(shark);
  }
}

function spawnCoins() {
  if(frameCount % 100 === 0) {
    coin = createSprite(1200, random(150, 600));
    coin.velocityX = -10;
    coin.addImage(coinImg)
    coin.scale = 0.2;
    coinGroup.add(coin);
  }
}

function spawnBullets() {
  if(frameCount % 150 === 0){
    bullet = createSprite(1000, villain1.y, 10, 10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.1;
    bullet.velocityX = -15;
    bulletCount = bulletCount+1;
    
    bGroup.add(bullet);
  }
  
}
