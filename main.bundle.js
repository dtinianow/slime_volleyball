/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);

	__webpack_require__(10);

	new Game();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);

	Game.prototype.gameOverMenu = function (keysDown) {
	  for (var key in keysDown) {
	    var value = Number(key);
	    if (value === 13) {
	      this.startNewMatch();
	    }
	    if (value === 77) {
	      this.scoreboard.resetMatchScore();
	    }
	    if (value === 27) {
	      this.returnToMainMenu();
	    }
	  }
	};

	Game.prototype.renderBackground = function (keysDown) {
	  if (this.difficulty === "normal") {
	    var background = { beach: "http://i.imgur.com/gDJx6ws.jpg", mars: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/PIA17944-MarsCuriosityRover-AfterCrossingDingoGapSanddune-20140209.jpg/1280px-PIA17944-MarsCuriosityRover-AfterCrossingDingoGapSanddune-20140209.jpg", underWater: "http://www.publicdomainpictures.net/pictures/140000/velka/seabed-underwater-1443611137nes.jpg", minions: "https://s-media-cache-ak0.pinimg.com/originals/59/45/06/594506d41c836f70139b90a0f67e1563.gif", lotr: "https://media.giphy.com/media/c5iRPkrIqDHQk/giphy.gif", unicorn: "http://f.owledge.de/mlp/PFUDOR_dancing_fullres.gif", mountains: "https://lonelyplanetimages.imgix.net/a/g/hi/t/12dec8938220093eb7f1fdb8a9ce40b8-the-rocky-mountains.jpg?sharp=10&vib=20&w=1200", technicolor: "http://i.imgur.com/CcKD4Jd.gif", matrix: "https://reneweddesign.files.wordpress.com/2015/07/matrix-2.gif?w=1280&h=1024&crop=1" };
	    for (var key in keysDown) {
	      var value = Number(key);
	      if (value === 49) {
	        this.changeBackgroundImage(background.beach);
	      }
	      if (value === 50) {
	        this.changeBackgroundImage(background.mars);
	      }
	      if (value === 51) {
	        this.changeBackgroundImage(background.underWater);
	      }
	      if (value === 52) {
	        this.changeBackgroundImage(background.minions);
	      }
	      if (value === 53) {
	        this.changeBackgroundImage(background.lotr);
	      }
	      if (value === 54) {
	        this.changeBackgroundImage(background.unicorn);
	      }
	      if (value === 55) {
	        this.changeBackgroundImage(background.mountains);
	      }
	      if (value === 56) {
	        this.changeBackgroundImage(background.technicolor);
	      }
	      if (value === 57) {
	        this.changeBackgroundImage(background.matrix);
	      }
	      if (value === 27) {
	        this.returnToMainMenu();
	      }
	    }
	  }
	};

	Game.prototype.mainMenu = function (keysDown) {
	  for (var key in keysDown) {
	    var value = Number(key);
	    if (value === 78) {
	      this.startNormalMode();this.player2.slime.ai = false;
	    }
	    if (value === 90) {
	      this.startNormalMode();this.player2.slime.ai = true;
	    }
	    if (value === 88) {
	      this.startInsaneMode();this.player2.slime.ai = true;
	    }
	    if (value === 73) {
	      this.startInsaneMode();this.player2.slime.ai = false;
	    }
	    if (value === 81) {
	      this.showInstructions = true;
	    }
	  }
	};

	Game.prototype.displayInstructions = function (keysDown) {
	  for (var key in keysDown) {
	    var value = Number(key);
	    if (value === 13) {
	      this.showInstructions = false;
	    }
	  }
	};

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Net = __webpack_require__(3);
	var Ball = __webpack_require__(4);
	var Scoreboard = __webpack_require__(5);
	var Menu = __webpack_require__(6);
	var Player = __webpack_require__(7);
	var randomColor = __webpack_require__(9);

	function Game() {
	  var canvas = document.createElement('canvas');
	  canvas.setAttribute("id", "canvasID");
	  canvas.width = 1100;
	  canvas.height = 600;
	  var context = canvas.getContext('2d');
	  var keysDown = {};
	  this.ball = new Ball({ context: context, canvas: canvas });
	  var player1Attributes = { context: context, canvas: canvas, keysDown: keysDown, ball: this.ball, player: "player 1" };
	  var player2Attributes = { x: 775, color: 'green', context: context, canvas: canvas, keysDown: keysDown, ball: this.ball, player: "player 2" };
	  var player1KeyCodes = { moveLeft: 65, moveRight: 68, jump: 87 };
	  var player2KeyCodes = { moveLeft: 37, moveRight: 39, jump: 38 };
	  this.player1 = new Player(player1Attributes, player1KeyCodes);
	  this.player2 = new Player(player2Attributes, player2KeyCodes);
	  this.net = new Net(context);
	  this.scoreboard = new Scoreboard({ canvas: canvas, context: context });
	  this.showGameOverMenu = false;
	  this.showMainMenu = true;
	  this.showInstructions = false;
	  this.menu = new Menu({ context: context, canvas: canvas });
	  this.difficulty = "normal";
	  this.isNewPoint = false;

	  window.onload = function () {
	    document.body.appendChild(canvas);
	  };

	  window.addEventListener('keydown', function (e) {
	    keysDown[e.keyCode] = 'active';
	  });

	  window.addEventListener('keyup', function (e) {
	    delete keysDown[e.keyCode];
	  });

	  requestAnimationFrame(function gameLoop() {
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    if (this.showGameOverMenu) {
	      this.saveScore();
	      this.scoreboard.displayWinner();
	      this.gameOverMenu(keysDown);
	    } else if (this.showInstructions) {
	      this.menu.getInstructions();
	      this.displayInstructions(keysDown);
	    } else if (this.showMainMenu) {
	      this.menu.render();
	      this.mainMenu(keysDown);
	    } else {
	      this.renderGame(canvas, keysDown);
	    }
	    requestAnimationFrame(gameLoop.bind(this));
	  }.bind(this));
	}

	Game.prototype.renderGame = function (canvas, keysDown) {
	  this.renderBackground(keysDown);
	  this.scoreboard.render();
	  this.net.render();
	  this.player1.render(keysDown);
	  this.player2.render(keysDown);
	  this.move(canvas);
	  this.ball.render();
	};

	Game.prototype.saveScore = function () {
	  localStorage.setItem('player1Score', this.scoreboard.player1GamesWon);
	  localStorage.setItem('player2Score', this.scoreboard.player2GamesWon);
	};

	Game.prototype.changeBackgroundImage = function (background) {
	  document.getElementById('canvasID').style.background = 'url(' + background + ')';
	};

	Game.prototype.scoreGame = function (canvas) {
	  this.checkIfPointScored(canvas);
	  this.ball.resetAfterPoint(this.difficulty);
	  this.player1.slime.resetPosition();
	  this.player2.slime.resetPosition();
	  if (this.scoreboard.gameOver()) {
	    this.showGameOverMenu = true;
	  }
	  this.insanePlayer1GamePoint();
	  this.insanePlayer2GamePoint();
	};

	Game.prototype.checkIfPointScored = function (canvas) {
	  if (this.ball.x > canvas.width / 2) {
	    this.scoreboard.player1Score++;
	    this.ball.x = 275;
	  } else if (this.ball.x < canvas.width / 2) {
	    this.scoreboard.player2Score++;
	    this.ball.x = 775;
	  }
	};

	Game.prototype.move = function (canvas) {
	  [this.player1, this.player2].forEach(function (player) {
	    this.collideWithPlayer(player);
	    player.slime.gravity();
	  }.bind(this));
	  this.delayServe();
	  this.ballCollisions(canvas);
	  this.ball.movement();
	};

	Game.prototype.ballCollisions = function (canvas) {
	  this.collideWithWall(canvas);
	  this.collideWithGround(canvas);
	  this.collideWithNet();
	  this.collideWithCeiling();
	};

	Game.prototype.calculateDistance = function (player) {
	  var dx = this.ball.x - player.slime.x;
	  var dy = this.ball.y - player.slime.y;
	  return Math.sqrt(dx * dx + dy * dy);
	};

	Game.prototype.collideWithPlayer = function (player) {
	  var distance = this.calculateDistance(player);
	  if (this.ball.isTouchingSlime(distance, player)) {
	    this.ball.bounce(player);
	    this.insaneSlimeCollision(player);
	  }
	};

	Game.prototype.delayServe = function () {
	  if (this.isNewPoint) {
	    this.ball.y_speed = 0;
	  }
	};

	Game.prototype.collideWithWall = function (canvas) {
	  if (this.ball.isTouchingWall(canvas)) {
	    this.ball.x_speed *= -1.1;
	    this.insaneBorderCollision();
	  }
	};

	Game.prototype.collideWithGround = function (canvas) {
	  if (this.ball.isTouchingGround(canvas)) {
	    this.scoreGame(canvas);
	    this.isNewPoint = true;
	    setTimeout(function () {
	      this.isNewPoint = false;
	    }.bind(this), 1000);
	  }
	};

	Game.prototype.collideWithNet = function () {
	  if (this.ball.isTouchingNet(this.net)) {
	    this.ball.y_speed *= -0.9;
	    this.ball.x_speed *= -1.1;
	    this.insaneNetCollision(this.ball);
	  }
	};

	Game.prototype.collideWithCeiling = function () {
	  if (this.ball.isTouchingCeiling()) {
	    this.ball.y_speed *= -1.1;
	    this.insaneBorderCollision();
	  }
	};

	Game.prototype.startNewMatch = function () {
	  this.checkDifficulty();
	};

	Game.prototype.checkDifficulty = function () {
	  if (this.difficulty === "insane") {
	    this.startInsaneMode();
	  }
	  if (this.difficulty === "normal") {
	    this.startNormalMode();
	  }
	};

	Game.prototype.startNormalMode = function () {
	  this.difficulty = "normal";
	  this.ball.radius = 20;
	  this.player1.slime.radius = 80;
	  this.player1.slime.color = "red";
	  this.player2.slime.color = "green";
	  this.player2.slime.radius = 80;
	  this.ball.speed = 23;
	  this.scoreboard.resetScore();
	  this.showGameOverMenu = false;
	  this.showMainMenu = false;
	};

	Game.prototype.returnToMainMenu = function () {
	  this.showMainMenu = true;
	  this.showGameOverMenu = false;
	  this.scoreboard.resetScore();
	};

	Game.prototype.insanePlayer1GamePoint = function () {
	  if (this.scoreboard.player1Score === 6 && this.difficulty === "insane" && this.showGameOverMenu === false) {
	    this.player1.slime.radius = 20;
	  }
	};

	Game.prototype.insanePlayer2GamePoint = function () {
	  if (this.scoreboard.player2Score === 6 && this.difficulty === "insane" && this.showGameOverMenu === false) {
	    this.player2.slime.radius = 20;
	  }
	};

	Game.prototype.startInsaneMode = function () {
	  this.ball.speed = 36;
	  this.difficulty = "insane";
	  this.ball.radius = 20;
	  this.player1.slime.radius = 80;
	  this.player1.slime.color = "red";
	  this.player2.slime.color = "green";
	  this.player2.slime.radius = 80;
	  this.scoreboard.resetScore();
	  document.getElementById('canvasID').style.background = randomColor();
	  this.showGameOverMenu = false;
	  this.showMainMenu = false;
	};

	Game.prototype.insaneSlimeCollision = function (player) {
	  if (this.difficulty === 'insane') {
	    player.slime.color = randomColor();
	  }
	};

	Game.prototype.insaneBorderCollision = function () {
	  if (this.difficulty === 'insane') {
	    document.getElementById('canvasID').style.background = randomColor();
	  }
	};

	Game.prototype.insaneNetCollision = function (ball) {
	  if (this.difficulty === 'insane') {
	    ball.radius = 80;
	  }
	};

	module.exports = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Net(context) {
	  this.x = 545;
	  this.y = 600;
	  this.width = 10;
	  this.height = -80;
	  this.context = context;
	  this.color = '#33334d';
	}

	Net.prototype.render = function () {
	  this.context.fillStyle = this.color;
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	};

	module.exports = Net;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Ball(attributes = {}) {
	  this.x = attributes.x || 275;
	  this.y = attributes.y || 300;
	  this.radius = attributes.radius || 20;
	  this.x_speed = attributes.x_speed || 0;
	  this.y_speed = attributes.y_speed || 5;
	  this.color = 'white';
	  this.context = attributes.context;
	  this.speed = attributes.speed || 23;
	}

	Ball.prototype.render = function () {
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
	  this.context.fillStyle = this.color;
	  this.context.fill();
	};

	Ball.prototype.isTouchingSlime = function (distance, player) {
	  return distance <= this.radius + player.slime.radius;
	};

	Ball.prototype.bounce = function (player) {
	  var angleRadians = Math.atan2(this.y - player.slime.y, this.x - player.slime.x);
	  this.y_speed = Math.sin(angleRadians) * this.speed;
	  this.x_speed = Math.cos(angleRadians) * this.speed;
	};

	Ball.prototype.isTouchingWall = function (canvas) {
	  return this.x <= 0 || this.x >= canvas.width;
	};

	Ball.prototype.isTouchingGround = function (canvas) {
	  return this.y > canvas.height + this.radius;
	};

	Ball.prototype.isTouchingNet = function (net) {
	  return this.x + this.radius >= 535 && this.x - this.radius <= 565 && this.y + this.radius >= net.y + net.height;
	};

	Ball.prototype.isTouchingCeiling = function () {
	  return this.y + this.radius <= 0;
	};

	Ball.prototype.resetAfterPoint = function (difficulty) {
	  this.y = 300;
	  this.x_speed = 0;
	  this.setSpeed(difficulty);
	};

	Ball.prototype.setSpeed = function (difficulty) {
	  if (difficulty === "insane") {
	    this.y_speed = 25;
	  } else {
	    this.y_speed = 5;
	  }
	};

	Ball.prototype.movement = function () {
	  this.y_speed += 0.8;
	  this.y += this.y_speed;
	  this.x += this.x_speed;
	};

	module.exports = Ball;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function Scoreboard(attributes = {}) {
	  this.player1Score = 0;
	  this.player2Score = 0;
	  this.player1GamesWon = localStorage.getItem('player1Score') || 0;
	  this.player2GamesWon = localStorage.getItem('player2Score') || 0;
	  this.winningScore = 7;
	  this.context = attributes.context;
	  this.canvas = attributes.canvas;
	}

	Scoreboard.prototype.render = function () {
	  this.context.font = "100px Verdana";
	  this.context.textAlign = "center";
	  this.context.fillText(this.player1Score + "-" + this.player2Score, this.canvas.width / 2, 100);
	};

	Scoreboard.prototype.displayWinner = function () {
	  this.context.font = "40px Verdana";
	  this.context.textAlign = "center";
	  if (this.player1Score >= this.winningScore) {
	    this.context.fillText('Game Over! Player 1 Wins!', this.canvas.width / 2, 150);
	  } else if (this.player2Score >= this.winningScore) {
	    this.context.fillText('Game Over! Player 2 Wins!', this.canvas.width / 2, 150);
	  }
	  this.displayTotalWins();
	  this.context.font = "30px Verdana";
	  this.context.fillText('Press `enter` to start a new game', this.canvas.width / 2, 450);
	  this.context.fillText('Press `m` to reset the match score', this.canvas.width / 2, 500);
	  this.context.fillText('Press `esc` to return to the menu', this.canvas.width / 2, 550);
	};

	Scoreboard.prototype.displayTotalWins = function () {
	  this.context.fillText('Player1   vs   Player2', this.canvas.width / 2, 250);
	  this.context.fillText(this.player1GamesWon + '    -    ' + this.player2GamesWon, this.canvas.width / 2, 350);
	};

	Scoreboard.prototype.resetScore = function () {
	  this.player1Score = 0;
	  this.player2Score = 0;
	};

	Scoreboard.prototype.resetMatchScore = function () {
	  localStorage.setItem('player1Score', 0);
	  localStorage.setItem('player2Score', 0);
	  this.player1GamesWon = 0;
	  this.player2GamesWon = 0;
	};

	Scoreboard.prototype.gameOver = function () {
	  return this.doesPlayer1Win() || this.doesPlayer2Win();
	};

	Scoreboard.prototype.doesPlayer1Win = function () {
	  if (this.player1Score >= this.winningScore) {
	    this.player1GamesWon++;
	    return true;
	  }
	};

	Scoreboard.prototype.doesPlayer2Win = function () {
	  if (this.player2Score >= this.winningScore) {
	    this.player2GamesWon++;
	    return true;
	  }
	};

	module.exports = Scoreboard;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function Menu(attributes = {}) {
	  this.context = attributes.context;
	  this.canvas = attributes.canvas;
	}

	Menu.prototype.render = function () {
	  this.context.textAlign = "center";
	  this.context.font = "90px Verdana";
	  this.context.fillText("Slime Volleyball", this.canvas.width / 2, 120);
	  this.displayOptions();
	};

	Menu.prototype.displayOptions = function () {
	  this.context.font = "35px Verdana";
	  this.context.fillText("First to 7 points wins!", this.canvas.width / 2, 180);
	  this.context.fillText("Press `n` for normal mode", this.canvas.width / 2, 260);
	  this.context.fillText("Press `i` for insane mode", this.canvas.width / 2, 340);
	  this.context.fillText("Press `z` to play against AI", this.canvas.width / 2, 420);
	  this.context.fillText("Press `x` to play insane AI", this.canvas.width / 2, 500);
	  this.context.fillText("Press `q` for instructions", this.canvas.width / 2, 580);
	};

	Menu.prototype.getInstructions = function () {
	  this.context.textAlign = "center";
	  this.context.font = "90px Verdana";
	  this.context.fillText("How To Play", this.canvas.width / 2, 150);
	  this.player1Instructions();
	  this.player2Instructions();
	  this.changeBackgroundInstructions();
	  this.returnToMainMenuInstructions();
	};

	Menu.prototype.player1Instructions = function () {
	  this.context.textAlign = "left";
	  this.context.font = "40px Verdana";
	  this.context.fillText("Player 1", this.canvas.width - 900, 260);
	  this.context.font = "30px Verdana";
	  this.context.fillText("a: move left", this.canvas.width - 900, 340);
	  this.context.fillText("d: move right", this.canvas.width - 900, 390);
	  this.context.fillText("w: jump", this.canvas.width - 900, 440);
	};

	Menu.prototype.player2Instructions = function () {
	  this.context.textAlign = "left";
	  this.context.font = "40px Verdana";
	  this.context.fillText("Player 2", this.canvas.width - 500, 260);
	  this.context.font = "30px Verdana";
	  this.context.fillText("left arrow key: move left", this.canvas.width - 500, 340);
	  this.context.fillText("right arrow key: move right", this.canvas.width - 500, 390);
	  this.context.fillText("up arrow key: jump", this.canvas.width - 500, 440);
	};

	Menu.prototype.changeBackgroundInstructions = function () {
	  this.context.textAlign = "center";
	  this.context.font = "20px Verdana";
	  this.context.fillText("To change the background during normal mode, press any key 1-9", this.canvas.width / 2, 500);
	};

	Menu.prototype.returnToMainMenuInstructions = function () {
	  this.context.font = "30px Verdana";
	  this.context.fillText("Press `enter` to return to main menu", this.canvas.width / 2, 560);
	};

	module.exports = Menu;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Slime = __webpack_require__(8);

	function Player(attributes, keyCodes) {
	  this.moveLeft = keyCodes.moveLeft;
	  this.moveRight = keyCodes.moveRight;
	  this.jump = keyCodes.jump;
	  this.slime = new Slime(attributes);
	}

	Player.prototype.render = function (keysDown) {
	  this.slime.keysDown = keysDown;
	  this.slime.updatePosition(this.moveLeft, this.moveRight, this.jump).render();
	};

	module.exports = Player;

/***/ },
/* 8 */
/***/ function(module, exports) {

	function Slime(attributes = {}) {
	  this.x = attributes.x || 275;
	  this.y = attributes.y || 600;
	  this.radius = 80;
	  this.speed = attributes.speed || 3;
	  this.color = attributes.color || 'red';
	  this.context = attributes.context;
	  this.keysDown = attributes.keysDown;
	  this.canvas = attributes.canvas;
	  this.ball = attributes.ball;
	  this.player = attributes.player;
	  this.jumping = false;
	  this.ai = false;
	}

	Slime.prototype.render = function () {
	  this.drawSlime();
	  this.drawEyes();
	  this.drawPupils();
	};

	Slime.prototype.drawSlime = function () {
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, Math.PI, false);
	  this.context.fillStyle = this.color;
	  this.context.fill();
	  this.context.closePath();
	};

	Slime.prototype.drawEyes = function () {
	  this.context.beginPath();
	  this.shouldDrawPlayer1Eye();
	  this.shouldDrawPlayer2Eye();
	  this.fillEyes();
	};

	Slime.prototype.shouldDrawPlayer1Eye = function () {
	  if (this.player === "player 1") {
	    this.drawPlayer1Eye();
	  }
	};

	Slime.prototype.shouldDrawPlayer2Eye = function () {
	  if (this.player === "player 2") {
	    this.drawPlayer2Eye();
	  }
	};

	Slime.prototype.drawPlayer1Eye = function () {
	  this.context.arc(this.x + 43, this.y - 54, 10, Math.PI * 2, false);
	};

	Slime.prototype.drawPlayer2Eye = function () {
	  this.context.arc(this.x - 43, this.y - 54, 10, Math.PI * 2, false);
	};

	Slime.prototype.fillEyes = function () {
	  this.context.fillStyle = "white";
	  this.context.fill();
	  this.context.closePath();
	};

	Slime.prototype.drawPupils = function () {
	  this.context.beginPath();
	  this.shouldDrawPlayer1Pupil();
	  this.shouldDrawPlayer2Pupil();
	  this.fillPupils();
	};

	Slime.prototype.shouldDrawPlayer1Pupil = function () {
	  if (this.player === "player 1") {
	    this.drawPlayer1Pupil();
	  }
	};

	Slime.prototype.shouldDrawPlayer2Pupil = function () {
	  if (this.player === "player 2") {
	    this.drawPlayer2Pupil();
	  }
	};

	Slime.prototype.drawPlayer1Pupil = function () {
	  this.context.arc(this.x + 40 + this.ball.x / 120, this.y - 53.5 - this.ball.y / 175, 4, Math.PI * 2, false);
	};

	Slime.prototype.drawPlayer2Pupil = function () {
	  this.context.arc(this.x - 47 + this.ball.x / 120, this.y - 53.5 - this.ball.y / 175, 4, Math.PI * 2, false);
	};

	Slime.prototype.fillPupils = function () {
	  this.context.fillStyle = "black";
	  this.context.fill();
	  this.context.closePath();
	};

	Slime.prototype.move = function (x, y) {
	  this.x += x;
	  this.y += y;
	};

	Slime.prototype.gravity = function () {
	  if (this.isJumping()) {
	    this.y += 7.5;
	  }
	};

	Slime.prototype.isJumping = function () {
	  return this.y < 600;
	};

	Slime.prototype.updatePosition = function (moveLeft, moveRight, jump) {
	  if (this.ai === false) {
	    for (var key in this.keysDown) {
	      var value = Number(key);
	      this.ifMoveRight(value, moveRight);
	      this.ifMoveLeft(value, moveLeft);
	      this.ifFinishJump(value, jump);
	      this.ifJumping(value, jump);
	      this.ifStayingStill();
	    }
	  }
	  this.ifAI(jump);
	  return this;
	};

	Slime.prototype.ifAI = function (jump) {
	  if (this.ai === true && this.ball.x > this.canvas.width / 2) {
	    var x_difference = this.x - this.ball.x;
	    if (this.ball.x === 775) {
	      x_difference = 0.5;
	    } else if (x_difference === 0) {
	      x_difference = 5;
	    } else if (-80 > x_difference > 0.1) {
	      x_difference = 15;
	    } else if (0.1 < x_difference < 80) {
	      x_difference = -15;
	    }
	    this.move(x_difference, 0);
	    var y_difference = this.y - this.radius - 60 < this.ball.y && x_difference < 80;
	    if (y_difference === true) {
	      var value = jump;
	      this.ifFinishJump(value, jump);
	      this.ifJumping(value, jump);
	    }
	    if (this.x < this.canvas.width / 2 + this.radius) {
	      this.x = this.canvas.width / 2 + this.radius;
	    } else if (this.x + this.radius > this.canvas.width) {
	      this.x = this.canvas.width - this.radius;
	    }
	  }
	};

	Slime.prototype.ifMoveRight = function (value, moveRight) {
	  if (value === moveRight && this.isNotTouchingRightWall() && this.isNotTouchingLeftSideOfNet()) {
	    this.moveToRight();
	  }
	};

	Slime.prototype.ifMoveLeft = function (value, moveLeft) {
	  if (value === moveLeft && this.isNotTouchingLeftWall() && this.isNotTouchingRightSideOfNet()) {
	    this.moveToLeft();
	  }
	};

	Slime.prototype.ifFinishJump = function (value, jump) {
	  if (value === jump && this.isOnTheGround() && !this.jumping) {
	    this.finishJump();
	  }
	};

	Slime.prototype.ifJumping = function (value, jump) {
	  if (value === jump && this.jumping) {
	    this.jump();
	  }
	};

	Slime.prototype.isNotTouchingRightWall = function () {
	  return this.x < this.canvas.width - this.radius;
	};

	Slime.prototype.isNotTouchingLeftSideOfNet = function () {
	  return this.x !== this.canvas.width / 2 - this.radius - 5;
	};

	Slime.prototype.isNotTouchingLeftWall = function () {
	  return this.x > 0 + this.radius;
	};

	Slime.prototype.isNotTouchingRightSideOfNet = function () {
	  return this.x !== this.canvas.width / 2 + this.radius + 5;
	};

	Slime.prototype.isOnTheGround = function () {
	  return this.y === 600;
	};

	Slime.prototype.moveToRight = function () {
	  return this.move(10, 0);
	};

	Slime.prototype.moveToLeft = function () {
	  return this.move(-10, 0);
	};

	Slime.prototype.finishJump = function () {
	  this.jump();
	  this.jumping = true;
	};

	Slime.prototype.ifStayingStill = function () {
	  this.move(0, 0);
	};

	Slime.prototype.jump = function () {
	  if (this.y >= 520) {
	    this.move(0, -15);
	  }
	  if (this.y <= 520) {
	    this.jumping = false;
	  }
	};

	Slime.prototype.resetPosition = function () {
	  if (this.player === 'player 1') {
	    this.x = 275;
	  }
	  if (this.player === 'player 2') {
	    this.x = 775;
	  }
	  this.y = 600;
	};

	module.exports = Slime;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// randomColor by David Merfield under the CC0 license
	// https://github.com/davidmerfield/randomColor/

	;(function(root, factory) {

	  // Support AMD
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	  // Support CommonJS
	  } else if (typeof exports === 'object') {
	    var randomColor = factory();

	    // Support NodeJS & Component, which allow module.exports to be a function
	    if (typeof module === 'object' && module && module.exports) {
	      exports = module.exports = randomColor;
	    }

	    // Support CommonJS 1.1.1 spec
	    exports.randomColor = randomColor;

	  // Support vanilla script loading
	  } else {
	    root.randomColor = factory();
	  }

	}(this, function() {

	  // Seed to get repeatable colors
	  var seed = null;

	  // Shared color dictionary
	  var colorDictionary = {};

	  // Populate the color dictionary
	  loadColorBounds();

	  var randomColor = function (options) {

	    options = options || {};

	    // Check if there is a seed and ensure it's an
	    // integer. Otherwise, reset the seed value.
	    if (options.seed && options.seed === parseInt(options.seed, 10)) {
	      seed = options.seed;

	    // A string was passed as a seed
	    } else if (typeof options.seed === 'string') {
	      seed = stringToInteger(options.seed);

	    // Something was passed as a seed but it wasn't an integer or string
	    } else if (options.seed !== undefined && options.seed !== null) {
	      throw new TypeError('The seed value must be an integer or string');

	    // No seed, reset the value outside.
	    } else {
	      seed = null;
	    }

	    var H,S,B;

	    // Check if we need to generate multiple colors
	    if (options.count !== null && options.count !== undefined) {

	      var totalColors = options.count,
	          colors = [];

	      options.count = null;

	      while (totalColors > colors.length) {

	        // Since we're generating multiple colors,
	        // incremement the seed. Otherwise we'd just
	        // generate the same color each time...
	        if (seed && options.seed) options.seed += 1;

	        colors.push(randomColor(options));
	      }

	      options.count = totalColors;

	      return colors;
	    }

	    // First we pick a hue (H)
	    H = pickHue(options);

	    // Then use H to determine saturation (S)
	    S = pickSaturation(H, options);

	    // Then use S and H to determine brightness (B).
	    B = pickBrightness(H, S, options);

	    // Then we return the HSB color in the desired format
	    return setFormat([H,S,B], options);
	  };

	  function pickHue (options) {

	    var hueRange = getHueRange(options.hue),
	        hue = randomWithin(hueRange);

	    // Instead of storing red as two seperate ranges,
	    // we group them, using negative numbers
	    if (hue < 0) {hue = 360 + hue;}

	    return hue;

	  }

	  function pickSaturation (hue, options) {

	    if (options.luminosity === 'random') {
	      return randomWithin([0,100]);
	    }

	    if (options.hue === 'monochrome') {
	      return 0;
	    }

	    var saturationRange = getSaturationRange(hue);

	    var sMin = saturationRange[0],
	        sMax = saturationRange[1];

	    switch (options.luminosity) {

	      case 'bright':
	        sMin = 55;
	        break;

	      case 'dark':
	        sMin = sMax - 10;
	        break;

	      case 'light':
	        sMax = 55;
	        break;
	   }

	    return randomWithin([sMin, sMax]);

	  }

	  function pickBrightness (H, S, options) {

	    var bMin = getMinimumBrightness(H, S),
	        bMax = 100;

	    switch (options.luminosity) {

	      case 'dark':
	        bMax = bMin + 20;
	        break;

	      case 'light':
	        bMin = (bMax + bMin)/2;
	        break;

	      case 'random':
	        bMin = 0;
	        bMax = 100;
	        break;
	    }

	    return randomWithin([bMin, bMax]);
	  }

	  function setFormat (hsv, options) {

	    switch (options.format) {

	      case 'hsvArray':
	        return hsv;

	      case 'hslArray':
	        return HSVtoHSL(hsv);

	      case 'hsl':
	        var hsl = HSVtoHSL(hsv);
	        return 'hsl('+hsl[0]+', '+hsl[1]+'%, '+hsl[2]+'%)';

	      case 'hsla':
	        var hslColor = HSVtoHSL(hsv);
	        return 'hsla('+hslColor[0]+', '+hslColor[1]+'%, '+hslColor[2]+'%, ' + Math.random() + ')';

	      case 'rgbArray':
	        return HSVtoRGB(hsv);

	      case 'rgb':
	        var rgb = HSVtoRGB(hsv);
	        return 'rgb(' + rgb.join(', ') + ')';

	      case 'rgba':
	        var rgbColor = HSVtoRGB(hsv);
	        return 'rgba(' + rgbColor.join(', ') + ', ' + Math.random() + ')';

	      default:
	        return HSVtoHex(hsv);
	    }

	  }

	  function getMinimumBrightness(H, S) {

	    var lowerBounds = getColorInfo(H).lowerBounds;

	    for (var i = 0; i < lowerBounds.length - 1; i++) {

	      var s1 = lowerBounds[i][0],
	          v1 = lowerBounds[i][1];

	      var s2 = lowerBounds[i+1][0],
	          v2 = lowerBounds[i+1][1];

	      if (S >= s1 && S <= s2) {

	         var m = (v2 - v1)/(s2 - s1),
	             b = v1 - m*s1;

	         return m*S + b;
	      }

	    }

	    return 0;
	  }

	  function getHueRange (colorInput) {

	    if (typeof parseInt(colorInput) === 'number') {

	      var number = parseInt(colorInput);

	      if (number < 360 && number > 0) {
	        return [number, number];
	      }

	    }

	    if (typeof colorInput === 'string') {

	      if (colorDictionary[colorInput]) {
	        var color = colorDictionary[colorInput];
	        if (color.hueRange) {return color.hueRange;}
	      }
	    }

	    return [0,360];

	  }

	  function getSaturationRange (hue) {
	    return getColorInfo(hue).saturationRange;
	  }

	  function getColorInfo (hue) {

	    // Maps red colors to make picking hue easier
	    if (hue >= 334 && hue <= 360) {
	      hue-= 360;
	    }

	    for (var colorName in colorDictionary) {
	       var color = colorDictionary[colorName];
	       if (color.hueRange &&
	           hue >= color.hueRange[0] &&
	           hue <= color.hueRange[1]) {
	          return colorDictionary[colorName];
	       }
	    } return 'Color not found';
	  }

	  function randomWithin (range) {
	    if (seed === null) {
	      return Math.floor(range[0] + Math.random()*(range[1] + 1 - range[0]));
	    } else {
	      //Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
	      var max = range[1] || 1;
	      var min = range[0] || 0;
	      seed = (seed * 9301 + 49297) % 233280;
	      var rnd = seed / 233280.0;
	      return Math.floor(min + rnd * (max - min));
	    }
	  }

	  function HSVtoHex (hsv){

	    var rgb = HSVtoRGB(hsv);

	    function componentToHex(c) {
	        var hex = c.toString(16);
	        return hex.length == 1 ? '0' + hex : hex;
	    }

	    var hex = '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);

	    return hex;

	  }

	  function defineColor (name, hueRange, lowerBounds) {

	    var sMin = lowerBounds[0][0],
	        sMax = lowerBounds[lowerBounds.length - 1][0],

	        bMin = lowerBounds[lowerBounds.length - 1][1],
	        bMax = lowerBounds[0][1];

	    colorDictionary[name] = {
	      hueRange: hueRange,
	      lowerBounds: lowerBounds,
	      saturationRange: [sMin, sMax],
	      brightnessRange: [bMin, bMax]
	    };

	  }

	  function loadColorBounds () {

	    defineColor(
	      'monochrome',
	      null,
	      [[0,0],[100,0]]
	    );

	    defineColor(
	      'red',
	      [-26,18],
	      [[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]
	    );

	    defineColor(
	      'orange',
	      [19,46],
	      [[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]
	    );

	    defineColor(
	      'yellow',
	      [47,62],
	      [[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]
	    );

	    defineColor(
	      'green',
	      [63,178],
	      [[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]
	    );

	    defineColor(
	      'blue',
	      [179, 257],
	      [[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]
	    );

	    defineColor(
	      'purple',
	      [258, 282],
	      [[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]
	    );

	    defineColor(
	      'pink',
	      [283, 334],
	      [[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]
	    );

	  }

	  function HSVtoRGB (hsv) {

	    // this doesn't work for the values of 0 and 360
	    // here's the hacky fix
	    var h = hsv[0];
	    if (h === 0) {h = 1;}
	    if (h === 360) {h = 359;}

	    // Rebase the h,s,v values
	    h = h/360;
	    var s = hsv[1]/100,
	        v = hsv[2]/100;

	    var h_i = Math.floor(h*6),
	      f = h * 6 - h_i,
	      p = v * (1 - s),
	      q = v * (1 - f*s),
	      t = v * (1 - (1 - f)*s),
	      r = 256,
	      g = 256,
	      b = 256;

	    switch(h_i) {
	      case 0: r = v; g = t; b = p;  break;
	      case 1: r = q; g = v; b = p;  break;
	      case 2: r = p; g = v; b = t;  break;
	      case 3: r = p; g = q; b = v;  break;
	      case 4: r = t; g = p; b = v;  break;
	      case 5: r = v; g = p; b = q;  break;
	    }

	    var result = [Math.floor(r*255), Math.floor(g*255), Math.floor(b*255)];
	    return result;
	  }

	  function HSVtoHSL (hsv) {
	    var h = hsv[0],
	      s = hsv[1]/100,
	      v = hsv[2]/100,
	      k = (2-s)*v;

	    return [
	      h,
	      Math.round(s*v / (k<1 ? k : 2-k) * 10000) / 100,
	      k/2 * 100
	    ];
	  }

	  function stringToInteger (string) {
	    var total = 0
	    for (var i = 0; i !== string.length; i++) {
	      if (total >= Number.MAX_SAFE_INTEGER) break;
	      total += string.charCodeAt(i)
	    }
	    return total
	  }

	  return randomColor;
	}));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports


	// module
	exports.push([module.id, "canvas {\n    padding-left: 0;\n    padding-right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    display: block;\n    background: url(\"http://i.imgur.com/gDJx6ws.jpg\") no-repeat;\n    background-position: center;\n}\n", ""]);

	// exports


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);