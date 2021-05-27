class Frame {
  constructor(frameIndex, firstBallIndex) {
    this._index = frameIndex;
    this._firstBallIndex = firstBallIndex;
  }

  getIndex() {
    return this._index;
  }
}

exports.OpenFrame = class OpenFrame extends Frame {
  constructor(frameIndex, firstBallIndex) {
    super(frameIndex, firstBallIndex);
  }

  getBonusIndices() {
    return [];
  }

  getBallIndices() {
    return [this._firstBallIndex, this._firstBallIndex + 1];
  }

  getLastBallIndex() {
    return this._firstBallIndex + 1;
  }
};

exports.Spare = class Spare extends Frame {
  constructor(frameIndex, firstBallIndex) {
    super(frameIndex, firstBallIndex);
  }

  getBonusIndices() {
    const lastBallIndex = this.getLastBallIndex();
    return [lastBallIndex + 1];
  }

  getBallIndices() {
    return [this._firstBallIndex, this._firstBallIndex + 1];
  }

  getLastBallIndex() {
    return this._firstBallIndex + 1;
  }
};

exports.Strike = class Strike extends Frame {
  constructor(frameIndex, firstBallIndex) {
    super(frameIndex, firstBallIndex);
  }

  getBonusIndices() {
    const lastBallIndex = this.getLastBallIndex();
    return [lastBallIndex + 1, lastBallIndex + 2];
  }

  getBallIndices() {
    return [this._firstBallIndex];
  }

  getLastBallIndex() {
    return this._firstBallIndex;
  }
};
