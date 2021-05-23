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

it("Match a missed ball", () => {
  expect(missBallMatcher.test("-")).toBeTruthy();
  expect(missBallMatcher.test("x")).toBeFalsy();
  expect(missBallMatcher.test("X")).toBeFalsy();
  expect(missBallMatcher.test("/")).toBeFalsy();
  for (let i = 1; i < 10; i++) {
    expect(missBallMatcher.test(`${i}`)).toBeFalsy();
  }
});

it("Match open frames", () => {
  expect(openFrameMatcher.test("11")).toBeTruthy();
  expect(openFrameMatcher.test("-9")).toBeTruthy();
  expect(openFrameMatcher.test("5-")).toBeTruthy();
  expect(openFrameMatcher.test("55")).toBeTruthy();
  expect(openFrameMatcher.test("x")).toBeFalsy();
  expect(openFrameMatcher.test("-/")).toBeFalsy();
  expect(openFrameMatcher.test("9/")).toBeFalsy();
  for (let i = 1; i < 9; i++) {
    expect(openFrameMatcher.test(`${i}${9 - i}`)).toBeTruthy();
  }
});

it("Match spare frames", () => {
  expect(spareFrameMatcher.test("x")).toBeFalsy();
  expect(spareFrameMatcher.test("//")).toBeFalsy();
  expect(spareFrameMatcher.test("-9")).toBeFalsy();
  expect(spareFrameMatcher.test("-/")).toBeTruthy();
  for (let i = 1; i < 10; i++) {
    expect(spareFrameMatcher.test(`${i}/`)).toBeTruthy();
  }
});

it("Match strike frames", () => {
  expect(strikeFrameMatcher.test("x")).toBeTruthy();
  expect(strikeFrameMatcher.test("//")).toBeFalsy();
  expect(strikeFrameMatcher.test("-/")).toBeFalsy();
  for (let i = 1; i < 10; i++) {
    expect(strikeFrameMatcher.test(`${i}/`)).toBeFalsy();
  }
  for (let i = 1; i < 9; i++) {
    expect(strikeFrameMatcher.test(`${i}${9 - i}`)).toBeFalsy();
  }
});
