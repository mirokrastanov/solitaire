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

/** @type {import('./util.js').GameState} */
let state = null;
/** @type {import('./cards.js').Deck[]} */
let deckIndex = [];
let currentMove = null;

document.getElementById('board').addEventListener('click', onClick);

function start() {
    const deck = createDeck();

    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    console.log(deck);

    [deckIndex, state] = dealDeck(deck);
    console.log(deckIndex, state);
    deckIndex.forEach(deck => deck.moves = getMoves(deck));

    stateToBoard(state);
}
start();

/**
 * 
 * @param {import('./cards.js').Deck} deck 
 * @param {import('./cards.js').Card | import('./cards.js').Card[] | null} card 
 */
function getMoves(deck, cards) {
    return {
        flip: !cards && deck.canFlip(),
        take: !cards && deck.cards
            .map((_, i) => deck.canTake(i)).map((v, i) => v && i)
            .filter(v => v !== false),
        place: cards && deck.canPlace(cards),
    };
}

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

function onClick(e) {
    let deck = null;
    let card = null;
    if (e.target.classList.contains('deck')) {
        deck = e.target;
    } else if (e.target.classList.contains('card')) {
        card = e.target;
        deck = e.target.parentElement;
    } else if (e.target.classList.contains('back')) {
        deck = e.target.parentElement.parentElement;
    }

    if (deck != null) {
        const action = deck.dataset.action;
        const type = deck.dataset.type;
        let suit = '';
        let index = -1;
        let cardIndex = -1;
        let cards = undefined;

        if (type == 'foundations') {
            suit = deck.dataset.suit;
        } else if (type == 'piles') {
            index = Number(deck.dataset.index);
        }
        if (card != null) {
            cardIndex = Number(card.dataset.index);
        }

        switch (action) {
            case 'flip':
                if (type == 'stock') {
                    flipStock();
                } else if (type == 'piles') {
                    flipPile(index);
                }
                currentMove = null;
                break;
            case 'take':
                const tempDeck = findDeck(type, index, suit);
                cards = tempDeck.cards.slice(cardIndex);
                currentMove = {
                    source: tempDeck,
                    type,
                    index,
                    cardIndex,
                };
                break;
            case 'place':
                // TODO
                currentMove = null;
                break;
        }

        console.log(action, type, suit, index, cardIndex);
        console.log(currentMove);

        deckIndex.forEach(deck => deck.moves = getMoves(deck, cards));
        stateToBoard(state);
    }
}

function findDeck(type, index, suit) {
    let tempDeck = null;
    if (type == 'piles') {
        tempDeck = state[type][index];
    } else if (type == 'foundations') {
        tempDeck = state[type][suit];
    } else {
        tempDeck = state[type];
    }
    return tempDeck;
}

function flipStock() {
    if (state.stock.size == 0) {
        const cards = [...state.waste.cards];
        state.waste.cards.length = 0;
        cards.reverse();
        cards.forEach(c => c.faceUp = false);
        state.stock.cards.push(...cards);
    } else {
        state.stock.flip();
        const card = state.stock.cards.pop();
        state.waste.cards.push(card);
    }
}

function flipPile(index) {
    state.piles[index].flip();
}