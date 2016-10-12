function Net(context) {
  this.x = 545;
  this.y = 600;
  this.width = 10;
  this.height = -80;
  this.context = context;
  this.color = 'white';
}

Net.prototype.render = function() {
  this.context.fillRect(this.x, this.y, this.width, this.height);
  this.context.fillStyle = this.color;
  this.context.fill();
}

module.exports = Net;
