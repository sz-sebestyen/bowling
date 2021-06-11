const { parseFrames } = require("./parseFrames");

describe("Parse frames", () => {
  it("Correct", () => {
    expect(
      parseFrames("x x x x x x x x x x x x").join(" ") === "x x x x x x x x x x"
    ).toBeTruthy();
  });

  it("Too few frames", () => {
    expect(() => parseFrames("x x x x x x")).toThrow(RangeError);
  });
});
