const BowlingGame = require("./BowlingGame");

// TODO: Write tests for parseFrames and parseBonusBalls

describe("Parse frames", () => {
  it("Correct", () => {
    expect(
      BowlingGame.parseFrames("x x x x x x x x x x x x").join(" ") ===
        "x x x x x x x x x x"
    ).toBeTruthy();
  });

  it("Too few frames", () => {
    expect(BowlingGame.parseFrames("x x x x x x")).toThrow(RangeError);
  });
});
