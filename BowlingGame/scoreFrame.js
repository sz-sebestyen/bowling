exports.scoreFrame = (frame, balls) => {
  const allIndices = [...frame.getBallIndices(), ...frame.getBonusIndices()];

  return allIndices
    .map((ballIndex) => balls[ballIndex].score)
    .reduce((sum, curScore) => sum + curScore);
};
