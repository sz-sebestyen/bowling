const { OpenFrame, Strike, Spare } = require("./Frame");

it("Test OpenFrame", () => {
  const frame = new OpenFrame(0, 0);
  expect(frame.getIndex() === 0).toBeTruthy();
  expect(frame.getBallIndices().join(" ") === "0 1").toBeTruthy();
  expect(frame.getBonusIndices().length === 0).toBeTruthy();
});

it("Test Spare", () => {
  const frame = new Spare(0, 0);
  expect(frame.getIndex() === 0).toBeTruthy();
  expect(frame.getBallIndices().join(" ") === "0 1").toBeTruthy();
  expect(frame.getBonusIndices().length === 1).toBeTruthy();
  expect(frame.getBonusIndices()[0] === 2).toBeTruthy();
});

it("Test Strike", () => {
  const frame = new Strike(0, 0);
  expect(frame.getIndex() === 0).toBeTruthy();
  expect(frame.getBallIndices().join(" ") === "0").toBeTruthy();
  expect(frame.getBonusIndices().length === 2).toBeTruthy();
  expect(frame.getBonusIndices().join(" ") === "1 2").toBeTruthy();
});
