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
import { createDeck, shuffleDeck } from './util.js';

start();

function start() {
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
    console.log(state);
    const deck = createDeck();
    console.log(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    console.log(deck);
}
