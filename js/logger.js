'use strict';

var Logger = function(debug) {
  this.debug = debug || false;
};

Logger.prototype.print = function(message) {
  if (this.debug) {
    console.log(message);
  };
};

module.exports = Logger;
