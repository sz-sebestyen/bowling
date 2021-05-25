const Ball = require("./Ball");

it("Test constructor", () => {
  const ball = new Ball(10, 0);
  expect(ball.index === 0).toBeTruthy();
  expect(ball.score === 10).toBeTruthy();
});
