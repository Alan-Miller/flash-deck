import { shuffle } from '../utils/shuffle';

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

    // Make array of all decks passed in
    // Each deck is random but of uniform length
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    NOTE: Previously used below line to assign cards to all 
    passed in arguments (with no set parameter in function 
    declaration). But I think there will only ever be one argument: 
    an array. So I don't think we need to stitch arguments together.

    const cards = Array.from(arguments).reduce((a, b) => a.concat(b)); 
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
