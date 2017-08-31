export const getRank = index => {
  index = index % 13;
  return ['A','2','3','4','5','6','7','8','9','10','J','Q','K'][index];
}


export function tallyPoints(currentIndex, sign) {
  // rank
  const rank = getRank(currentIndex);
  // points
  let points;
  if (+rank > 1 || rank < 11) points = +rank * sign;
  if (rank === 'J') { if (sign === 1) points = 1; else points = -25; }
  if (rank === 'Q') { if (sign === 1) points = 40; else points = -1; }
  if (rank === 'K') points = 50 * sign;
  if (rank === 'A') points = [1, 11][Math.floor(Math.random() * 2)] * sign;
  // points animation style
  let pointStyle = sign === 1 ? 'pointsUp' : 'pointsDown';
  return {points, pointStyle}
}