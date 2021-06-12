const { createBalls } = require("./createBalls");

const parsedFrames = ["x", "-", "13", "44", "x", "1/", "-/", "x", "1-", "x"];

const parsedBonusBalls = ["-", "2"];

const scores = [10, 0, 0, 1, 3, 4, 4, 10, 1, 9, 0, 10, 10, 1, 0, 10, 0, 2];

describe("createBalls", () => {
  describe("should create the correct number of balls", () => {
    test("with no bonus balls", () => {
      expect(createBalls(parsedFrames, [])).toHaveLength(16);
    });

    test("with one bonus ball", () => {
      expect(createBalls(parsedFrames, ["x"])).toHaveLength(17);
    });

    test("with two bonus balls", () => {
      expect(createBalls(parsedFrames, parsedBonusBalls)).toHaveLength(18);
    });
  });

  it("Creates balls with correct scores", () => {
    const balls = createBalls(parsedFrames, parsedBonusBalls);
    balls.forEach((ball) => {
      expect(ball.score).toBe(scores[ball.index]);
    });
  });
});
