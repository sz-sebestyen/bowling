const {
  openFrameMatcher,
  spareFrameMatcher,
  strikeFrameMatcher,
  missFrameMatcher,
} = require("./regex");

const { OpenFrame, Strike, Spare } = require("./Frame");

exports.createFrames = (parsedFrames) => {
  const frames = [];

  parsedFrames.forEach((frame, frameIndex) => {
    const isOpenFrame = openFrameMatcher.test(frame);
    const isSpare = spareFrameMatcher.test(frame);
    const isStrike = strikeFrameMatcher.test(frame);
    const isDoubleMiss = missFrameMatcher.test(frame);

    const lastBallIndex = frames.length
      ? frames.slice(-1)[0].getLastBallIndex()
      : -1;

    const currentBallIndex = lastBallIndex + 1;

    if (isOpenFrame) {
      frames.push(new OpenFrame(frameIndex, currentBallIndex));
    } else if (isSpare) {
      frames.push(new Spare(frameIndex, currentBallIndex));
    } else if (isStrike) {
      frames.push(new Strike(frameIndex, currentBallIndex));
    } else if (isDoubleMiss) {
      frames.push(new OpenFrame(frameIndex, currentBallIndex));
    } else {
      throw Error("Could not identify a frame!");
    }
  });

  return frames;
};
