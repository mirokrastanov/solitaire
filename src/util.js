import {
    faces,
    suits,
    colors,
    Card,
    Deck,
    Stock,
    Waste,
    Foundation,
    Pile,
} from './cards.js';

function createDeck() {
    const deck = new Deck();
    for (const suit of Object.values(suits)) {
        for (const face of Object.values(faces)) {
            deck.cards.push(new Card(suit, face));
        }
    }
    return deck;
}

/**
 * @param {Deck} deck 
 */
function shuffleDeck(deck) {
    const stock = [];

    while (deck.size > 0) {
        const card = deck.cards.splice(Math.random() * deck.size | 0, 1)[0];
        stock.push(card);
    }

    deck.cards.push(...stock);
}

export {
    createDeck,
    shuffleDeck,
}