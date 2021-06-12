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

describe("missMatcher", () => {
  it("tests true when -", () => {
    expect(missMatcher.test("-")).toBeTruthy();
  });

  it("should test false when x, X or /", () => {
    expect(missMatcher.test("x")).toBeFalsy();
    expect(missMatcher.test("X")).toBeFalsy();
    expect(missMatcher.test("/")).toBeFalsy();
  });

  it("should test false when 1-9", () => {
    for (let i = 1; i < 10; i++) {
      expect(missMatcher.test(`${i}`)).toBeFalsy();
    }
  });
});

describe("strikeMatcher", () => {
  it("should test true when x or X", () => {
    expect(strikeMatcher.test("x")).toBeTruthy();
    expect(strikeMatcher.test("X")).toBeTruthy();
  });

  it("should test false when - or /", () => {
    expect(strikeMatcher.test("-")).toBeFalsy();
    expect(strikeMatcher.test("/")).toBeFalsy();
  });

  it("should test false when 1-9", () => {
    for (let i = 1; i < 10; i++) {
      expect(strikeMatcher.test(`${i}`)).toBeFalsy();
    }
  });
});

describe("openFrameMatcher", () => {
  it("should test true when yx, where x and y is 1-9", () => {
    expect(openFrameMatcher.test("55")).toBeTruthy();
    for (let i = 1; i < 9; i++) {
      expect(openFrameMatcher.test(`${i}${9 - i}`)).toBeTruthy();
    }
  });

  it("should test true when yx or xy, where x is 1-9 and y is -", () => {
    expect(openFrameMatcher.test("-9")).toBeTruthy();
    expect(openFrameMatcher.test("5-")).toBeTruthy();
  });

  it("should test false when strike", () => {
    expect(openFrameMatcher.test("x")).toBeFalsy();
  });

  it("should test false when spare", () => {
    expect(openFrameMatcher.test("-/")).toBeFalsy();
    expect(openFrameMatcher.test("9/")).toBeFalsy();
  });

  it("should test false when --", () => {
    expect(openFrameMatcher.test("--")).toBeFalsy();
  });

  it("should test false when longer than 2", () => {
    expect(openFrameMatcher.test("111")).toBeFalsy();
  });
});

describe("spareMatcher", () => {
  it("should test true when frame end on /", () => {
    expect(spareMatcher.test("-/")).toBeTruthy();
    for (let i = 1; i < 10; i++) {
      expect(spareMatcher.test(`${i}/`)).toBeTruthy();
    }
  });

  it("should test false when strike", () => {
    expect(spareMatcher.test("x")).toBeFalsy();
  });

  it("should test false when //", () => {
    expect(spareMatcher.test("//")).toBeFalsy();
  });

  it("should test false when too long", () => {
    expect(spareMatcher.test("-9/")).toBeFalsy();
    expect(spareMatcher.test("-/2")).toBeFalsy();
  });

  it("should test false when open frame", () => {
    expect(spareMatcher.test("-9")).toBeFalsy();
  });
});

describe("strikeMatcher", () => {
  it("should test true when x", () => {
    expect(strikeMatcher.test("x")).toBeTruthy();
  });

  it("should test true when X", () => {
    expect(strikeMatcher.test("X")).toBeTruthy();
  });

  it("should test false when too long", () => {
    expect(strikeMatcher.test("xx")).toBeFalsy();
    expect(strikeMatcher.test("//")).toBeFalsy();
  });

  it("should test false when 1-9", () => {
    for (let i = 1; i < 10; i++) {
      expect(strikeMatcher.test(`${i}`)).toBeFalsy();
    }
  });

  it("should test false when spare", () => {
    expect(strikeMatcher.test("-/")).toBeFalsy();
    for (let i = 1; i < 10; i++) {
      expect(strikeMatcher.test(`${i}/`)).toBeFalsy();
    }
  });

  it("should test false when open frame", () => {
    for (let i = 1; i < 9; i++) {
      expect(strikeMatcher.test(`${i}${9 - i}`)).toBeFalsy();
    }
  });
});

describe("missMatcher", () => {
  it("should test true when -", () => {
    expect(missMatcher.test("-")).toBeTruthy();
  });

  it("should test false when too long", () => {
    expect(missMatcher.test("--")).toBeFalsy();
  });

  it("should test false when spare", () => {
    expect(missMatcher.test("-/")).toBeFalsy();
    for (let i = 1; i < 10; i++) {
      expect(missMatcher.test(`${i}/`)).toBeFalsy();
    }
  });

  it("should test false when strike", () => {
    expect(missMatcher.test("x")).toBeFalsy();
  });

  it("should test false when open frame", () => {
    for (let i = 1; i < 9; i++) {
      expect(missMatcher.test(`${i}${9 - i}`)).toBeFalsy();
    }
  });
});

describe("tenFramesCapture", () => {
  const example1 = "x x x x x x x x x x x x";
  const example2 = "x 35 9/ -7 -/ x 12 51 - 4/ x";

  it("should test false when too few frames", () => {
    expect(tenFramesCapture.test("x x x x 23 12 -/ -")).toBeFalsy();
  });

  it("should test false when additional space", () => {
    expect(tenFramesCapture.test("x x x x x x x x  x x x x")).toBeFalsy();
  });

  it("should match 10 capuring groups from exmaple1", () => {
    const match1 = example1.match(tenFramesCapture);
    const arr = example1.split(" ");

    for (let i = 1; i < match1.length; i++) {
      expect(match1[i]).toBe(arr[i - 1]);
    }
  });

  it("should match 10 capuring groups from exmaple2", () => {
    const match2 = example2.match(tenFramesCapture);
    const arr = example2.split(" ");

    for (let i = 1; i < match2.length; i++) {
      expect(match2[i]).toBe(arr[i - 1]);
    }
  });
});

describe("noBonusBallsMatcher", () => {
  it("should test true when game ends on -", () => {
    const game = "x x x x x x x x x -";
    expect(noBonusBallsMatcher.test(game)).toBeTruthy();
  });

  it("should test true when game ends on open frame", () => {
    const game = "x x x x x x x x x 23";
    expect(noBonusBallsMatcher.test(game)).toBeTruthy();
  });

  it("should test false when game ends on open frame, but there is a bonus ball", () => {
    const game = "x x x x x x x x x 23 -";
    expect(noBonusBallsMatcher.test(game)).toBeFalsy();
  });

  it("should test false when game ends on open spare", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(noBonusBallsMatcher.test(game)).toBeFalsy();
  });

  it("should test false when game ends on strike", () => {
    const game = "x x x x x x x x x x x 2";
    expect(noBonusBallsMatcher.test(game)).toBeFalsy();
  });
});

describe("oneBonusBallCapture", () => {
  it("should test false when game ends on -", () => {
    const game = "x x x x x x x x x -";
    expect(oneBonusBallCapture.test(game)).toBeFalsy();
  });

  it("should test false when game ends on open frame", () => {
    const game = "x x x x x x x x x 23";
    expect(oneBonusBallCapture.test(game)).toBeFalsy();
  });

  it("should test true when game ends on open spare", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(oneBonusBallCapture.test(game)).toBeTruthy();
  });

  it("should capture one bonus ball", () => {
    const game = "x x x x x x x x x 2/ x";
    const match = game.match(oneBonusBallCapture);
    expect(match[1]).toBe("x");
  });

  it("should test false when bonus ball is missing", () => {
    const game = "x x x x x x x x x 2/ ";
    expect(oneBonusBallCapture.test(game)).toBeFalsy();
  });

  it("should not capture bonusball when game ends on a strike", () => {
    const game = "x x x x x x x x x x x 2";
    expect(oneBonusBallCapture.test(game)).toBeFalsy();
  });
});

describe("twoBonusBallsCapture", () => {
  it("should test false when frames end on -", () => {
    const game = "x x x x x x x x x -";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });

  it("should test false when game ends on open frame", () => {
    const game = "x x x x x x x x x 23";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });

  it("should test false when frames end with spare", () => {
    const game = "x x x x x x x x x 2/ x";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });

  it("should test false when frames end with spare, but two bonus balls are present", () => {
    const game = "x x x x x x x x x 2/ x x";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });

  it("should capture the two bonus balls when frames end on strike", () => {
    const game = "x x x x x x x x x x x 2";
    const match = game.match(twoBonusBallsCapture);
    expect(match[0]).toBe(game);
    expect(match[1]).toBe("x");
    expect(match[2]).toBe("2");
  });

  it("should test false when frames end on strike, but bonus balls are missing", () => {
    const game = "x x x x x x x x x x";
    expect(twoBonusBallsCapture.test(game)).toBeFalsy();
  });
});
