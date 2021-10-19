//criando as variaveis
var ENCERAR =  0;
var JOGAR = 1;
var modojogo = JOGAR;
var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var rand;
var nuvem, gruponuven, nuvemImg;
var obstaculo, grupoobstaculo ,obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5, obstaculo6;
var imgFimDeJogo,imgReiniciar
var FimDeJogo, reiniciar
var pontuacao = 0;
var sompulo, somcheckpoint, somdeath;
var controle = 1;

function preload() {
  //colocando as imagens
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_colidiu = loadImage("trex_collided.png");
  nuvemImg = loadImage("cloud.png")
  imagemdosolo = loadImage("ground2.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  imgReiniciar = loadImage("restart.png");
  imgFimDeJogo = loadImage("gameOver.png");
  
  sompulo = loadSound("jump.mp3");
  somcheckpoint = loadSound("checkPoint.mp3");
  somdeath = loadSound("die.mp3");
}
function setup() {
  createCanvas(600, 200);
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("collided" ,trex_colidiu);
  trex.scale = 0.5;

  //criar um sprite do solo
  solo = createSprite(200,165,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  
  fimDeJogo = createSprite(300,100);
  fimDeJogo.addImage(imgFimDeJogo);
  
  reiniciar = createSprite(300,140);
  reiniciar.addImage(imgReiniciar);
  
  fimDeJogo.scale = 0.5;
  reiniciar.scale = 0.5;
  
  //sprite do solo invisivel
  soloinvisivel = createSprite(200,192,400,10);
  soloinvisivel.visible = false;
  
  gruponuven = new Group();
  grupoobstaculo = new Group();
  
  trex.setCollider("circle",0,0,40);
  
  reiniciar.visible = false;
  fimDeJogo.visible = false;
}
function draw() {
  background("white");
  text("pontuação:" + pontuacao,500,30);
  if(keyDown("space")){
    controle = 0;
  }
  if(controle === 0){
  if(modojogo === JOGAR){
    fimDeJogo.visible = false
    reiniciar.visible = false
    solo.velocityX = -(6 + pontuacao / 250);
    if(grupoobstaculo.isTouching(trex)){
      modojogo = ENCERAR
      trex.changeAnimation("collided", trex_colidiu);
    }
    pontuacao = pontuacao + Math.round(frameRate() / 30);
    if (solo.x < 0) {
     solo.x = solo.width / 2;
   }
    if (keyDown("space") && trex.y > 160) {
     trex.velocityY = -14;
     sompulo.play();
   }
  gerarNuvem(); 
  gerarObstaculo();
  if(pontuacao > 0 && pontuacao % 500 == 0){
    
    somcheckpoint.play();
   }
  }
  else if(modojogo === ENCERAR){
    solo.velocityX = 0;
    grupoobstaculo.setVelocityXEach(0);
    gruponuven.setVelocityXEach(0);
    fimDeJogo.visible = true
    reiniciar.visible = true
    if(mousePressedOver(reiniciar)){
    reset();
    }
   }
  }
  //gravidade
  trex.velocityY = trex.velocityY + 0.9;
  
  //trex batendo com solo
  trex.collide(soloinvisivel);
  drawSprites();
}

function gerarNuvem(){
  if(frameCount % 100 === 0){
    nuvem = createSprite(600,100,40,10);
    nuvem.velocityX = -2;
    nuvem.addImage(nuvemImg);
    nuvem.scale = 0.5;
    //mexendo a nuvem d baixo pra cima
    nuvem.y = Math.round(random(10,150));
    //botando o trex na frente das nuvens
    trex.depth = nuvem.depth + 1;
    nuvem.lifetime = 350;
    gruponuven.add(nuvem);
  }
}
function gerarObstaculo(){
  if(frameCount % 60 === 0){
    obstaculo = createSprite(650,160,50,50);
    obstaculo.velocityX = -(6 + pontuacao / 250);
    var valor = Math.round(random(1,6));
    switch(valor){
      case 1:obstaculo.addImage(obstaculo1);
        break;
      case 2:obstaculo.addImage(obstaculo2);
        break;
      case 3:obstaculo.addImage(obstaculo3);
        break;
      case 4:obstaculo.addImage(obstaculo4);
        break;
      case 5:obstaculo.addImage(obstaculo5);
        break;
      case 6:obstaculo.addImage(obstaculo6);
        break;
        default:break;
    }
    obstaculo.scale = 0.5;
    obstaculo.lifetime = 350;
    grupoobstaculo.add(obstaculo);
  }
}

function reset(){
  modojogo = JOGAR
  gruponuven.destroyEach();
  grupoobstaculo.destroyEach();
  trex.changeAnimation("running", trex_correndo);
  pontuacao = 0;
  controle = 1
  reiniciar.visible = false;
  fimDeJogo.visible = false;
}