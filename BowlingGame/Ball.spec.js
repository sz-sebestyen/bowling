const Ball = require("./Ball");

describe("Ball", () => {
  it("has the index property", () => {
    const ball = new Ball(10, 0);
    expect(ball.index).toBe(0);
  });

  it("has the score property", () => {
    const ball = new Ball(10, 0);
    expect(ball.score).toBe(10);
  });
});
