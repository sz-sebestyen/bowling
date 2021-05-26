const {
  missBallMatcher,
  strikeBallMatcher,
  openFrameMatcher,
  spareFrameMatcher,
  strikeFrameMatcher,
  missFrameMatcher,
  framesMatcher,
  strikeBonusBallsMatcher,
  spareBonusBallMatcher,
  noBonusBallsMatcher,
} = require("./regex");

describe("Match a missed ball", () => {
  it("Correct", () => {
    expect(missBallMatcher.test("-")).toBeTruthy();
  });

  it("Don't match strikes and spares", () => {
    expect(missBallMatcher.test("x")).toBeFalsy();
    expect(missBallMatcher.test("X")).toBeFalsy();
    expect(missBallMatcher.test("/")).toBeFalsy();
  });

  it("Don't match open frames", () => {
    for (let i = 1; i < 10; i++) {
      expect(missBallMatcher.test(`${i}`)).toBeFalsy();
    }
  });
});

describe("Match a strike ball", () => {
  it("Correct", () => {
    expect(strikeBallMatcher.test("x")).toBeTruthy();
    expect(strikeBallMatcher.test("X")).toBeTruthy();
  });

  it("Don't match misses and spares", () => {
    expect(strikeBallMatcher.test("-")).toBeFalsy();
    expect(strikeBallMatcher.test("/")).toBeFalsy();
  });

  it("Don't match open frames", () => {
    for (let i = 1; i < 10; i++) {
      expect(strikeBallMatcher.test(`${i}`)).toBeFalsy();
    }
  });
});

describe("Match open frames", () => {
  it("Correct", () => {
    expect(openFrameMatcher.test("11")).toBeTruthy();
    expect(openFrameMatcher.test("-9")).toBeTruthy();
    expect(openFrameMatcher.test("5-")).toBeTruthy();
    expect(openFrameMatcher.test("55")).toBeTruthy();
    for (let i = 1; i < 9; i++) {
      expect(openFrameMatcher.test(`${i}${9 - i}`)).toBeTruthy();
    }
  });

  it("Don't match strikes spares and strings longer than 2", () => {
    expect(openFrameMatcher.test("x")).toBeFalsy();
    expect(openFrameMatcher.test("-/")).toBeFalsy();
    expect(openFrameMatcher.test("--")).toBeFalsy();
    expect(openFrameMatcher.test("9/")).toBeFalsy();
    expect(openFrameMatcher.test("111")).toBeFalsy();
  });
});

describe("Match spare frames", () => {
  it("Correct", () => {
    expect(spareFrameMatcher.test("-/")).toBeTruthy();
    for (let i = 1; i < 10; i++) {
      expect(spareFrameMatcher.test(`${i}/`)).toBeTruthy();
    }
  });

  it("Don't match strikes, open frames and too long frames", () => {
    expect(spareFrameMatcher.test("x")).toBeFalsy();
    expect(spareFrameMatcher.test("//")).toBeFalsy();
    expect(spareFrameMatcher.test("-9")).toBeFalsy();
    expect(spareFrameMatcher.test("-9/")).toBeFalsy();
  });
});

describe("Match strike frames", () => {
  it("Correct", () => {
    expect(strikeFrameMatcher.test("x")).toBeTruthy();
    expect(strikeFrameMatcher.test("X")).toBeTruthy();
  });

  it("Don't match too long frames, spares and open frams", () => {
    expect(strikeFrameMatcher.test("xx")).toBeFalsy();
    expect(strikeFrameMatcher.test("//")).toBeFalsy();
    expect(strikeFrameMatcher.test("-/")).toBeFalsy();
    for (let i = 1; i < 10; i++) {
      expect(strikeFrameMatcher.test(`${i}/`)).toBeFalsy();
    }
    for (let i = 1; i < 9; i++) {
      expect(strikeFrameMatcher.test(`${i}${9 - i}`)).toBeFalsy();
    }
  });
});

describe("Match missed frames", () => {
  it("Correct", () => {
    expect(missFrameMatcher.test("-")).toBeTruthy();
  });

  it("Don't match spares, strikes, open frames and tool ong frames", () => {
    expect(missFrameMatcher.test("//")).toBeFalsy();
    expect(missFrameMatcher.test("-/")).toBeFalsy();
    expect(missFrameMatcher.test("--")).toBeFalsy();
    expect(missFrameMatcher.test("x")).toBeFalsy();
    for (let i = 1; i < 10; i++) {
      expect(missFrameMatcher.test(`${i}/`)).toBeFalsy();
    }
    for (let i = 1; i < 9; i++) {
      expect(missFrameMatcher.test(`${i}${9 - i}`)).toBeFalsy();
    }
  });
});

describe("Match 10 frames", () => {
  const example1 = "x x x x x x x x x x x x";
  const example2 = "x 35 9/ -7 -/ x 12 51 - 4/ x";

  it("Correct", () => {
    expect(framesMatcher.test(example1)).toBeTruthy();
    expect(framesMatcher.test(example2)).toBeTruthy();
  });

  it("Don't match too short strings", () => {
    expect(framesMatcher.test("x x x x 23 12 -/ -")).toBeFalsy();
  });

  it("Don't match strings with more spaces", () => {
    expect(framesMatcher.test("x x x x x x x x  x x x x")).toBeFalsy();
  });

  it("Match capuring groups", () => {
    const match1 = example1.match(framesMatcher);
    expect(match1[0] === example1.slice(0, 19)).toBeTruthy();
    for (let i = 1; i < match1.length; i++) {
      const arr = example1.split(" ");
      expect(match1[i] === arr[i - 1]).toBeTruthy();
    }

    const match2 = example2.match(framesMatcher);
    expect(match2[0] === example2.slice(0, 26)).toBeTruthy();
    for (let i = 1; i < match2.length; i++) {
      const arr = example2.split(" ");
      expect(match2[i] === arr[i - 1]).toBeTruthy();
    }
  });
});

describe("Match games without bonus balls", () => {
  it("Game ends on miss", () => {
    const game = "x x x x x x x x x -";
    expect(noBonusBallsMatcher.test(game)).toBeTruthy();
  });

  it("Game ends on open frame", () => {
    const game = "x x x x x x x x x 23";
    expect(noBonusBallsMatcher.test(game)).toBeTruthy();
  });

  it("Game ends on open frame, but there is a bonus ball", () => {
    const game = "x x x x x x x x x 23 -";
    expect(noBonusBallsMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open spare", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(noBonusBallsMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open strike", () => {
    const game = "x x x x x x x x x x x 2";
    expect(noBonusBallsMatcher.test(game)).toBeFalsy();
  });
});

describe("Match games with one bonus ball", () => {
  it("Game ends on miss", () => {
    const game = "x x x x x x x x x -";
    expect(spareBonusBallMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open frame", () => {
    const game = "x x x x x x x x x 23";
    expect(spareBonusBallMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open spare", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(spareBonusBallMatcher.test(game)).toBeTruthy();
  });

  it("Game ends on open spare, capture bonus ball", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(game.match(spareBonusBallMatcher)[0] === game).toBeTruthy();
    expect(game.match(spareBonusBallMatcher)[1] === "x").toBeTruthy();
  });

  it("Game ends on open spare, but the bonus ball is missing", () => {
    const game = "x x x x x x x x x 2/ ";
    expect(spareBonusBallMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open strike", () => {
    const game = "x x x x x x x x x x x 2";
    expect(spareBonusBallMatcher.test(game)).toBeFalsy();
  });
});

describe("Match games with two bonus balls", () => {
  it("Game ends on miss", () => {
    const game = "x x x x x x x x x -";
    expect(strikeBonusBallsMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open frame", () => {
    const game = "x x x x x x x x x 23";
    expect(strikeBonusBallsMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open spare", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(strikeBonusBallsMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open spare, but there is an additional ball", () => {
    const game = "x x x x x x x x x 2/ x x";
    expect(strikeBonusBallsMatcher.test(game)).toBeFalsy();
  });

  it("Game ends on open strike", () => {
    const game = "x x x x x x x x x x x 2";
    expect(strikeBonusBallsMatcher.test(game)).toBeTruthy();
  });

  it("Game ends on open strike, capture bonus balls", () => {
    const game = "x x x x x x x x x x x 2";
    expect(game.match(strikeBonusBallsMatcher)[0] === game).toBeTruthy();
    expect(game.match(strikeBonusBallsMatcher)[1] === "x").toBeTruthy();
    expect(game.match(strikeBonusBallsMatcher)[2] === "2").toBeTruthy();
  });

  it("Game ends on open strike, but bonus balls are missing", () => {
    const game = "x x x x x x x x x x";
    expect(strikeBonusBallsMatcher.test(game)).toBeFalsy();
  });
});
