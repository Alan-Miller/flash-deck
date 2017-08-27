export function shuffle(deck) {
    let copy = [...deck];
    let shuffled = [];
    while(copy.length) {
        shuffled.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return shuffled;
}

export function buildDeck(cards) {
    // Reset position and display of cards and buttons
    const cardContainers = document.getElementsByClassName('card-container');
    [].forEach.call(cardContainers, (container, index) => {
        container.style.display = 'flex';
        container.classList.remove('flip');
        container.classList.remove('fade-in');
    });
    [].forEach.call(document.getElementsByClassName('answer'), container => {
        container.style.display = 'flex';
    });
    // Make array of all decks. Each is random but uniform length
    if (!cards.length) return;
    let deck = [];
    if (cards.length < 52) {
        while (deck.length < 52) {
            deck = deck.concat(shuffle(cards))
        }
    } 
    else deck = shuffle(cards).slice(0, 52);
    return deck;
}

