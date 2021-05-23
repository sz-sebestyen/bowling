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
