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
import { createDeck, shuffleDeck, dealDeck } from './util.js';


function start() {
    
    const deck = createDeck();
    console.log(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    shuffleDeck(deck);
    console.log(deck);
    
    const state = dealDeck(deck);
    console.log(state);
}
start();
