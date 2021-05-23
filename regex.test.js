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
