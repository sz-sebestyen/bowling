const BowlingGame = require("./BowlingGame/BowlingGame");

module.exports = function calculateScore(gameString) {
  return new BowlingGame(gameString).getScore();
};
