'use strict';

var expect = require('chai').expect;
var Path = require('../connected_path.js');

describe('Path', function() {
  var gridArray, options;

  before(function() {
    options = {
      start: { x: 0, y: 5 },
      end: { x: 3, y: 2 },
      comingFrom: 'left',
      debug: false
    };
  });

  describe('#isConnected', function(){
    describe('when valid complete path', function() {
      it ('returns true', function() {
        gridArray = [
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [1], [4], [2], [5], [0]],
          [[0], [0], [3], [5], [0], [0], [0]]
        ];
        var path = new Path(gridArray, options);

        expect(path.isConnected()).to.eql(true);
      });

      it ('returns true (complex example)', function() {
        gridArray = [
         [[1], [0], [0], [0], [0], [0], [0]],
         [[1], [0], [0], [4], [2], [2], [6]],
         [[1], [4], [6], [1], [0], [0], [1]],
         [[3], [5], [1], [3], [6], [4], [5]],
         [[0], [0], [3], [2], [5], [3], [6]]
        ];
        var _options = {
          start: { x: 0, y: 0 },
          end: { x: 4, y: 6 },
          comingFrom: 'left',
          debug: false
        };

        var path = new Path(gridArray, _options);

        expect(path.isConnected()).to.eql(true);
      });
    });

    describe('incomplete path', function() {
      it ('returns false when incomplete path', function() {
        gridArray = [
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [1], [4], [2], [1], [0]],
          [[0], [0], [3], [5], [0], [0], [0]]
        ];
        var path = new Path(gridArray, options);

        expect(path.isConnected()).to.eql(false);
      });

      it ('returns false when incomplete path', function() {
        gridArray = [
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [4], [2], [5], [0]],
          [[0], [0], [3], [5], [0], [0], [0]]
        ];
        var path = new Path(gridArray, options);

        expect(path.isConnected()).to.eql(false);
      });

      it ('returns false when path leads off the grid', function() {
        gridArray = [
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]],
          [[0], [0], [0], [0], [0], [1], [0]]
        ];
        var path = new Path(gridArray, options);

        expect(path.isConnected()).to.eql(false);
      });
    });
  });
});
