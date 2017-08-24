export const getRank = index => {
    index = index % 13;
    return ['A','2','3','4','5','6','7','8','9','10','J','Q','K'][index];
}