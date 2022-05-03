GoalType = { UNDEFINED: -1, BUILD: 0, SHIFT: 1, MOVE: 2 };

Goal = function () {};
Goal.prototype = {
  type: GoalType.UNDEFINED,
};

SmartAI = function (game) {
  this.game = game;
};

SmartAI.prototype.nextMove = function () {
  var originalQuality = this.gridQuality(this.game.grid);
  var results = this.planAhead(this.game.grid, 3, originalQuality);
  var bestResult = this.chooseBestMove(results, originalQuality);

  return bestResult.direction;
};

SmartAI.prototype.planAhead = function (grid, numMoves, originalQuality) {
  var results = new Array(4);

  for (var d = 0; d < 4; d++) {
    var testGrid = grid.clone();
    var testGame = new GameController(testGrid);
    var moved = testGame.moveTiles(d);
    if (!moved) {
      results[d] = null;
      continue;
    }
    var result = {
      quality: -1,
      probability: 1,
      qualityLoss: 0,
      direction: d,
    };
    var availableCells = testGrid.availableCells();
    for (var i = 0; i < availableCells.length; i++) {
      var hasAdjacentTile = false;
      for (var d2 = 0; d2 < 4; d2++) {
        var vector = testGame.getVector(d2);
        var adjCell = {
          x: availableCells[i].x + vector.x,
          y: availableCells[i].y + vector.y,
        };
        if (testGrid.cellContent(adjCell)) {
          hasAdjacentTile = true;
          break;
        }
      }
      if (!hasAdjacentTile) continue;

      var testGrid2 = testGrid.clone();
      var testGame2 = new GameController(testGrid2);
      testGame2.addTile(new Tile(availableCells[i], 2));
      var tileResult;
      if (numMoves > 1) {
        var subResults = this.planAhead(
          testGrid2,
          numMoves - 1,
          originalQuality
        );
        tileResult = this.chooseBestMove(subResults, originalQuality);
      } else {
        var tileQuality = this.gridQuality(testGrid2);
        tileResult = {
          quality: tileQuality,
          probability: 1,
          qualityLoss: Math.max(originalQuality - tileQuality, 0),
        };
      }
      if (result.quality == -1 || tileResult.quality < result.quality) {
        result.quality = tileResult.quality;
        result.probability = tileResult.probability / availableCells.length;
      } else if (tileResult.quality == result.quality) {
        result.probability += tileResult.probability / availableCells.length;
      }
      result.qualityLoss += tileResult.qualityLoss / availableCells.length;
    }
    results[d] = result;
  }
  return results;
};

SmartAI.prototype.chooseBestMove = function (results, originalQuality) {
  var bestResult;
  for (i = 0; i < results.length; i++) {
    if (results[i] == null) continue;
    if (
      !bestResult ||
      results[i].qualityLoss < bestResult.qualityLoss ||
      (results[i].qualityLoss == bestResult.qualityLoss &&
        results[i].quality > bestResult.quality) ||
      (results[i].qualityLoss == bestResult.qualityLoss &&
        results[i].quality == bestResult.quality &&
        results[i].probability < bestResult.probability)
    ) {
      bestResult = results[i];
    }
  }
  if (!bestResult) {
    bestResult = {
      quality: -1,
      probability: 1,
      qualityLoss: originalQuality,
      direction: 0,
    };
  }
  return bestResult;
};

SmartAI.prototype.gridQuality = function (grid) {
  var monoScore = 0;
  var traversals = this.game.buildTraversals({ x: -1, y: 0 });
  var prevValue = -1;
  var incScore = 0,
    decScore = 0;

  var scoreCell = function (cell) {
    var tile = grid.cellContent(cell);
    var tileValue = tile ? tile.value : 0;
    incScore += tileValue;
    if (tileValue <= prevValue || prevValue == -1) {
      decScore += tileValue;
      if (tileValue < prevValue) {
        incScore -= prevValue;
      }
    }
    prevValue = tileValue;
  };

  traversals.x.forEach(function (x) {
    prevValue = -1;
    incScore = 0;
    decScore = 0;
    traversals.y.forEach(function (y) {
      scoreCell({ x: x, y: y });
    });
    monoScore += Math.max(incScore, decScore);
  });
  traversals.y.forEach(function (y) {
    prevValue = -1;
    incScore = 0;
    decScore = 0;
    traversals.x.forEach(function (x) {
      scoreCell({ x: x, y: y });
    });
    monoScore += Math.max(incScore, decScore);
  });

  var availableCells = grid.availableCells();
  var emptyCellWeight = 8;
  var emptyScore = availableCells.length * emptyCellWeight;

  var score = monoScore + emptyScore;
  return score;
};
