const {
  openFrameMatcher,
  spareFrameMatcher,
  strikeFrameMatcher,
  missFrameMatcher,
} = require("./regex");

const { OpenFrame, Strike, Spare } = require("./Frame");

exports.createFrames = (parsedFrames) => {
  const frames = [];
  let numberOfBalls = 0;

  parsedFrames.forEach((frame, frameIndex) => {
    const isOpenFrame = openFrameMatcher.test(frame);
    const isSpare = spareFrameMatcher.test(frame);
    const isStrike = strikeFrameMatcher.test(frame);
    const isDoubleMiss = missFrameMatcher.test(frame);

    if (isOpenFrame) {
      frames.push(
        new OpenFrame(frameIndex, [numberOfBalls++, numberOfBalls++])
      );
    } else if (isSpare) {
      frames.push(new Spare(frameIndex, [numberOfBalls++, numberOfBalls++]));
    } else if (isStrike) {
      frames.push(new Strike(frameIndex, [numberOfBalls++]));
    } else if (isDoubleMiss) {
      frames.push(
        new OpenFrame(frameIndex, [numberOfBalls++, numberOfBalls++])
      );
    } else {
      throw Error("Could not identify a frame!");
    }
  });

  return frames;
};
