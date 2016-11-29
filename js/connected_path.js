/*
*
* 0 = empty square
* 1 = horizontal line
* 2 = vertical line
* 3 = bend down to left
* 4 = bend down to right
* 5 = bend up to left
* 6 = bend up to right
*
*/
var Path = function(options) {
  this.Z = 0;
  this.currentX = options.start.x;
  this.currentY = options.start.y;
  this.endX = options.end.x;
  this.endY = options.end.y;
  this.comingFrom = options.comingFrom;
  this.gridWidth = options.gridWidth - 1;
  this.gridHeight = options.gridHeight - 1;
  this.setComingFrom(options.comingFrom);
  this.initializeMap();
};

Path.prototype.setComingFrom = function(direction) {
  this.comingFrom = {
    left: direction === 'left',
    right: direction === 'right',
    up: direction === 'up',
    down: direction === 'down'
  };
};

Path.prototype.initializeMap = function() {
  this.map = [
    [[0], [0], [0], [0], [0], [1], [0]],
    [[0], [0], [0], [0], [0], [1], [0]],
    [[0], [0], [0], [0], [0], [2], [0]],
    [[0], [0], [0], [0], [0], [1], [0]],
    [[0], [0], [0], [0], [0], [0], [0]]
  ];
};

Path.prototype.isConnected = function() {
  console.log("X: " + this.currentX + ", Y: " + this.currentY + ", value: " + this.currentValue());
  if (this.arrivedAtEndPoint()) {
    return true;
  } else {
    if (this.moveToNextPosition()) {
      return this.isConnected();
    } else {
      return false;
    }
  }
};

Path.prototype.arrivedAtEndPoint = function() {
  return (this.currentX === this.endX && this.currentY === this.endY);
}

Path.prototype.moveToNextPosition = function() {
  if (this.blockType().horizontal) {
    if (this.comingFrom.left) {
      return this.moveRight();
    } else {
      return this.moveLeft();
    }
  }
  else if (this.blockType().vertical) {
    if (this.comingFrom.down) {
      return this.moveUp();
    } else {
      return this.moveDown();
    }
  }
  console.log('cant move to any position');
  return false;
};

// TODO: right, up, down blocks
Path.prototype.leftBlock = function() {
  return {
    value: this.currentX - 1,
    validConnection: [1, 4, 6].indexOf() > -1
  };
};

Path.prototype.moveLeft = function() {
  // ensure the next block is a valid connection from this one
  if (!this.leftBlock().validConnection) {
    return false;
  }

  if (this.currentX <= 0) {
    return false;
  }

  this.currentX -= 1;
  this.setComingFrom('right');
  return true;
};

// TODO: validConnection for right, up, down
Path.prototype.moveRight = function() {
  if (this.currentX < this.gridWidth) {
    this.currentX += 1;
    this.setComingFrom('left');
    return true;
  } else {
    return false;
  }
};

Path.prototype.moveUp = function() {
  if (this.currentY > 0) {
    this.currentY -= 1;
    this.setComingFrom('down');
    return true;
  } else {
    return false;
  }
};

Path.prototype.moveDown = function() {
  if (this.currentY < this.gridHeight) {
    this.currentY += 1;
    this.setComingFrom('up');
    return true;
  } else {
    return false;
  }
};

Path.prototype.currentValue = function() {
  return this.map[this.currentX][this.currentY][this.Z];
};

Path.prototype.blockType = function() {
  return {
    horizontal: this.currentValue() === 1,
    vertical: this.currentValue() === 2,
    downToLeft: this.currentValue() === 3,
    downToRight: this.currentValue() === 4,
    upToLeft: this.currentValue() === 5,
    upToRight: this.currentValue() === 6,
  };
};

var options = {
  start: {
    x: 0,
    y: 5
  },
  end: {
    x: 3,
    y: 2
  },
  comingFrom: 'left',
  gridWidth: 5,
  gridHeight: 7,
};
var path = new Path(options);
console.log(path.isConnected());
