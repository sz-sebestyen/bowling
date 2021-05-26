const { createBalls } = require("./createBalls");

it("placeholder", () => {
  expect(true).toBeTruthy();
});

const parsedFrames = ["x", "-", "13", "44", "x", "1/", "-/", "x", "1-", "x"];

const parsedBonusBalls = ["-", "2"];

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
