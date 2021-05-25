const calculateScore = require("./calculateScore");
const BowlingGame = require("./BowlingGame");
jest.mock("./BowlingGame");

beforeEach(() => {
  BowlingGame.mockClear();
});

it("BowlingGame constructor was called once", () => {
  calculateScore();
  expect(BowlingGame).toHaveBeenCalledTimes(1);
});

it("getScore method of the BowlingGame class was called once", () => {
  expect(BowlingGame).not.toHaveBeenCalled();

  calculateScore();

  expect(BowlingGame.mock.instances[0].getScore).toHaveBeenCalledTimes(1);
});
