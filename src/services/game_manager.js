function GameController(grid) {
  if (grid) {
    this.size = grid.size;
    this.grid = grid;
  }
}

GameController.prototype.isGameTerminated = function () {
  if (this.over) {
    return true;
  } else {
    return false;
  }
};

GameController.prototype.prepareTiles = function () {
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

GameController.prototype.moveTile = function (tile, cell) {
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);
};

GameController.prototype.moveTiles = function (direction) {
  var self = this;

  if (this.isGameTerminated()) return;

  var cell, tile;

  var vector = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved = false;

  this.prepareTiles();

  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next = self.grid.cellContent(positions.next);

        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value * 2);
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          tile.updatePosition(positions.next);

          self.score += merged.value;
        } else {
          self.moveTile(tile, positions.farthest);
        }

        if (!self.positionsEqual(cell, tile)) {
          moved = true;
        }
      }
    });
  });
  return moved;
};

GameController.prototype.moveAvailable = function (direction) {
  var tile;
  var vector = this.getVector(direction);
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        var cell = { x: x + vector.x, y: y + vector.y };
        if (!this.grid.withinBounds(cell)) continue;

        var otherTile = this.grid.cellContent(cell);

        if (!otherTile || otherTile.value === tile.value) {
          return true;
        }
      }
    }
  }
  return false;
};

GameController.prototype.addTile = function (tile) {
  this.grid.insertTile(tile);
  if (!this.movesAvailable()) {
    this.over = true;
  }
};

GameController.prototype.getVector = function (direction) {
  var map = {
    0: { x: 0, y: -1 },
    1: { x: 1, y: 0 },
    2: { x: 0, y: 1 },
    3: { x: -1, y: 0 },
  };

  return map[direction];
};

GameController.prototype.buildTraversals = function (vector) {
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) {
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();

  return traversals;
};

GameController.prototype.findFarthestPosition = function (cell, vector) {
  var previous;

  do {
    previous = cell;
    cell = { x: previous.x + vector.x, y: previous.y + vector.y };
  } while (this.grid.withinBounds(cell) && this.grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell,
  };
};

GameController.prototype.movesAvailable = function () {
  return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

GameController.prototype.tileMatchesAvailable = function () {
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell = { x: x + vector.x, y: y + vector.y };

          var other = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

GameController.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};

function GameManager(size, InputManager, Actuator, StorageManager) {
  this.size = size;
  this.inputManager = new InputManager();
  this.storageManager = new StorageManager();
  this.actuator = new Actuator();

  this.startTiles = 2;
  this.lastDirection = 0;

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.game = this;

  this.setup();
}

GameManager.prototype = new GameController();

GameManager.prototype.restart = function () {
  this.storageManager.clearGameState();
  this.actuator.continueGame();
  this.setup();
};

GameManager.prototype.setup = function () {
  var previousState = this.storageManager.getGameState();
  if (previousState) {
    this.grid = new Grid(previousState.grid.size, previousState.grid.cells);
    this.score = previousState.score;
    this.over = previousState.over;
  } else {
    this.grid = new Grid(this.size);
    this.score = 0;
    this.over = false;

    this.addStartTiles();
  }

  this.actuate();
};

GameManager.prototype.addStartTiles = function () {
  for (var i = 0; i < this.startTiles; i++) {
    this.generateTile();
  }
};

GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
    var value = Math.random() < 0.9 ? 2 : 4;
    var tile = new Tile(this.grid.randomAvailableCell(), value);

    this.addTile(tile);
  }
};

GameManager.prototype.addEvilTile = function () {
  var self = this;
  if (this.grid.cellsAvailable()) {
    var vector = this.getVector(this.lastDirection);
    vector.x *= -1;
    vector.y *= -1;

    var cellOptions = [];
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        var cell = { x: 0, y: 0 };
        if (vector.x == 1) cell.x = j;
        else if (vector.x == -1) cell.x = this.size - j - 1;
        else cell.x = i;
        if (vector.y == 1) cell.y = j;
        else if (vector.y == -1) cell.y = this.size - j - 1;
        else cell.y = i;
        if (this.grid.cellAvailable(cell)) {
          cellOptions.push(cell);
          break;
        }
      }
    }
    var bestScore = 0;
    var winners = [];
    var maxTileValue = Math.pow(2, this.size * this.size);
    for (i = 0; i < cellOptions.length; i++) {
      var minValue = maxTileValue;
      for (var direction = 0; direction < 4; direction++) {
        var adjVector = this.getVector(direction);
        var adjCell = {
          x: cellOptions[i].x + adjVector.x,
          y: cellOptions[i].y + adjVector.y,
        };
        var adjTile = this.grid.cellContent(adjCell);
        if (adjTile) {
          minValue = Math.min(minValue, adjTile.value);
        }
      }
      if (minValue > bestScore) {
        winners = [];
        bestScore = minValue;
      }
      if (minValue >= bestScore) {
        winners.push(cellOptions[i]);
      }
    }
    if (winners.length) {
      var winnerIndex = Math.floor(Math.random() * winners.length);
      var value = bestScore != 2 ? 2 : 4;
      var tile = new Tile(winners[winnerIndex], value);
      this.addTile(tile);
    }
  }
};

GameManager.prototype.generateTile = GameManager.prototype.addRandomTile;

GameManager.prototype.actuate = function () {
  if (this.storageManager.getBestScore() < this.score) {
    this.storageManager.setBestScore(this.score);
  }

  if (this.over) {
    this.storageManager.clearGameState();
  } else {
    this.storageManager.setGameState(this.serialize());
  }

  this.actuator.actuate(this.grid, {
    score: this.score,
    over: this.over,
    bestScore: this.storageManager.getBestScore(),
    terminated: this.isGameTerminated(),
  });
};

GameManager.prototype.serialize = function () {
  return {
    grid: this.grid.serialize(),
    score: this.score,
    over: this.over,
  };
};

GameManager.prototype.move = function (direction) {
  var moved = this.moveTiles(direction);

  if (moved) {
    this.lastDirection = direction;
    this.generateTile();
    this.actuate();
  }
};
