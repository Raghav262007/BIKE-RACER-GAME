var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;

var oppPlayer1, oppPlayerload1, oppPlayerload2;

var oppPlayer2, oppPlayerload3, oppPlayerlaod4;

var oppPlayer3, oppPlayerload5, oppPlayerload6;

var obstacle1laod, obstacle2load, obstacle3load;

var cycleBellSound;

var gameOverload, gameOver;

function preload() {
  pathImg = loadImage("Road.png");

  mainRacerImg1 = loadAnimation("mainPlayer1.png", "mainPlayer2.png");

  mainRacerImg2 = loadAnimation("mainPlayer3.png");

  oppPlayerload1 = loadImage("opponent1.png");
  oppPLayerload2 = loadImage("opponent3.png");

  oppPlayerload3 = loadImage("opponent4.png");
  oppPlayerload4 = loadImage("opponent6.png");

  oppPlayerload5 = loadImage("opponent7.png");
  oppPlayerload6 = loadImage("opponent9.png");

  obstacle1load = loadImage("obstacle1.png");
  obstacle2load = loadImage("obstacle2.png");
  obstacle3load = loadImage("obstacle3.png");

  gameOverload = loadImage("gameOver.png");

  cycleBellSound = loadSound("bell.mp3");
}

function setup() {

  createCanvas(600, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -7;

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.04;
  mainCyclist.setCollider
    ("rectangle", 0, 0, 70, 70);
  mainCyclist.debug = true;

  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
  obstaclesGroup = new Group();

  gameOver = createSprite(5000, 130, 10, 10);
  gameOver.addAnimation("gameOver", gameOverload);

}

function draw() {
  background(0);
  drawSprites();

  textSize(20);
  fill(255);
  text("Distance : " + distance, 250, 50);

  if (gameState === PLAY) {

    distance = distance + Math.round(getFrameRate() / 60);
    gameOver.x = 11000;
    path.velocityX = -(7 + 2 * distance / 150);
    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);


    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }
    spawnOpp();
    spawnObstacles();

    if (pinkCG.isTouching(mainCyclist) || yellowCG.isTouching(mainCyclist) || redCG.isTouching(mainCyclist)
      || obstaclesGroup.isTouching(mainCyclist)) {
      gameOver.x = 320;
      gameState = END;
    }

  }
  else if (gameState == END) {
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
    obstaclesGroup.destroyEach();

    path.velocityX = 0;
    mainCyclist.velocityX = 0;

    pinkCG.setVelocityXEach(0);
    yellowCG.setVelocityXEach(0);
    redCG.setVelocityXEach(0);
    obstaclesGroup.setVelocityEach(0);

    pinkCG.setLifetimeEach(-1);
    yellowCG.setLifetimeEach(-1);
    redCG.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);

    //mainCyclist.changeAnimation("SahilRunning",mainRacerImg2);

    gameOver.x = 320;

    text("PRESS UP ARROW TO RESTART THE GAME", 110, 190);

  }

  if (keyDown("space")) {
    cycleBellSound.play();
  }

  if (keyDown("UP_ARROW")) {
    reset();
  }


}

function pinkCyclists() {
  oppPlayer1 = createSprite(1000, Math.round(random(50, 280)), 10, 10);
  oppPlayer1.scale = 0.05;
  oppPlayer1.addImage("oppPlayer1", oppPlayerload1);
  oppPlayer1.setLifetime = 170;
  oppPlayer1.velocityX = -10;
  oppPlayer1.velocityX = -(7 + 2 * distance / 150);
  pinkCG.add(oppPlayer1);
}

function yellowCyclists() {
  oppPlayer2 = createSprite(1000, Math.round(random(50, 280)), 10, 10);
  oppPlayer2.scale = 0.05;
  oppPlayer2.addImage("oppPlayer2", oppPlayerload3);
  oppPlayer2.setLifetime = 170;
  oppPlayer2.velocityX = -10;
  oppPlayer2.velocityX = -(7 + 2 * distance / 1500);
  yellowCG.add(oppPlayer2);
}

function redCyclists() {
  oppPlayer3 = createSprite(1000, Math.round(random(50, 280)), 10, 10);
  oppPlayer3.scale = 0.05;
  oppPlayer3.addImage("oppPlayer3", oppPlayerload5);
  oppPlayer3.setLifetime = 170;
  oppPlayer3.velocityX = -10;
  oppPlayer3.velocityX = -(7 + 2 * distance / 150);
  redCG.add(oppPlayer3);
}

function spawnOpp() {
  var rand = Math.round(random(1, 3));

  if (World.frameCount % 150 === 0) {
    if (rand === 1) {
      pinkCyclists();
    }
    else if (rand === 2) {
      redCyclists();
    }
    else {
      yellowCyclists();
    }
  }

}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, Math.round(random(50, 280)), 10, 40);
    obstacle.velocityX = -(7 + distance / 150);

    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle.addImage("ob1", obstacle1load);
        break;
      case 2: obstacle.addImage("ob1", obstacle2load);
        break;
      case 3: obstacle.addImage("ob1", obstacle3load);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.06;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}










