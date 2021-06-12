const { BowlingGame } = require("./BowlingGame");

describe("BowlingGame", () => {
  it("should return 300 for an all strike game", () => {
    const game = new BowlingGame("x x x x x x x x x x x x");

    const score = game.getScore();

    expect(score).toBe(300);
  });

  it("should also add the score of the bonus ball", () => {
    const score = new BowlingGame("x 35 9/ -7 -/ x 12 51 - 4/ x").getScore();

    expect(score).toBe(105);
  });
});
