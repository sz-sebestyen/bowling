const {
  missBallMatcher,
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