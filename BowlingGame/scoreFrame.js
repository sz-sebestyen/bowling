exports.scoreFrame = (frame, balls) => {
  const allIndices = [...frame.ballIndices, ...frame.getBonusIndices()];

  return allIndices
    .map((ballIndex) => balls[ballIndex].score)
    .reduce((sum, curScore) => sum + curScore);
};
