const { scoreFrame } = require("./scoreFrame");

exports.scoreGame = (frames, balls) => {
  return frames.reduce((sum, curFrame) => sum + scoreFrame(curFrame, balls), 0);
};
