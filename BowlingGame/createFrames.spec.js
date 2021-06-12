const { createFrames } = require("./createFrames");

const { OpenFrame, Spare, Strike } = require("./Frame");
jest.mock("./Frame");

const parsedFrames = ["x", "-", "13", "44", "x", "1/", "-/", "x", "1-", "x"];

describe("createFrames", () => {
  it("creates the correct number of frames", () => {
    expect(createFrames(parsedFrames)).toHaveLength(parsedFrames.length);
  });

  beforeEach(() => {
    OpenFrame.mockClear();
    Spare.mockClear();
    Strike.mockClear();
    createFrames(parsedFrames);
  });

  it("creates the correct number of openframes", () => {
    expect(OpenFrame).toHaveBeenCalledTimes(4);
  });

  it("creates the correct number of spares", () => {
    expect(Spare).toHaveBeenCalledTimes(2);
  });

  it("creates the correct number of strikes", () => {
    expect(Strike).toHaveBeenCalledTimes(4);
  });
});
