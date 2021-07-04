var player, enemy, enemyGroup, enemies, ground, sword, beam, slash, pastPosition, health;
var cooldown, cooldown2, cooldown3, cooldownBar, cooldownBar2, cooldownBar3, cooldownBar4;
var healthBar, healthBar, invincibility, gameState, randomness;
var ground_img, background_img, groundGroup, bottom, energy;
var a, mana, manaBar, manaBar2, medkit, medkit_img, energy_img;

function preload() {
  ground_img = loadImage("sprites/ground.png");
  background_img = loadImage("sprites/background.png");
  medkit_img = loadImage("sprites/MedPack.png");
  energy_img = loadImage("sprites/energy.png");

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  randomness = 0;
  sword = createSprite(400, height/2 - 100, 50, 50);
  sword.lifetime = 1;
  beam = createSprite(400, height/2 - 100, 50, 50);
  beam.lifetime = 1;
  slash = createSprite(400, height/2 - 100, 50, 50);
  slash.lifetime = 1;
  player = createSprite(400, height/2 - 100, 50, 50);
  player.shapeColor = rgb(0,0,150);
  medkit = createSprite(1400, 550, 50, 50);
  medkit.lifetime = 1;
  energy = createSprite(1400, 550, 50, 50);
  energy.lifetime = 1;
  bottom = createSprite(width/2,height*3/4,windowWidth,height/2);
  bottom.shapeColor = rgb(147,110,79);
  cooldown = 0;
  pastPosition = player.x - 1;
  health = 100;
  invincibility = 0;
  groundGroup = createGroup();
  enemyGroup = createGroup();
  enemies = [];
  a = -1;
  enemy = createSprite(1400, 550, 50, 50);
  enemy.shapeColor = rgb(150,150,150);
  enemy.lifetime = 1;
  healthBar = createSprite(100,150,20,150);
  healthBar.shapeColor = "red";
  healthBar2 = createSprite(100,150,20,150);
  healthBar2.shapeColor = "green";
  cooldown2 = 0;
  cooldownBar = createSprite(100,300,20,120);
  cooldownBar.shapeColor = "black";
  cooldown3 = 0;
  cooldownBar3 = createSprite(200,300,20,120)
  cooldownBar3.shapeColor = "black";
  mana = 200;
  manaBar = createSprite(200,150,20,150)
  manaBar.shapeColor = "black";
  manaBar2 = createSprite(200,150,20,150)
  manaBar2.shapeColor = "blue";
  for (var i = 0; i < windowWidth + 64; i+=128) {
    ground = createSprite(i,height*1/2,50,50);
    ground.addImage("ground",ground_img);
    groundGroup.add(ground);
  }
}

function draw() {
  background(background_img);
  player.velocityY = player.velocityY + 0.4;
  enemyMovement();
  enemySpawn();
  player.collide(groundGroup);
  enemyGroup.collide(groundGroup);
  medkit.collide(groundGroup);
  energy.collide(groundGroup);
  
  if (player.isTouching(enemyGroup) && invincibility < 0) {
    for (var i = 0; i <= a; i+=1) {
      if (player.isTouching(enemies[i])){
        if (enemies[i].x > player.x) {
          player.x = player.x - 100;
        } else {
          player.x = player.x + 100;
        }
      }
    }
    
    health = health - 10;
    healthBar2.destroy();
    if (health > 0) {
      healthBar2 = createSprite(100,225-(3/4)*health,20,(3/2)*health);
      healthBar2.shapeColor = "green";
    }

    invincibility = 30;
    player.shapeColor = rgb(0,20,150,0.25);
  }
  if (player.isTouching(medkit)) {
    medkit.destroy();
    if (health != 100) {
      health = health + 5;
      healthBar2.destroy();
      healthBar2 = createSprite(100,225-(3/4)*health,20,(3/2)*health);
      healthBar2.shapeColor = "green";
    }
  }
  if (player.isTouching(energy)) {
    energy.destroy();
    mana = mana + 10;
    manaBar2.destroy();
    manaBar2 = createSprite(200,225-(3/8)*mana,20,(3/4)*mana);
    manaBar2.shapeColor = "blue";
  }

  if(invincibility >= 0) {
    player.shapeColor = rgb(0,20,150, 0.25);
    if(invincibility === 0) {
      player.shapeColor = rgb(0,20,150);
    }
    invincibility = invincibility - 1;
  }

  if(cooldown > 0){
   /* cooldownBar2 = createSprite(100,160-4*cooldown,20,8*cooldown);
    cooldownBar2.shapeColor = "red";*/
    cooldown = cooldown - 1;
  }
  if(cooldown2 > 0){
    cooldownBar2 = createSprite(100,360-2*cooldown2,20,4*cooldown2);
    
    cooldownBar2.lifetime = 1;
    cooldown2 = cooldown2 - 1;
  }
  if(cooldown3 > 0){
    cooldownBar4 = createSprite(200,360-cooldown3,20,2*cooldown3);
    cooldownBar4.lifetime = 1;
    cooldown3 = cooldown3 - 1;
  }
  if (ground.y - player.y <= 41 && player.velocityX != 0) {
    player.velocityX = 0;
  }
  if(ground.y - player.y <= 41 && keyWentDown("w")) {
    player.velocityY = -10;
    if (keyDown("shift") && keyDown("a")){
      player.velocityX = -10;
   } else if (keyDown("a")) {
     player.velocityX = -5;
   } else if (keyDown("shift") && keyDown("d")) {
    player.velocityX = 10;
   } else if(keyDown("d")) {
    player.velocityX = 5;
   }
   if (keyDown("a") && keyDown("d")) {
    player.velocityX = 0;
   }
  }
  if(keyDown("a") && ground.y - player.y <= 41) {
    pastPosition = player.x;
    if (keyDown("shift")) {
      player.x = player.x - 10;
    } else {
      player.x = player.x - 5;
    }
    
  }
  if(keyDown("d") && ground.y - player.y <= 41) {
    pastPosition = player.x;
    if (keyDown("shift")) {
      player.x = player.x + 10;
    } else {
      player.x = player.x + 5;
    }
  }
  if (keyWentDown("i") && cooldown === 0 && cooldown2 < 25 && cooldown3 < 55) {
    attack();
    cooldown = 6;
  }
  if (keyWentDown("o") && cooldown2 === 0 && cooldown < 3 && cooldown3 < 55) {
    swordBeam();
    cooldown2 = 30;
  }
  if (keyWentDown("p") && cooldown3 === 0 && cooldown <3 && cooldown2 < 25) {
    swordSlash();
    cooldown3 = 60;
  }
  if (enemyGroup.isTouching(sword)) {
    for (var i = 0; i <= a; i+=1) {
      if (sword.isTouching(enemies[i])){
        kill = enemies[i];
        lootDrops();
        
        enemies[i].destroy();
      }
    }
  }
  if (enemyGroup.isTouching(beam)) {
    for (var i = 0; i <= a; i+=1) {
      if (beam.isTouching(enemies[i])){
        kill = enemies[i];
        lootDrops();
        enemies[i].destroy();
        beam.destroy();
      }
    }
  }
  if (enemyGroup.isTouching(slash)) {
    for (var i = 0; i <= a; i+=1) {
      
      if (slash.isTouching(enemies[i])){
        kill = enemies[i];
        lootDrops();
        enemies[i].destroy();
      }
    }
  }
  
  drawSprites();
}



function attack() {
  if (player.x - pastPosition < 0) {
    sword = createSprite(player.x - 50,player.y,50,10)
  } else {
    sword = createSprite(player.x + 50,player.y,50,10)
  }
  sword.shapeColor = "white";
  sword.lifetime = 2;
}

function swordBeam() {
  if (player.x - pastPosition < 0) {
    beam = createSprite(player.x-25,player.y,10,50)
  beam.velocityX = -20;
  } else {
    beam = createSprite(player.x+25,player.y,10,50)
    beam.velocityX = 20;
  }
  mana = mana - 10;
  manaBar2.destroy();
  if (mana > 0) {
    manaBar2 = createSprite(200,225-(3/8)*mana,20,(3/4)*mana);
    manaBar2.shapeColor = "blue";
  }
  beam.shapeColor = "white";
  beam.lifetime = 30;
}

function swordSlash() {
  if (player.x - pastPosition < 0) {
    player.x = player.x - 250;
    slash = createSprite(player.x+125,player.y,200,10);
  
  } else {
    player.x = player.x + 250
    slash = createSprite(player.x-125, player.y,200,10);
  }
  mana = mana - 15;
  manaBar2.destroy();
  if (mana > 0) {
    manaBar2 = createSprite(200,225-(3/8)*mana,20,(3/4)*mana);
    manaBar2.shapeColor = "blue";
  }
  slash.shapeColor = "white";
  slash.lifetime = 2;
}

function enemySpawn() {
  if (frameCount%60 === 0) {
    a = a + 1;
    enemy = createSprite(width*4/5, height/2 - 100, 50, 50)
    enemy.velocityX = -2
    //if ()
    //console.log(enemyship.velocityY);
    enemy.lifetime = 500;
    enemyGroup.add(enemy);
    enemies.push(enemy);
    //console.log(enemies);
  }
}
function enemyMovement() {
  if (a >= 0) {
    for (var q = 0; q <= a; q+=1) {
      /*if (ground.y - enemies[q].y <= 41) {
        enemies[q].velocityY = -5;
      }*/
      enemies[q].velocityY =  enemies[q].velocityY + 0.4;

    }
  }
  }


  function lootDrops() {
    if (Math.round(random(1,10)) === 5 && medkit.lifetime === 0){
      medkit = createSprite(kill.x,kill.y,10,10);
      medkit.addImage("medkit",medkit_img);
      medkit.velocityY = 1;
      medkit.lifetime = 100;
    } else if (Math.round(random(1,10)) === 6 && energy.lifetime === 0) {
      energy = createSprite(kill.x,kill.y,10,10);
      energy.addImage("energy pack",energy_img);
      energy.velocityY = 1;
      energy.lifetime = 100;
      energy.scale = 0.194;
    }
  }