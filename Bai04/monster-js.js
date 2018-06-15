//Main Canvas
var containCanvas = document.getElementById("containCanvas");
var ctx = containCanvas.getContext("2d");
//Menu canvas
var menuCanvas = document.getElementById("menuCanvas");
ctxMenu = menuCanvas.getContext("2d");

const FPS = 30;
//frame per second
const TICKS = 1000 / FPS;

//speed monster
var speedArr = [ 2, 4, 6, 10]; 

//score begin
var score = 100; 

//status game
var running = true;

//heart
var heart = 3;
var end = false; 
var highScore = 0; 
var level = 0; 
var speed = speedArr[0]; 

var boomNum = 3;
var bloodList = [];

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var lastUpdateTime = Date.now();

//Init High Score Session Storage
if (sessionStorage.getItem("highscore") == null) {
	sessionStorage.setItem("highscore", 0);
} else {
	highScore = sessionStorage.getItem("highscore");
}

/**
 * Class Monster
 * 
 */
function Monster(initX, initY, x, y, toX, toY, initToX, initToY, die, dieX, dieY, visible) {
	this.initX   = initX;   //position x default
	this.initY   = initY;   //position y default
	this.x       = x;       //position x current
	this.y       = y;       //position y current
	this.toX     = toX;     //move to position x
	this.toY     = toY;     //move to position y
	this.initToX = initToX; //move to position x default
	this.initToY = initToY; //move to position y default
	this.die     = die;     //boolean die
	this.dieX    = dieX;    //position x when die
	this.dieY    = dieY;    //position y when die
	this.visible = visible; //boolean visible
}

//Add method move monster
Monster.prototype.move = function() {

	if (this.x == this.toX && this.y == this.toY) {
		this.x = this.toX;
		this.y = this.toY;
		this.toX = this.initX;
		this.toY = this.initY;
	}

	if (this.x < this.toX) {
		this.x += speed;
	} else if (this.x > this.toX) {
		this.x -= speed;
	}
	if (this.y < this.toY) {
		this.y += speed;
	} else if (this.y > this.toY) {
		this.y -= speed;
	}

	//disable monster
	if (this.x == this.initX && this.y == this.initY) {
		this.visible = false;
		this.x = this.initX;
		this.y = this.initY;
		this.toX = this.initToX;
		this.toY = this.initToY;
		score -= 10;
		randomMonster();
	}
};

//Init object monster form class Monster
var monster1 = new Monster(0,   0,   0,   0,   120, 120, 120, 120, false, 0, 0, true);
var monster2 = new Monster(210, 0,   210, 0,   210, 120, 210, 120, false, 0, 0, false);
var monster3 = new Monster(420, 0,   420, 0,   300, 120, 300, 120, false, 0, 0, false);
var monster4 = new Monster(0,   210, 0,   210, 120, 210, 120, 210, false, 0, 0, false);
var monster5 = new Monster(420, 210, 420, 210, 300, 210, 300, 210, false, 0, 0, false);
var monster6 = new Monster(0,   420, 0,   420, 120, 300, 120, 300, false, 0, 0, false);
var monster7 = new Monster(210, 420, 210, 420, 210, 300, 210, 300, false, 0, 0, false);
var monster8 = new Monster(420, 420, 420, 420, 300, 300, 300, 300, false, 0, 0, false);

//Array monster object
var monster = [monster1, monster2, monster3, monster4, monster5, monster6, monster7, monster8];
/*=============================================
				RESOURCE GAME 
=============================================*/

//Main Background
var bgImage = new Image();
bgImage.src = "images/mainbg.jpg";

//Menu Background
var mnImage = new Image();
mnImage.src = "images/menubg.jpg";

//--------Monster-----------//
var monsterImage = new Image();

//Monster Terroza
var monsterTerrozaImage = new Image();
monsterTerrozaImage.src = "images/Terroza.png";
monsterImageSize = {
	width: 100,
	height: 100
};

//monster Scary
var monsterScaryImage = new Image();
monsterScaryImage.src = "images/Scary.png";

//monster Jake
var monsterJakeImage = new Image();
monsterJakeImage.src = "images/Jake.png";

//monster Sea
var monsterSeaImage = new Image();
monsterSeaImage.src = "images/Sea.png";

monsterImage = monsterTerrozaImage;
//------End monster--------//

//Blood
var bloodImage = new Image();
bloodImage.src = "images/blood.png";

//Bom
var boomImage = new Image();
boomImage.src = "images/bombb.png";

//Explosion
var explosionReady = false;
var explosionImage = new Image();
explosionImage.src = "images/boom.png";

//Heart
var heartImage = new Image();
heartImage.src = "images/heart.png";

//Pause
var pauseImage = new Image();
pauseImage.src = "images/pause_btn.png";

//Play
var playImage = new Image();
playImage.src = "images/play.png";

//Restart
var restartImage = new Image();
restartImage.src = "images/restart_btn.png";

//Game over
var overImage = new Image();
overImage.src = "images/over.png";
/*=====  End of RESOURCE GAME  ======*/


/**
 * Render background, items, monster, score,... 
 *
 */
function render() {

	/*----------  Contain canvas  ----------*/
	//background
	ctx.drawImage(bgImage, 0, 0);

	//boom no
	if(explosionReady) {
		ctx.drawImage(explosionImage, 100, 100, 300, 300);
	}

	//level
	ctx.fillStyle = "#F1F1F1";
	ctx.font = "24px Time New roman";
	ctx.fillText("Level: " + (level + 1), 25, 32);

	//monster
	for(var i = 0; i < 8; i++){
		if (monster[i].visible)
			ctx.drawImage(monsterImage, monster[i].x, monster[i].y, 100, 100);
	}
	/*----------  End Contain canvas  ----------*/

	/*----------  Menu canvas  ----------*/
	//background menu
	ctxMenu.drawImage(mnImage, 0, 0);
	//Boom
	ctxMenu.drawImage(boomImage, 430, 25, 55, 55);
	//Pause
	ctxMenu.drawImage(pauseImage, 380, 35, 40, 40);	
	//Restart
	ctxMenu.drawImage(restartImage, 320, 35, 40, 40);
	//heart img
	var xH = 90;
	for(h = 1; h <= heart; h++) {
		ctxMenu.drawImage(heartImage, xH, 15);
		xH += 34;
	}
	ctxMenu.font = "25px Arial";
	ctxMenu.fillStyle = "#FFF";
	//Heart
	ctxMenu.fillText("Heart:", 10, 35);
	//Score
	ctxMenu.fillText("Score: " + score, 10, 70);
	//Number Boom
	ctxMenu.fillText(boomNum, 465, 40);

	/*----------  End Menu canvas  ----------*/
}
/**
 * Update Game
 *
 */
function update() {
}

/**
 * Main function
 *
 */
function main() {
	requestAnimationFrame(main);
	
	var now = Date.now();
	var differentTime = now - lastUpdateTime;
	if (differentTime >= TICKS) {
		render();
	}
	if (running) {
	}
}
//Run
main();