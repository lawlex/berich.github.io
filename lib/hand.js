'use strict';

var Hand = function() {
  var cards = [];
  var self = {
    cards: cards,
    addCard: addCard,
    clearHand: clearHand
  };
  
  function addCard(card) {
    if (cards.length < 2) {
      cards.push(card);
      return self;
    }
  }

  function clearHand() {
    cards = []; 
    return self;
  }
  return self;
};
