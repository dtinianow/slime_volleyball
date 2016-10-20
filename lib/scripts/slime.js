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

Slime.prototype.render = function() {
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

Slime.prototype.drawEyes = function() {
  this.context.beginPath();
  this.shouldDrawPlayer1Eye();
  this.shouldDrawPlayer2Eye();
  this.fillEyes();
};

Slime.prototype.shouldDrawPlayer1Eye = function() {
  if (this.player === "player 1") {
    this.drawPlayer1Eye();
  }
};

Slime.prototype.shouldDrawPlayer2Eye = function() {
  if (this.player === "player 2") {
    this.drawPlayer2Eye();
  }
};

Slime.prototype.drawPlayer1Eye = function() {
  this.context.arc(this.x + 43, this.y -54, 10, Math.PI * 2, false);
};

Slime.prototype.drawPlayer2Eye = function() {
  this.context.arc(this.x - 43, this.y -54, 10, Math.PI * 2, false);
};

Slime.prototype.fillEyes = function() {
  this.context.fillStyle = "white";
  this.context.fill();
  this.context.closePath();
};

Slime.prototype.drawPupils = function() {
  this.context.beginPath();
  this.shouldDrawPlayer1Pupil();
  this.shouldDrawPlayer2Pupil();
  this.fillPupils();
};

Slime.prototype.shouldDrawPlayer1Pupil = function() {
  if (this.player === "player 1") {
    this.drawPlayer1Pupil();
  }
};

Slime.prototype.shouldDrawPlayer2Pupil = function() {
  if (this.player === "player 2") {
    this.drawPlayer2Pupil();
  }
};

Slime.prototype.drawPlayer1Pupil = function() {
  this.context.arc((this.x + 40 + (this.ball.x/120)), this.y - 53.5 - (this.ball.y / 175), 4, Math.PI * 2, false);
};

Slime.prototype.drawPlayer2Pupil = function() {
  this.context.arc((this.x - 47 + (this.ball.x/120)), this.y - 53.5 - (this.ball.y / 175), 4, Math.PI * 2, false);
};

Slime.prototype.fillPupils = function() {
  this.context.fillStyle = "black";
  this.context.fill();
  this.context.closePath();
};

Slime.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
};

Slime.prototype.gravity = function() {
  if (this.isJumping()) { this.y += 7.5; }
};

Slime.prototype.isJumping = function() {
  return (this.y < 600);
};

Slime.prototype.updatePosition = function(moveLeft, moveRight, jump) {
  for (var key in this.keysDown) {
    var value = Number(key);
    this.ifMoveRight(value, moveRight);
    this.ifMoveLeft(value, moveLeft);
    this.ifFinishJump(value, jump);
    this.ifJumping(value, jump);
    this.ifStayingStill();
  }
  this.ifAI(jump);
  return this;
};

Slime.prototype.ifAI = function(jump) {
  if (this.ai === true && this.ball.x > this.canvas.width/2){
    var x_difference = (this.x - this.ball.x);
    if (this.ball.x === 775){
      x_difference = 0.5;
    }else if (x_difference === 0){
      x_difference = 5;
    }else if (-80 > x_difference > 0.1){
      x_difference = 15;
    } else if (0.1 < x_difference < 80) {
      x_difference = -15;
    }
    this.move(x_difference, 0);
    var y_difference = ((this.y - this.radius - 60) < this.ball.y && x_difference < 80);
    if (y_difference === true){
    var value = jump;
      this.ifFinishJump(value, jump);
      this.ifJumping(value, jump);
    }
    if(this.x < (this.canvas.width / 2) + this.radius){
      this.x = (this.canvas.width / 2) + this.radius;
    }else if (this.x + this.radius > this.canvas.width) {
      this.x = this.canvas.width - this.radius;
    }
  }
};

Slime.prototype.ifMoveRight = function(value, moveRight) {
  if (value === moveRight && this.isNotTouchingRightWall() && this.isNotTouchingLeftSideOfNet()) {
    this.moveToRight();
  }
};

Slime.prototype.ifMoveLeft = function(value, moveLeft){
  if (value === moveLeft && this.isNotTouchingLeftWall() && this.isNotTouchingRightSideOfNet()) {
    this.moveToLeft();
  }
};

Slime.prototype.ifFinishJump = function(value, jump) {
  if (value === jump && this.isOnTheGround() && !this.jumping) {
    this.finishJump();
  }
};

Slime.prototype.ifJumping = function(value, jump) {
  if (value === jump && this.jumping) {
    this.jump();
  }
};

Slime.prototype.isNotTouchingRightWall = function() {
  return this.x < this.canvas.width - this.radius;
};

Slime.prototype.isNotTouchingLeftSideOfNet = function() {
  return this.x !== (this.canvas.width / 2 - this.radius - 5);
};

Slime.prototype.isNotTouchingLeftWall = function() {
  return this.x > (0 + this.radius);
};

Slime.prototype.isNotTouchingRightSideOfNet = function() {
  return this.x !== (this.canvas.width / 2 + this.radius + 5);
};

Slime.prototype.isOnTheGround = function() {
  return this.y === 600;
};

Slime.prototype.moveToRight = function() {
  return this.move(10, 0);
};

Slime.prototype.moveToLeft = function() {
  return this.move(-10, 0);
};

Slime.prototype.finishJump = function() {
  this.jump();
  this.jumping = true;
};

Slime.prototype.ifStayingStill = function() {
  this.move(0, 0);
};

Slime.prototype.jump = function() {
  if (this.y >= 520) { this.move(0, -15); }
  if (this.y <= 520) { this.jumping = false; }
};

Slime.prototype.resetPosition = function() {
  if (this.player === 'player 1') { this.x = 275; }
  if (this.player === 'player 2') { this.x = 775; }
  this.y = 600;
};

module.exports = Slime;
