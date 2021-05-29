// ball patterns
const number = "[1-9]";
const miss = "-";
const numberOrMiss = `(?:${number}|${miss})`;
const spareBall = "/";

// frame patterns
const openFrame = `(?:(?:${numberOrMiss + number})|(?:${
  number + numberOrMiss
}))`;
const spare = numberOrMiss + spareBall;
const strike = "x";

const frame = `(?:${openFrame}|${spare}|${strike}|${miss})`;

const bonusBall = `(${number}|${miss}|${strike})`;

// game patterns
const tenFrames = `^(${frame})` + `\\s(${frame})`.repeat(9);
const twoBonusBalls = `^(?:${frame}\\s){9}${strike}\\s${bonusBall}\\s${bonusBall}$`;
const oneBonusBall = `^(?:${frame}\\s){9}${spare}\\s${bonusBall}$`;
const noBonusBalls = `^(?:${frame}\\s){9}(?:${openFrame}|${miss})$`;

exports.missBallMatcher = new RegExp(miss);
exports.strikeBallMatcher = new RegExp(strike, "i");

exports.openFrameMatcher = new RegExp(`^${openFrame}$`);
exports.spareFrameMatcher = new RegExp(`^${spare}$`);
exports.strikeFrameMatcher = new RegExp(`^${strike}$`, "i");
exports.missFrameMatcher = new RegExp(`^${miss}$`);

exports.framesMatcher = new RegExp(tenFrames, "i");
exports.strikeBonusBallsMatcher = new RegExp(twoBonusBalls, "i");
exports.spareBonusBallMatcher = new RegExp(oneBonusBall, "i");
exports.noBonusBallsMatcher = new RegExp(noBonusBalls, "i");
