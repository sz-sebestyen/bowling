class Frame {
  constructor(frameIndex, ballIndices) {
    this.index = frameIndex;
    this.ballIndices = ballIndices;
  }
}

module.exports = class OpenFrame extends Frame {
  constructor(frameIndex, ballIndices) {
    super(frameIndex, ballIndices);
  }

  getBonusIndices() {
    return [];
  }
};

module.exports = class Spare extends Frame {
  constructor(frameIndex, ballIndices) {
    super(frameIndex, ballIndices);
  }

  getBonusIndices() {
    const lastBallIndex = this.ballIndices.slice(-1)[0];
    return [lastBallIndex + 1];
  }
};

module.exports = class Strike extends Frame {
  constructor(frameIndex, ballIndices) {
    super(frameIndex, ballIndices);
  }

  getBonusIndices() {
    const lastBallIndex = this.ballIndices.slice(-1)[0];
    return [lastBallIndex + 1, lastBallIndex + 2];
  }
};
