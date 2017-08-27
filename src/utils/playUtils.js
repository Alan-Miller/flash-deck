export function tallyPts(sign, rank) {
    if (+rank > 1 || rank < 11) return +rank * sign;
    if (rank === 'J') { if (sign === 1) return 1; else return -25; }
    if (rank === 'Q') { if (sign === 1) return 40; else return -1; }
    if (rank === 'K') return 50 * sign;
    if (rank === 'A') return [1, 11][Math.floor(Math.random() * 2)] * sign;
}