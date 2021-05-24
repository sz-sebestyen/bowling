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
    expect(() => BowlingGame.parseFrames("x x x x x x")).toThrow(RangeError);
  });
});

describe("Parse bonusballs", () => {
  it("Last frame is open", () => {
    expect(
      BowlingGame.parseBonusBalls("x x x x x x x x x 12").length
    ).toBeFalsy();
  });

  it("Last frame is spare", () => {
    expect(
      BowlingGame.parseBonusBalls("x x x x x x x x x 1/ x")[0] === "x"
    ).toBeTruthy();
  });

  it("Last frame is strike", () => {
    expect(
      BowlingGame.parseBonusBalls("x x x x x x x x x x 2 3").join(" ") === "2 3"
    ).toBeTruthy();
  });

  // TODO: write tests for errors
});
