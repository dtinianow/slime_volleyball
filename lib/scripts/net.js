function Net(context) {
  this.x = 545;
  this.y = 600;
  this.width = 10;
  this.height = -80;
  this.context = context;
  this.color = '#33334d';
}

Net.prototype.render = function() {
  this.context.fillStyle = this.color;
  this.context.fillRect(this.x, this.y, this.width, this.height);
}

module.exports = Net;
