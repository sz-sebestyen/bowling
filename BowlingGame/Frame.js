class Frame {
  constructor(frameIndex, ballIndices) {
    this._index = frameIndex;
    this._ballIndices = ballIndices;
  }

  getBallIndices() {
    return this._ballIndices;
  }

  getIndex() {
    return this._index;
  }

  getLastBallIndex() {
    return this.getBallIndices().slice(-1)[0];
  }
}

exports.OpenFrame = class OpenFrame extends Frame {
  constructor(frameIndex, ballIndices) {
    super(frameIndex, ballIndices);
  }

  getBonusIndices() {
    return [];
  }
};

exports.Spare = class Spare extends Frame {
  constructor(frameIndex, ballIndices) {
    super(frameIndex, ballIndices);
  }

  getBonusIndices() {
    const lastBallIndex = this.getLastBallIndex();
    return [lastBallIndex + 1];
  }
};

exports.Strike = class Strike extends Frame {
  constructor(frameIndex, ballIndices) {
    super(frameIndex, ballIndices);
  }

  getBonusIndices() {
    const lastBallIndex = this.getLastBallIndex();
    return [lastBallIndex + 1, lastBallIndex + 2];
  }
};
