const Frame = require("./Frame");

it("Test constructor", () => {
  const frame = new Frame(0, [0, 1], [2]);
  expect(frame.index === 0).toBeTruthy();
  expect(frame.ballIndices.join(" ") === "0 1").toBeTruthy();
  expect(frame.bonusIndices.join(" ") === "2").toBeTruthy();
});
