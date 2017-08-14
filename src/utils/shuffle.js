export function shuffle(deck) {
    let copy = [...deck];
    let shuffled = [];
    while(copy.length) {
        shuffled.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return shuffled;
}