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

/**
 * 
 * @param {Deck} deck
 * @returns {GameState} 
 */
function dealDeck(deck) {
    const state = {
        stock: new Stock(),
        waste: new Waste(),
        foundations: {
            [suits.Clubs]: new Foundation([], suits.Clubs),
            [suits.Diamonds]: new Foundation([], suits.Diamonds),
            [suits.Hearts]: new Foundation([], suits.Hearts),
            [suits.Spades]: new Foundation([], suits.Spades),
        },
        piles: [
            new Pile(),
            new Pile(),
            new Pile(),
            new Pile(),
            new Pile(),
            new Pile(),
            new Pile(),
        ],
    };
}

/**
 * @typedef {Object} GameState
 * @property {Stock} stock
 * @property {Waste} waste
 * @property {Object} foundations
 * @property {Foundation} foundations.clubs
 * @property {Foundation} foundations.diamonds
 * @property {Foundation} foundations.hearts
 * @property {Foundation} foundations.spades
 * @property {[Pile, Pile, Pile, Pile, Pile, Pile, Pile]} piles
 */


export {
    createDeck,
    shuffleDeck,
    dealDeck,
}