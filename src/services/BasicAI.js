RNGAI = function (game) {
  this.game = game;
};
RNGAI.prototype.nextMove = function () {
  var move;
  do {
    move = Math.floor(Math.random() * 4);
  } while (!this.game.moveAvailable(move));
  return move;
};

PriorityAI = function (game) {
  this.game = game;
};
PriorityAI.prototype.nextMove = function () {
  var priority = [0, 3, 1, 2];
  var move;
  for (var i = 0; i < priority.length; i++) {
    move = priority[i];
    if (this.game.moveAvailable(move)) {
      return move;
    }
  }
  return 0;
};

AlgorithmAI = function (game) {
  this.game = game;
};
AlgorithmAI.prototype.prevMove = -1;
AlgorithmAI.prototype.nextMove = function () {
  var move = 0;
  if (move == this.prevMove) move = 3;

  if (!this.game.moveAvailable(move)) {
    var priority = [0, 3, 1, 2];
    for (var i = 0; i < priority.length; i++) {
      move = priority[i];
      if (this.game.moveAvailable(move)) break;
    }
  }
  this.prevMove = move;
  return move;
};
