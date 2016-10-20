var Game = require('./game');

Game.prototype.gameOverMenu = function(keysDown) {
  for (var key in keysDown) {
    var value = Number(key);
    if (value === 13) { this.startNewMatch(); }
    if (value === 77) { this.scoreboard.resetMatchScore(); }
    if (value === 27) { this.returnToMainMenu(); }
  }
};

Game.prototype.renderBackground = function(keysDown) {
  if(this.difficulty === "normal"){
    var background = {beach: "http://i.imgur.com/gDJx6ws.jpg", mars: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/PIA17944-MarsCuriosityRover-AfterCrossingDingoGapSanddune-20140209.jpg/1280px-PIA17944-MarsCuriosityRover-AfterCrossingDingoGapSanddune-20140209.jpg", underWater: "http://www.publicdomainpictures.net/pictures/140000/velka/seabed-underwater-1443611137nes.jpg", minions: "https://s-media-cache-ak0.pinimg.com/originals/59/45/06/594506d41c836f70139b90a0f67e1563.gif", lotr: "https://media.giphy.com/media/c5iRPkrIqDHQk/giphy.gif", unicorn: "http://f.owledge.de/mlp/PFUDOR_dancing_fullres.gif", mountains: "https://lonelyplanetimages.imgix.net/a/g/hi/t/12dec8938220093eb7f1fdb8a9ce40b8-the-rocky-mountains.jpg?sharp=10&vib=20&w=1200", technicolor: "http://i.imgur.com/CcKD4Jd.gif", matrix: "https://reneweddesign.files.wordpress.com/2015/07/matrix-2.gif?w=1280&h=1024&crop=1"};
    for (var key in keysDown) {
      var value = Number(key);
      if (value === 49) { this.changeBackgroundImage(background.beach); }
      if (value === 50) { this.changeBackgroundImage(background.mars); }
      if (value === 51) { this.changeBackgroundImage(background.underWater); }
      if (value === 52) { this.changeBackgroundImage(background.minions); }
      if (value === 53) { this.changeBackgroundImage(background.lotr); }
      if (value === 54) { this.changeBackgroundImage(background.unicorn); }
      if (value === 55) { this.changeBackgroundImage(background.mountains); }
      if (value === 56) { this.changeBackgroundImage(background.technicolor); }
      if (value === 57) { this.changeBackgroundImage(background.matrix); }
    }
  }
};

Game.prototype.mainMenu = function(keysDown) {
  for (var key in keysDown) {
    var value = Number(key);
    if (value === 78) { this.startNormalMode(); }
    if (value === 73) { this.startInsaneMode(); }
    if (value === 81) { this.showInstructions = true; }
  }
};

Game.prototype.displayInstructions = function(keysDown) {
  for (var key in keysDown) {
    var value = Number(key);
    if (value === 13) { this.showInstructions = false; }
  }
};

module.exports = Game;
