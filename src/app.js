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
import { createDeckElement } from './dom.js';
import { createDeck, shuffleDeck, dealDeck } from './util.js';

const zones = {
    stock: document.getElementById('stock'),
    foundations: document.getElementById('foundation'),
    piles: document.getElementById('pile'),
};


function start() {
    const deck = createDeck();

    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    console.log(deck);

    const { index, state } = dealDeck(deck);
    console.log(index, state);
    stateToBoard(state);
}
start();


/**
 * 
 * @param {import('./util.js').GameState} state 
 */
function stateToBoard(state) {
    zones.stock.replaceChildren(
        createDeckElement(state.stock),
        createDeckElement(state.waste),
    );
    zones.foundations
        .replaceChildren(...Object.values(state.foundations)
            .map(createDeckElement));
    zones.piles.replaceChildren(...state.piles.map(createDeckElement));

}
