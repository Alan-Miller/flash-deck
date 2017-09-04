export const getRank = index => {
  index = index % 13;
  return ['A','2','3','4','5','6','7','8','9','10','J','Q','K'][index];
}


export function tallyPoints(currentIndex, correct) {
  const multiplier = correct ? 1 : -1;

  // rank
  const rank = getRank(currentIndex);
  // points
  let points = 0;
  if (+rank > 1 || rank < 11) points = +rank * multiplier;
  if (rank === 'J') { if (correct) points = 1; else points = -25; }
  if (rank === 'Q') { if (correct) points = 40; else points = -1; }
  if (rank === 'K') points = 50 * multiplier;
  if (rank === 'A') points = [1, 11][Math.floor(Math.random() * 2)] * multiplier;
  // points animation style
  // const pointStyle = correct ? 'pointsUp' : 'pointsDown';
  return points;
}