const calculateScore = require("./calculateScore");

describe("Calculate the right score", () => {
  it("All strike", () => {
    expect(calculateScore("x x x x x x x x x x x x") === 300).toBeTruthy();
  });

  it("One bonus ball", () => {
    expect(calculateScore("x 35 9/ -7 -/ x 12 51 - 4/ x") === 105).toBeTruthy();
  });

  it("One bonus ball", () => {
    expect(
      calculateScore("33 1/ x 33 1/ x 33 1/ x x 2 -") === 144
    ).toBeTruthy();
  });
});
