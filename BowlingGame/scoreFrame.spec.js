const { scoreFrame } = require("./scoreFrame");

const Ball = require("./Ball");

const { OpenFrame, Strike, Spare } = require("./Frame");

describe("scoreFrame", () => {
  it("Scores openframes right", () => {
    const balls = [new Ball(0, 0), new Ball(1, 1)];
    const openFrame = new OpenFrame(0, 0);

    const score = scoreFrame(openFrame, balls);

    expect(score).toBe(1);
  });

  it("Scores spares right", () => {
    const balls = [new Ball(0, 0), new Ball(10, 1), new Ball(10, 2)];
    const spare = new Spare(0, 0);

    const score = scoreFrame(spare, balls);

    expect(score).toBe(20);
  });

  it("Scores strikes right", () => {
    const balls = [new Ball(10, 0), new Ball(3, 1), new Ball(4, 2)];
    const strike = new Strike(0, 0);

    const score = scoreFrame(strike, balls);

    expect(score).toBe(17);
  });
});
