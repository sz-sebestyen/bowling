const BowlingGame = require("./BowlingGame");

it("placeholder", () => {
  expect(true).toBeTruthy();
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

  it("Wrong number of bonus balls", () => {
    expect(() => BowlingGame.parseBonusBalls("x x x x x x x x x x 2")).toThrow(
      RangeError
    );

    expect(() =>
      BowlingGame.parseBonusBalls("x x x x x x x x x x 2 3 4")
    ).toThrow(RangeError);

    expect(() => BowlingGame.parseBonusBalls("x x x x x x x x x x")).toThrow(
      RangeError
    );

    expect(() => BowlingGame.parseBonusBalls("x x x x x x x x x 1/")).toThrow(
      RangeError
    );

    expect(() =>
      BowlingGame.parseBonusBalls("x x x x x x x x x 2/ 2 3")
    ).toThrow(RangeError);

    expect(() => BowlingGame.parseBonusBalls("x x x x x x x x x - 1")).toThrow(
      RangeError
    );
  });
});
