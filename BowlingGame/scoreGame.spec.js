const { scoreGame } = require("./scoreGame");

const Ball = require("./Ball");

const { OpenFrame, Strike, Spare } = require("./Frame");

// 33 1/ x 33 1/ x 33 1/ x x 2 -
const frames = [
  new OpenFrame(0, 0),
  new Spare(1, 2),
  new Strike(2, 4),
  new OpenFrame(3, 5),
  new Spare(4, 7),
  new Strike(5, 9),
  new OpenFrame(6, 10),
  new Spare(7, 12),
  new Strike(8, 14),
  new Strike(9, 15),
];

const balls = [
  new Ball(3, 0),
  new Ball(3, 1),
  new Ball(1, 2),
  new Ball(9, 3),
  new Ball(10, 4),
  new Ball(3, 5),
  new Ball(3, 6),
  new Ball(1, 7),
  new Ball(9, 8),
  new Ball(10, 9),
  new Ball(3, 10),
  new Ball(3, 11),
  new Ball(1, 12),
  new Ball(9, 13),
  new Ball(10, 14),
  new Ball(10, 15),
  new Ball(2, 16),
  new Ball(0, 17),
];

// 88 + 10 + 6 + 10 + 6 + 10 + 10 + 2 + 2 + 0 = 144

describe("scoreGame", () => {
  it("calculates the right score", () => {
    const score = scoreGame(frames, balls);

    expect(score).toBe(144);
  });
});
