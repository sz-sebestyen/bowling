const BowlingGame = require("./BowlingGame");

module.exports = function calculateScore(gameString) {
  return new BowlingGame(gameString).getScore();
};
