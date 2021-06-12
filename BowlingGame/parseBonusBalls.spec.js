const { parseBonusBalls } = require("./parseBonusBalls");

describe("parseBonusBalls", () => {
  describe("when the last frame is open", () => {
    describe("with the correct number of bonus balls", () => {
      it("returns no bonus balls", () => {
        expect(parseBonusBalls("x x x x x x x x x 12")).toEqual([]);
      });
    });

    describe("with too many bonus balls", () => {
      it("throws RangeError", () => {
        expect(() => parseBonusBalls("x x x x x x x x x - 1")).toThrow(
          RangeError
        );
      });
    });
  });

  describe("when the last frame is spare", () => {
    describe("with the correct number of bonus balls", () => {
      it("returns one bonus ball", () => {
        expect(parseBonusBalls("x x x x x x x x x 1/ x")).toEqual(["x"]);
      });
    });

    describe("with too many bonus balls", () => {
      it("throws RangeError", () => {
        expect(() => parseBonusBalls("x x x x x x x x x 2/ 2 3")).toThrow(
          RangeError
        );
      });
    });

    describe("with too few bonus balls", () => {
      it("throws RangeError", () => {
        expect(() => parseBonusBalls("x x x x x x x x x 1/")).toThrow(
          RangeError
        );
      });
    });
  });

  describe("when the last frame is strike", () => {
    describe("with the correct number of bonus balls", () => {
      it("returns two bonus balls", () => {
        expect(parseBonusBalls("x x x x x x x x x x 2 3")).toEqual(["2", "3"]);
      });
    });

    describe("with too few bonus balls", () => {
      it("throws RangeError", () => {
        expect(() => parseBonusBalls("x x x x x x x x x x 2")).toThrow(
          RangeError
        );
      });
    });

    describe("with too many bonus balls", () => {
      it("throws RangeError", () => {
        expect(() => parseBonusBalls("x x x x x x x x x x 2 3 4")).toThrow(
          RangeError
        );
      });
    });

    describe("with no bonus balls", () => {
      it("throws RangeError", () => {
        expect(() => parseBonusBalls("x x x x x x x x x x")).toThrow(
          RangeError
        );
      });
    });
  });
});
