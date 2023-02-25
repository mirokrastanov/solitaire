class Card {
    suit = null;
    face = null;

    constructor(suit, face, faceUp = false) {
        this.suit = suit;
        this.face = face;
        this.faceUp = faceUp;
    }
}

class Deck {
    /** @type {Card[]} */  // helps intelisense identify this as an array of items originating from class Card
    cards = [];

    /** @param {Card[]?} cards */  // same here
    constructor(cards) {
        this.cards = cards;
    }
    canFlip() {
        throw new TypeError('Cannot invoke abstract method');
    }
    canTake() {
        throw new TypeError('Cannot invoke abstract method');

    }

    /** @param {Card | Card[]} cards */  // Card or an array of Cards
    canPlace(cards) {
        throw new TypeError('Cannot invoke abstract method');

    }

    flip() {
        throw new TypeError('Cannot invoke abstract method');

    }
    take(index) {
        throw new TypeError('Cannot invoke abstract method');

    }
    place(cards) {
        throw new TypeError('Cannot invoke abstract method');

    }
}