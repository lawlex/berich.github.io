'use strict';

var HumanReadableCard = function(card) {

    // Human-readable ranks and suits
    const ranks = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
    const suits = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');
    
    const colors4 = 'black red green blue'.split(' ');
    // Text codes of ranks and suits

    const ranks_codes = 'A 2 3 4 5 6 7 8 9 T J Q K'.split(' ');
    const suits_codes = 's h c d︎'.split(' ');
    // End Human-readable ranks and suits
// calculate rank/suit, etc..
    var rank = card.i % 13 + 1;
    var suit = card.i / 13 | 0;
    var z = (52 - card.i) / 4;

    // Human-readable rank and suit
    var rank_human = ranks[rank - 1];
    var suit_human = suits[suit];
    var color_human = suit % 2 ? 'red' : 'black';
    var color4 = colors4[suit];
    
    // text code
    var rank_code = ranks_codes[rank - 1];
    var suit_code = suits_codes[suit];
    var textcode = rank_code + suit_code;
    // End Human-readable ranks and suits
    
  var self = {card: card, i: card.i, rank: rank, suit: suit, pos: card.i, $el: card.$el, mount: card.mount, unmount: card.umount, setSide: card.setSide, textCode: textcode, colorHuman: color_human, humanRankSuit: rank_human+suit_human, color4: color4};
 
 
  return self;
}