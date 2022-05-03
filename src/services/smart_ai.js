GoalType = { UNDEFINED: -1, BUILD: 0, SHIFT: 1, MOVE: 2 };

Goal = function () {};
Goal.prototype = {
  type: GoalType.UNDEFINED,
};

SmartAI = function (game) {
  this.game = game;
};

SmartAI.prototype.nextMove = function () {
  var goal = this.determineGoal(this.game.grid);
  while (goal.type != GoalType.MOVE) {
    goal = this.determineSubGoal(this.game.grid, goal);
  }

  if (goal.directions) {
    for (var i = 0; i < goal.directions.length; i++) {
      if (this.game.moveAvailable(goal.directions[i])) {
        return goal.directions[i];
      }
    }
  }
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
SmartAI.prototype.determineGoal = function (grid) {
  var goal = new Goal();
  var maxValue = 0;
  var maxCells = [];
  grid.eachCell(function (x, y, tile) {
    if (tile && tile.value >= maxValue) {
      if (tile.value > maxValue) {
        maxCells = [];
        maxValue = tile.value;
      }
      maxCells.push({ x: x, y: y });
    }
  });
  var maxCell;
  if (maxCells.length == 1) {
    maxCell = maxCells[0];
  } else {
    var minDist = grid.size;
    for (var i = 0; i < maxCells.length; i++) {
      dist =
        Math.min(maxCells[i].x, grid.size - maxCells[i].x - 1) +
        Math.min(maxCells[i].y, grid.size - maxCells[i].y - 1);
      if (dist < minDist) {
        minDist = dist;
        maxCell = maxCells[i];
      }
    }
  }
  dist =
    Math.min(maxCell.x, grid.size - maxCell.x - 1) +
    Math.min(maxCell.y, grid.size - maxCell.y - 1);
  if (dist == 0) {
    goal.type = GoalType.BUILD;
    goal.cell = maxCell;
    goal.value = maxValue * 2;
    return goal;
  }
  if (dist == 1) {
    if (maxValue <= 512) {
      goal.type = GoalType.BUILD;
      goal.cell = {
        x: maxCell.x < grid.size / 2 ? 0 : grid.size - 1,
        y: maxCell.y < grid.size / 2 ? 0 : grid.size - 1,
      };
      goal.value = maxValue;
      return goal;
    }
    var availableCells = game.grid.availableCells();
    if (availableCells.length > 4) {
      goal.type = GoalType.SHIFT;
      goal.fromCell = maxCell;
      if (maxCell.x == 0 || maxCell.x == game.size - 1) {
        goal.cell = {
          x: maxCell.x,
          y: maxCell.y < grid.size / 2 ? grid.size - 1 : 0,
        };
      } else {
        goal.cell = {
          x: maxCell.x < grid.size / 2 ? grid.size - 1 : 0,
          y: maxCell.y,
        };
      }
      return goal;
    }
    goal.type = GoalType.BUILD;
    goal.cell = maxCell;
    goal.value = maxValue * 2;
    return goal;
  }
  var availableCells = game.grid.availableCells();
  goal.type = GoalType.SHIFT;
  goal.fromCell = maxCell;
  goal.cell = {
    x: maxCell.x,
    y: maxCell.y < grid.size / 2 ? grid.size - 1 : 0,
  };
  return goal;
};

SmartAI.prototype.determineSubGoal = function (grid, goal) {
  var subgoal = new Goal();
  if (goal.type == GoalType.BUILD) {
    var tile = grid.cellContent(goal.cell);

    if (!tile) {
      goal.type = GoalType.MOVE;
      vector = {
        x: goal.cell.x - grid.size / 2,
        y: goal.cell.y - grid.size / 2,
      };
      goal.directions = this.getDirections(vector);
      return goal;
    }

    for (i = 0; i < 4; i++) {
      var vector = this.game.getVector(i);
      var adjCell = { x: goal.cell.x + vector.x, y: goal.cell.y + vector.y };
      var adjTile = grid.cellContent(adjCell);
      if (adjTile && adjTile.value == tile.value) {
        vector.x = -vector.x;
        vector.y = -vector.y;
        goal.type = GoalType.MOVE;
        goal.directions = this.getDirections(vector);
        return goal;
      }
    }
  } else if (goal.type == GoalType.MOVE) {
  }
  return subgoal;
};

SmartAI.prototype.getDirections = function (vector) {
  directions = [0, 3, -1, -1];
  if (vector.x > 0) {
    directions[0] = 2;
  }
  if (vector.y > 0) {
    directions[1] = 1;
  }
  if (Math.abs(vector.x) > Math.abs(vector.y)) {
    var temp = directions[0];
    directions[0] = directions[1];
    directions[1] = temp;
  }
  directions[2] = (directions[1] + 2) % 4;
  directions[3] = (directions[0] + 2) % 4;
};
