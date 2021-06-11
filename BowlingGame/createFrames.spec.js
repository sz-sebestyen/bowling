const { createFrames } = require("./createFrames");

const { OpenFrame, Spare, Strike } = require("./Frame");
jest.mock("./Frame");

const parsedFrames = ["x", "-", "13", "44", "x", "1/", "-/", "x", "1-", "x"];

describe("Create the correct number of frames", () => {
  it("Correct number of frames", () => {
    expect(createFrames(parsedFrames).length === 10).toBeTruthy();
  });

  beforeEach(() => {
    OpenFrame.mockClear();
    Spare.mockClear();
    Strike.mockClear();
    createFrames(parsedFrames);
  });

  it("Correct number of openframes", () => {
    expect(OpenFrame).toHaveBeenCalledTimes(4);
  });

  it("Correct number of spares", () => {
    expect(Spare).toHaveBeenCalledTimes(2);
  });

  it("Correct number of strikes", () => {
    expect(Strike).toHaveBeenCalledTimes(4);
  });
});
