'use strict';

var Logger = require('./logger.js');

var Path = function(gridArray, options) {
  this.logger = new Logger(options.debug);
  this.Z = 0;
  this.block = {
    HORIZONTAL: 1,
    VERTICAL: 2,
    DOWN_LEFT: 3,
    DOWN_RIGHT: 4,
    UP_LEFT: 5,
    UP_RIGHT: 6
  };

  this.currentX = options.start.x;
  this.currentY = options.start.y;
  this.endX = options.end.x;
  this.endY = options.end.y;
  this.comingFrom = options.comingFrom;
  this.setComingFrom(this.comingFrom);
  this.map = gridArray;
  this.GRID_WIDTH = this.map.length - 1;
  this.GRID_HEIGHT = this.map[0].length - 1;
};

Path.prototype.isConnected = function() {
  this.logger.print("X: " + this.currentX + ", Y: " + this.currentY + ", value: " + this.currentValue());
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
};

Path.prototype.moveToNextPosition = function() {
  if (this.blockType().horizontal) {
    if (this.comingFrom.left) {
      this.logger.print('coming from left, and moving right...');
      return this.moveRight();
    } else {
      this.logger.print('coming from right, and moving left...');
      return this.moveLeft();
    }
  }
  else if (this.blockType().vertical) {
    if (this.comingFrom.down) {
      this.logger.print('coming from down, and moving up...');
      return this.moveUp();
    } else {
      this.logger.print('coming from up, and moving down...');
      return this.moveDown();
    }
  }
  else if (this.blockType().downToLeft) {
    if (this.comingFrom.down) {
      this.logger.print('coming from down, and moving left...');
      return this.moveLeft();
    } else {
      this.logger.print('coming from left, and moving down...');
      return this.moveDown();
    }
  }
  else if (this.blockType().downToRight) {
    if (this.comingFrom.down) {
      this.logger.print('coming from down, and moving right...');
      return this.moveRight();
    } else {
      this.logger.print('coming from right, and moving down...');
      return this.moveDown();
    }
  }
  else if (this.blockType().upToLeft) {
    if (this.comingFrom.up) {
      this.logger.print('coming from up, and moving left...');
      return this.moveLeft();
    } else {
      this.logger.print('coming from left, and moving up...');
      return this.moveUp();
    }
  }
  else if (this.blockType().upToRight) {
    if (this.comingFrom.up) {
      this.logger.print('coming from up, and moving right...');
      return this.moveRight();
    } else {
      this.logger.print('coming from right, and moving up...');
      return this.moveUp();
    }
  }
  this.logger.print('cant move to any position');
  return false;
};

Path.prototype.setComingFrom = function(direction) {
  this.comingFrom = {
    left: direction === 'left',
    right: direction === 'right',
    up: direction === 'up',
    down: direction === 'down'
  };
};

Path.prototype.leftBlock = function() {
  return {
    validConnection: [
      this.block.HORIZONTAL,
      this.block.DOWN_RIGHT,
      this.block.UP_RIGHT
    ].indexOf(this.leftValue()) > -1
  };
};

Path.prototype.rightBlock = function() {
  return {
    validConnection: [
      this.block.HORIZONTAL,
      this.block.DOWN_LEFT,
      this.block.UP_LEFT
    ].indexOf(this.rightValue()) > -1
  };
};

Path.prototype.upBlock = function() {
  return {
    validConnection: [
      this.block.VERTICAL,
      this.block.DOWN_LEFT,
      this.block.DOWN_RIGHT
    ].indexOf(this.upValue()) > -1
  };
};

Path.prototype.downBlock = function() {
  return {
    validConnection: [
      this.block.VERTICAL,
      this.block.UP_LEFT,
      this.block.UP_RIGHT
    ].indexOf(this.downValue()) > -1
  };
};

Path.prototype.moveLeft = function() {
  if (this.currentX === 0) {
    return false;
  }

  if (!this.leftBlock().validConnection) {
    this.logger.print("can't move left, invalid connection");
    return false;
  }

  this.currentX -= 1;
  this.setComingFrom('right');
  return true;
};

Path.prototype.moveRight = function() {
  if (this.currentX === this.GRID_WIDTH) {
    this.logger.print("can't move right, reached grid max width");
    return false;
  }

  if (!this.rightBlock().validConnection) {
    this.logger.print("can't move right, invalid connection");
    return false;
  }

  this.currentX += 1;
  this.setComingFrom('left');
  return true;
};

Path.prototype.moveUp = function() {
  if (this.currentY === 0) {
    return false;
  }

  if (!this.upBlock().validConnection) {
    this.logger.print("can't move up, invalid connection");
    return false;
  }

  this.currentY -= 1;
  this.setComingFrom('down');
  return true;
};

Path.prototype.moveDown = function() {
  if (this.currentY === this.GRID_HEIGHT) {
    return false;
  }

  if (!this.downBlock().validConnection) {
    this.logger.print("can't move down, invalid connection");
    return false;
  }

  this.currentY += 1;
  this.setComingFrom('up');
  return true;
};

Path.prototype.currentValue = function() {
  return this.map[this.currentX][this.currentY][this.Z];
};

Path.prototype.leftValue = function() {
  return this.map[this.currentX - 1][this.currentY][this.Z];
};

Path.prototype.rightValue = function() {
  return this.map[this.currentX + 1][this.currentY][this.Z];
};

Path.prototype.upValue = function() {
  return this.map[this.currentX][this.currentY - 1][this.Z];
};

Path.prototype.downValue = function() {
  return this.map[this.currentX][this.currentY + 1][this.Z];
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

module.exports = Path;
