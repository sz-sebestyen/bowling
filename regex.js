// ball patterns
const numBall = "[1-9]";
const missBall = "-";
const simpleBall = `(?:${numBall}|${missBall})`;
const spareBall = "/";
const strikeBall = "x";

// frame patterns
const openFrame = `(?:(?:${simpleBall + numBall})|(?:${numBall + simpleBall}))`;
const spareFrame = simpleBall + spareBall;
const strikeFrame = strikeBall;
const missFrame = missBall;

const frame = `(${openFrame}|${spareFrame}|${strikeFrame}|${missFrame})`;
const frameNoCap = `(?:${openFrame}|${spareFrame}|${strikeFrame}|${missFrame})`;

const bonusBall = `(${numBall}|${missBall}|${strikeBall})`;

// game patterns
const allFrames = `^${frame}(?:\\s${frame}){9}`;
const strikeBonusBalls = `^(?:${frameNoCap}\\s){9}${strikeFrame}(?:\\s${bonusBall}){2}$`;
const spareBonusBall = `^(?:${frameNoCap}\\s){9}${spareFrame}\\s${bonusBall}$`;
const noBonusBalls = `^(?:${frameNoCap}\\s){9}(?:${openFrame}|${missFrame})$`;

exports.missBallMatcher = new RegExp(missBall);

exports.openFrameMatcher = new RegExp(openFrame);
exports.spareFrameMatcher = new RegExp(spareFrame);
exports.strikeFrameMatcher = new RegExp(strikeFrame, "i");
exports.missFrameMatcher = new RegExp(missFrame);

exports.framesMatcher = new RegExp(allFrames, "i");
exports.strikeBonusBallsMatcher = new RegExp(strikeBonusBalls, "i");
exports.spareBonusBallMatcher = new RegExp(spareBonusBall, "i");
exports.noBonusBallsMatcher = new RegExp(noBonusBalls, "i");
