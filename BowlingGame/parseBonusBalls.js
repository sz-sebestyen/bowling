const {
  twoBonusBallsCapture,
  oneBonusBallCapture,
  noBonusBallsMatcher,
} = require("./regex");

exports.parseBonusBalls = (gameString) => {
  const isLastFrameOpen = gameString.match(noBonusBallsMatcher);
  const isLastFrameSpare = gameString.match(oneBonusBallCapture);
  const isLastFrameStrike = gameString.match(twoBonusBallsCapture);

  let parsedBonusBalls;

  if (isLastFrameOpen) {
    parsedBonusBalls = [];
  } else if (isLastFrameSpare) {
    const [_, bonusBall] = isLastFrameSpare;

    parsedBonusBalls = [bonusBall];
  } else if (isLastFrameStrike) {
    const [_, ...bonusBalls] = isLastFrameStrike;

    parsedBonusBalls = bonusBalls;
  } else {
    throw RangeError("Then number of bonusballs must match the last frame!");
  }

  return parsedBonusBalls;
};
