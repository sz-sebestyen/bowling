const { BowlingGame } = require("./BowlingGame");

it("all strike", () => {
  const score = new BowlingGame("x x x x x x x x x x x x").getScore();
  console.log("calculated: ", score);
  expect(score === 300).toBeTruthy();
});

it("ends on spare", () => {
  const score = new BowlingGame("x 35 9/ -7 -/ x 12 51 - 4/ x").getScore();
  console.log("calculated: ", score);
  expect(score === 105).toBeTruthy();
});
