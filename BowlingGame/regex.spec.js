const {
  missMatcher,
  strikeMatcher,
  openFrameMatcher,
  spareMatcher,
  tenFramesCapture,
  twoBonusBallsCapture,
  oneBonusBallCapture,
  noBonusBallsMatcher,
} = require("./regex");

describe("Match a missed ball", () => {
  it("Correct", () => {
    expect(missMatcher.test("-")).toBeTruthy();
  });

  it("Don't match strikes and spares", () => {
    expect(missMatcher.test("x")).toBeFalsy();
    expect(missMatcher.test("X")).toBeFalsy();
    expect(missMatcher.test("/")).toBeFalsy();
  });

  it("Don't match open frames", () => {
    for (let i = 1; i < 10; i++) {
      expect(missMatcher.test(`${i}`)).toBeFalsy();
    }
  });
});

describe("Match a strike ball", () => {
  it("Correct", () => {
    expect(strikeMatcher.test("x")).toBeTruthy();
    expect(strikeMatcher.test("X")).toBeTruthy();
  });

  it("Don't match misses and spares", () => {
    expect(strikeMatcher.test("-")).toBeFalsy();
    expect(strikeMatcher.test("/")).toBeFalsy();
  });

  it("Don't match open frames", () => {
    for (let i = 1; i < 10; i++) {
      expect(strikeMatcher.test(`${i}`)).toBeFalsy();
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
    expect(spareMatcher.test("-/")).toBeTruthy();
    for (let i = 1; i < 10; i++) {
      expect(spareMatcher.test(`${i}/`)).toBeTruthy();
    }
  });

  it("Don't match strikes, open frames and too long frames", () => {
    expect(spareMatcher.test("x")).toBeFalsy();
    expect(spareMatcher.test("//")).toBeFalsy();
    expect(spareMatcher.test("-9")).toBeFalsy();
    expect(spareMatcher.test("-9/")).toBeFalsy();
  });
});

describe("Match strike frames", () => {
  it("Correct", () => {
    expect(strikeMatcher.test("x")).toBeTruthy();
    expect(strikeMatcher.test("X")).toBeTruthy();
  });

  it("Don't match too long frames, spares and open frams", () => {
    expect(strikeMatcher.test("xx")).toBeFalsy();
    expect(strikeMatcher.test("//")).toBeFalsy();
    expect(strikeMatcher.test("-/")).toBeFalsy();
    for (let i = 1; i < 10; i++) {
      expect(strikeMatcher.test(`${i}/`)).toBeFalsy();
    }
    for (let i = 1; i < 9; i++) {
      expect(strikeMatcher.test(`${i}${9 - i}`)).toBeFalsy();
    }
  });
});

describe("Match missed frames", () => {
  it("Correct", () => {
    expect(missMatcher.test("-")).toBeTruthy();
  });

  it("Don't match spares, strikes, open frames and tool ong frames", () => {
    expect(missMatcher.test("//")).toBeFalsy();
    expect(missMatcher.test("-/")).toBeFalsy();
    expect(missMatcher.test("--")).toBeFalsy();
    expect(missMatcher.test("x")).toBeFalsy();
    for (let i = 1; i < 10; i++) {
      expect(missMatcher.test(`${i}/`)).toBeFalsy();
    }
    for (let i = 1; i < 9; i++) {
      expect(missMatcher.test(`${i}${9 - i}`)).toBeFalsy();
    }
  });
});

describe("Match 10 frames", () => {
  const example1 = "x x x x x x x x x x x x";
  const example2 = "x 35 9/ -7 -/ x 12 51 - 4/ x";

  it("Correct", () => {
    expect(tenFramesCapture.test(example1)).toBeTruthy();
    expect(tenFramesCapture.test(example2)).toBeTruthy();
  });

  it("Don't match too short strings", () => {
    expect(tenFramesCapture.test("x x x x 23 12 -/ -")).toBeFalsy();
  });

  it("Don't match strings with more spaces", () => {
    expect(tenFramesCapture.test("x x x x x x x x  x x x x")).toBeFalsy();
  });

  it("Match capuring groups", () => {
    const match1 = example1.match(tenFramesCapture);
    expect(match1[0] === example1.slice(0, 19)).toBeTruthy();
    for (let i = 1; i < match1.length; i++) {
      const arr = example1.split(" ");
      expect(match1[i] === arr[i - 1]).toBeTruthy();
    }

    const match2 = example2.match(tenFramesCapture);
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
    expect(oneBonusBallCapture.test(game)).toBeFalsy();
  });

  it("Game ends on open frame", () => {
    const game = "x x x x x x x x x 23";
    expect(oneBonusBallCapture.test(game)).toBeFalsy();
  });

  it("Game ends on open spare", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(oneBonusBallCapture.test(game)).toBeTruthy();
  });

  it("Game ends on open spare, capture bonus ball", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(game.match(oneBonusBallCapture)[0] === game).toBeTruthy();
    expect(game.match(oneBonusBallCapture)[1] === "x").toBeTruthy();
  });

  it("Game ends on open spare, but the bonus ball is missing", () => {
    const game = "x x x x x x x x x 2/ ";
    expect(oneBonusBallCapture.test(game)).toBeFalsy();
  });

  it("Game ends on open strike", () => {
    const game = "x x x x x x x x x x x 2";
    expect(oneBonusBallCapture.test(game)).toBeFalsy();
  });
});

describe("Match games with two bonus balls", () => {
  it("Game ends on miss", () => {
    const game = "x x x x x x x x x -";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });

  it("Game ends on open frame", () => {
    const game = "x x x x x x x x x 23";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });

  it("Game ends on open spare", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });

  it("Game ends on open spare, but there is an additional ball", () => {
    const game = "x x x x x x x x x 2/ x x";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });

  it("Game ends on open strike", () => {
    const game = "x x x x x x x x x x x 2";
    expect(twoBonusBallsCapture.test(game)).toBeTruthy();
  });

  it("Game ends on open strike, capture bonus balls", () => {
    const game = "x x x x x x x x x x x 2";
    expect(game.match(twoBonusBallsCapture)[0] === game).toBeTruthy();
    expect(game.match(twoBonusBallsCapture)[1] === "x").toBeTruthy();
    expect(game.match(twoBonusBallsCapture)[2] === "2").toBeTruthy();
  });

  it("Game ends on open strike, but bonus balls are missing", () => {
    const game = "x x x x x x x x x x";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });
});
