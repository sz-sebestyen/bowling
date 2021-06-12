const { OpenFrame, Strike, Spare } = require("./Frame");

describe("Frame", () => {
  describe("OpenFrame", () => {
    const frame = new OpenFrame(0, 0);

    it("has the given frame index", () => {
      expect(frame.getIndex()).toBe(0);
    });

    it("has two balls", () => {
      expect(frame.getBallIndices()).toEqual([0, 1]);
    });

    it("has no bonus balls", () => {
      expect(frame.getBonusIndices()).toEqual([]);
    });
  });

  describe("Spare", () => {
    const frame = new Spare(0, 0);

    it("has the given frame index", () => {
      expect(frame.getIndex()).toBe(0);
    });

    it("has two balls", () => {
      expect(frame.getBallIndices()).toEqual([0, 1]);
    });

    it("has one bonus ball", () => {
      expect(frame.getBonusIndices()).toEqual([2]);
    });
  });

  describe("Strike", () => {
    const frame = new Strike(0, 0);

    it("has the given frame index", () => {
      expect(frame.getIndex()).toBe(0);
    });

    it("has one ball", () => {
      expect(frame.getBallIndices()).toEqual([0]);
    });

    it("has two bonus balls", () => {
      expect(frame.getBonusIndices()).toEqual([1, 2]);
    });
  });
});
