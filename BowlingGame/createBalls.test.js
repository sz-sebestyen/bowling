const { createBalls } = require("./createBalls");

const parsedFrames = ["x", "-", "13", "44", "x", "1/", "-/", "x", "1-", "x"];

const parsedBonusBalls = ["-", "2"];

const scores = [10, 0, 0, 1, 3, 4, 4, 10, 1, 9, 0, 10, 10, 1, 0, 10, 0, 2];

describe("Create the correct number of balls", () => {
  it("No bonus balls", () => {
    expect(createBalls(parsedFrames, []).length === 16).toBeTruthy();
  });

  it("One bonus ball", () => {
    expect(createBalls(parsedFrames, ["x"]).length === 17).toBeTruthy();
  });

  it("Two bonus balls", () => {
    expect(
      createBalls(parsedFrames, parsedBonusBalls).length === 18
    ).toBeTruthy();
  });
});

it("Creates balls with correct scores", () => {
  const balls = createBalls(parsedFrames, parsedBonusBalls);
  balls.forEach((ball) => {
    expect(ball.score === scores[ball.index]).toBeTruthy();
  });
});
