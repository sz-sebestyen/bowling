const { framesMatcher } = require("./regex");

const MAX_GAMESTRING_LENGTH = 32;

exports.parseFrames = (gameString) => {
  const isTooLong = (str) => str.length > MAX_GAMESTRING_LENGTH;

  if (isTooLong(gameString)) {
    throw RangeError("The game is too long!");
  }

  const getFrames = (str) => {
    const matched = str.match(framesMatcher);

    if (!matched) {
      throw RangeError("A game must have 10 frames!");
    }

    const [_, ...frames] = matched;

    return frames;
  };

  return getFrames(gameString);
};
