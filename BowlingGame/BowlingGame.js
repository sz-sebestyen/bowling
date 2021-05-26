const { parseFrames } = require("./parseFrames");
const { parseBonusBalls } = require("./parseBonusBalls");
const { createFrames } = require("./createFrames");
const { createBalls } = require("./createBalls");
const { scoreGame } = require("./scoreGame");

exports.BowlingGame = class {
  constructor(gameString) {
    this.gameString = gameString;

    const parsedFrames = parseFrames(gameString);

    this.balls = createBalls(parsedFrames, parseBonusBalls(gameString));
    this.frames = createFrames(parsedFrames);

    this.score = scoreGame(this.frames, this.balls);
  }

  getScore() {
    return this.score;
  }
};
