const calculateScore = require("./calculateScore");

describe("calculateScore", () => {
  it("returns 300 when all frames are strikes", () => {
    const score = calculateScore("x x x x x x x x x x x x");
    expect(score).toBe(300);
  });

  it("returns the right score when given one bonus ball", () => {
    const score = calculateScore("x 35 9/ -7 -/ x 12 51 - 4/ x");
    expect(score).toBe(105);
  });

  it("returns the right score when given two bonus balls", () => {
    const score = calculateScore("33 1/ x 33 1/ x 33 1/ x x 2 -");
    expect(score).toBe(144);
  });
});
