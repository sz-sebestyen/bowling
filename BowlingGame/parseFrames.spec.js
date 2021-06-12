const { parseFrames } = require("./parseFrames");

describe("parseFrames", () => {
  it("returns 10 frames when given enough frames", () => {
    const expected = ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x"];
    expect(parseFrames("x x x x x x x x x x x x")).toEqual(expected);
  });

  it("throws RangeError given too few frames", () => {
    expect(() => parseFrames("x x x x x x")).toThrow(RangeError);
  });
});
