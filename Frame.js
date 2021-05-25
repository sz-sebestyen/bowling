module.exports = class Frame {
  constructor(frameIndex, ballIndices, bonusIndices) {
    this.index = frameIndex;
    this.ballIndices = ballIndices;
    this.bonusIndices = bonusIndices;
  }
};
