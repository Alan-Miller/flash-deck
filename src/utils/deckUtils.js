export function shuffle(deck) {
  let copy = [...deck];
  let shuffled = [];
  while (copy.length) {
    shuffled.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return shuffled;
}

export function flipCard(index, currentCardIndex, reveal) {
  if (index < currentCardIndex || (index === currentCardIndex && reveal)) {
    return {transform: `rotateY(180deg)`};
  }
  else return {transform: `rotateY(360deg)`};
}


export function buildDeck(cards, playMode = false) {
  if (!cards.length) return;
  if (playMode) {
    let deck = [];
    if (cards.length < 52) while (deck.length < 52) deck = deck.concat(shuffle(cards));
    else deck = cards;
    return shuffle(deck).slice(0, 52);
  }
  else if (!playMode) return shuffle(cards);
}

