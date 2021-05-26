const { scoreFrame } = require("./scoreFrame");

const Ball = require("./Ball");

const { OpenFrame, Strike, Spare } = require("./Frame");

describe("Scores frames correctly", () => {
  it("Scores openframes right", () => {
    const balls = [new Ball(0, 0), new Ball(1, 1)];

    const openFrame = new OpenFrame(0, [0, 1]);

    expect(scoreFrame(openFrame, balls) === 1).toBeTruthy();
  });

  it("Scores spares right", () => {
    const balls = [new Ball(0, 0), new Ball(10, 1), new Ball(10, 2)];

    const spare = new Spare(0, [0, 1]);

    expect(scoreFrame(spare, balls) === 20).toBeTruthy();
  });

  it("Scores spares right", () => {
    const balls = [new Ball(10, 0), new Ball(3, 1), new Ball(4, 2)];

    const strike = new Strike(0, [0]);

    expect(scoreFrame(strike, balls) === 17).toBeTruthy();
  });
});
