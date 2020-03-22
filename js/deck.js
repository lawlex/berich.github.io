$(function() {
    var _delay = 200;
    /* global Deck */

    var prefix = Deck.prefix;

    var transform = prefix('transform');

    var translate = Deck.translate;

    var $container = document.getElementById('container');

    /* holdem area */
    var count_players = 6; // ten max
    var hand = []; // two cards, push для добавления карты
    var players = []; // ten max, push для добавления руки
    var flop = []; // three cards, push для добавления карты
    var turn; // one card, присвоение карты
    var river; // one card, присвоение карты
    /* end holdem area */

    var $_footerbtngroup = $('#footerbtngroup');    
    //$_footerbtngroup.append($_btnflip, $_btnshuffle, $_btnbysuit, $_btnfan, $_btnpoker, $_btnsort, $_btnexplode, $_btnholdem, $_btnellipse, $_btnrotate); //, $_btngrp);
    $_footerbtngroup.append($_btnflip, $_btnshuffle, $_btnbysuit, $_btnfan, $_btnpoker, $_btnsort, $_btnholdem, $_btnellipse); //, $_btngrp);


    var deck = Deck();

    var table = Table();
    
    table.placeWidth = Deck.Card(0).$el.offsetWidth + 25 + 20;
    table.placeHeight = Deck.Card(0).$el.offsetHeight + 25 + 20;
    
console.log( Deck.Card(0).$el.offsetWidth + ' - ' + Deck.Card(0).$el.offsetHeight);
    
   table.Calc();

/* Player tests */

/*
var P = Player();
P.mount($container);
P.moveto(0,100, 45);
P.setHeader('lawlex');
P.setText('The Best');
P.setWidth(140);
P.hand.addCard(Deck.Card(0));
P.hand.addCard(Deck.Card(1));

var hcard1 = HumanReadableCard(P.hand.cards[0]);
var hcard2 = HumanReadableCard(P.hand.cards[1]);

var hand1 = Hand.solve(['As', 'Ad']);


console.log(hcard1.textCode + ' ' + hcard2.textCode + ' - ' + hand1.name);

//console.log(document.getElementById('RealHero').outerHTML);
*/

/* end Player tests */


    // easter eggs start

    var acesClicked = [];
    var kingsClicked = [];

    deck.cards.forEach(function(card, i) {
        card.enableDragging();
        card.enableFlipping();

        card.$el.addEventListener('mousedown', onTouch);
        card.$el.addEventListener('touchstart', onTouch);

        function onTouch() {
            //var card;
                

    console.log(card.$el.offsetWidth + ' x ' + card.$el.offsetHeight);
            //console.log(Deck.Card(i).$el.outerHTML);
            var HRCard = HumanReadableCard(Deck.Card(i));
            var colors = 'text-dark text-danger text-dark text-danger'.split(' ');
            var colors4 = 'text-dark text-danger text-success text-primary'.split(' ');
            
            $('#ranksuit').text(HRCard.humanRankSuit + ' ' + HRCard.textCode).removeClass('text-dark text-danger text-success text-primary').addClass(colors[HRCard.suit]);

            if (i % 13 === 0) {
                acesClicked[i] = true;
                if (acesClicked.filter(function(ace) {
                        return ace;
                    }).length === 4) {
                    document.body.removeChild($topbar);
                    deck.$el.style.display = 'none';
                    setTimeout(function() {
                        startWinning();
                    }, 250)
                }
            } else if (i % 13 === 12) {
                if (!kingsClicked) {
                    return;
                }
                kingsClicked[i] = true;
                if (kingsClicked.filter(function(king) {
                        return king;
                    }).length === 4) {
                    for (var j = 0; j < 3; j++) {
                        card = Deck.Card(52 + j);
                        card.mount(deck.$el);
                        card.$el.style[transform] = 'scale(0)';
                        card.setSide('front');
                        card.enableDragging();
                        card.enableFlipping();
                        deck.cards.push(card);

                    }
                    deck.sort(true);
                    kingsClicked = false;
                }
            } else {
                acesClicked = [];
                if (kingsClicked) {
                    kingsClicked = [];
                }
            }
        } // end onTouch
    }); // end forEach

    function startWinning() {
        var $winningDeck = document.createElement('div');
        $winningDeck.classList.add('deck');

        $winningDeck.style[transform] = translate(Math.random() * window.innerWidth - window.innerWidth / 2 + 'px', Math.random() * window.innerHeight - window.innerHeight / 2 + 'px');

        $container.appendChild($winningDeck);

        var side = Math.floor(Math.random() * 2) ? 'front' : 'back';

        for (var i = 0; i < 55; i++) {
            addWinningCard($winningDeck, i, side);
        }

        setTimeout(startWinning, Math.round(Math.random() * 1000));
    } // end startWinning

    function addWinningCard($deck, i, side) {
        var card = Deck.Card(54 - i);
        var delay = (55 - i) * 20;
        var animationFrames = Deck.animationFrames;
        var ease = Deck.ease;

        card.enableFlipping();

        if (side === 'front') {
            card.setSide('front');
        } else {
            card.setSide('back');
        }

        card.mount($deck);
        card.$el.style.display = 'none';

        var xStart = 0;
        var yStart = 0;
        var xDiff = -500;
        var yDiff = 500;

        animationFrames(delay, 1000)
            .start(function() {
                card.x = 0;
                card.y = 0;
                card.$el.style.display = '';
            })
            .progress(function(t) {
                var tx = t;
                var ty = ease.cubicIn(t);
                card.x = xStart + xDiff * tx;
                card.y = yStart + yDiff * ty;
                card.$el.style[transform] = translate(card.x + 'px', card.y + 'px');
            })
            .end(function() {
                card.unmount();
            })
    } // end addWinningCard

    // easter eggs end
    // new buttons

    $('#btnshuffle').click(function() {
        // shuffle
        deck.shuffle();
        deck.shuffle();
    });

    $('#btnsort').click(function() {
        // sort
        deck.sort();
    });

    $('#btnbysuit').click(function() {
        // bysuit
        deck.sort(true); // sort reversed
        deck.bysuit();
    });

    $('#btnfan').click(function() {
        // fan
        deck.fan();
    });

    $('#btnflip').click(function() {
        // flip
        deck.flip();
    });

    $('#btnpoker').click(function() {
        // poker

        deck.queue(function(next) {
            deck.cards.forEach(function(card, i) {
                setTimeout(function() {
                    card.setSide('back');
                }, i * 7.5);
            })
            next();
        })
        deck.shuffle();
        deck.shuffle();
        deck.poker();
    });

    $('#btnexplode').click(function() {
        // explode
        deck.cards.forEach(function(card, i) {
            card.setSide('front')

            // explode
            card.animateTo({
                delay: 1000 + i * 2, // wait 1 second + i * 2 ms
                duration: 500,
                ease: 'quartOut',

                x: Math.random() * window.innerWidth / 2 - window.innerWidth / 4,
                y: Math.random() * window.innerHeight / 2 - window.innerHeight / 24
            })
        })
    });

    $('#btnholdem').click(function() {
        var players = [];
        var P;
        var winnerplayers = [];
        var cnt = 0;
        var board = [];
        var T = Table();
        T.Calc();
        var TT;
        TT = T.table_6max;
        var _deck_x;
        var _deck_y;
        var _board_x = [];
        var _board_y = [];
        
        TT.places.forEach( function(row, _numrow) {
            row.forEach( function(col, _numcol) {
                if ( col == "deck" ) {
                    _deck_x = _numcol * 120 - TT.width * 120/2 + 120/2;
                    _deck_y = _numrow * 140 - TT.height * 140/2 + 140/2;
                }
                if ( col == "board" ) {
                    _board_x.push( _numcol * 120 - TT.width * 120/2 + 120/2 );
                    _board_y.push( _numrow * 140 - TT.height * 140/2 + 140/2 );
                }
            });
        });

        deck.shuffle( _deck_x, _deck_y + 25);
        deck.shuffle( _deck_x, _deck_y + 25);
        var delayInMilliseconds = 1000; //1 second
        var winnerstext = '';
        var winnersname = '';
        
        setTimeout(function() {
            var hands = [];
            /*
            deck.cards.forEach(function (card, i) {
                var z = i/4;
                var $el = card.$el;
                card.setSide('back');
                card.animateTo({
                    delay: 100 + i * 1, // wait 1 second + i * 2 ms
                    duration: 500,
                    ease: 'quartOut',

                    x: _deck_x - z,//-window.innerWidth/2 + window.innerWidth / 8 - z,
                    y: _deck_y - z,//-window.innerHeight/2 + window.innerHeight / 6 - z,
                    rot: 0,
                });
            });
            */
            // holdem
            var c = 0;

            do {
                var _hand = [];
                var _p = 0;
                var _z = 1;
                var total = deck.cards.length;
                var alpha = Math.PI * 2 / count_players;
                var theta;
                var X, Y;
                var zIndex;

                P = new Player();
                
                c += 1;
                theta = alpha * (c);
                var _x, _y;
                TT.places.forEach( function(row, _numrow) {
                    row.forEach( function(col, _numcol){
                        //console.log(col);
                        if ( c.toString() == col ){
                            console.log( (_numrow * 140 - 140/2) + ' - ' + (_numcol * 120 - 120/2) );
                            _y = _numrow * 140 - TT.height*140/2+140/2;
                            _x = _numcol * 120 - TT.width*120/2+120/2;
                        }
                    });
                });

                deck.cards.slice((total-2) - (c-1)*2,total - (c-1)*2).forEach(function(card, i){
                    
                    var _card = card;
                    var $el = _card.$el;
                    
                    //var pointx = Math.floor(Math.cos(theta)*window.innerWidth/4);
                    //var pointy = Math.floor(Math.sin(theta)*window.innerHeight/4);

                    X = _x + -12.5 + 25 *_p ;//- 10*120/2;//- 12.5 + pointx + 25 * _p; //(wndow.innerWidth/2 - 90*2) - 50 * _p;
                    Y = _y ;//- 3*140/2;//- (window.innerHeight/10) + pointy + 60; //- (window.innerHeight/6) + 120 * c ;
                    
                    _card.setSide('back');
                    _z += 1;
                    zIndex = total - 1 + _z;
                    $el.style.zIndex = zIndex;
                    _card.animateTo({
                        delay: _delay + (_p * 50) + 75 * (c-1), // wait 1 second + i * 2 ms
                        duration: 500,
                        ease: 'quartOut',
                        x: X -_z/4,
                        y: Y -_z/4, 
                        rot: 0,
                        onStart: function onStart() {
                            //
                        },
                        onComplete: function onComplete() {
                            _card.setSide('front');
                        },
                    });
                    
                    _p += 1;
                    //_hand.push(_card);
                    P.hand.addCard(_card);

                });
                
                P.setId('Player' + c);
                console.log('ID:'+P.getId());
                //P.$id = 'Player' + c;
                P.setHeader('Player ' + c);
                P.mount($container);
                P.moveto(X - 12.5, Y + 60, zIndex + 1);

                var hcard1 = HumanReadableCard(P.hand.cards[1]);
                var hcard2 = HumanReadableCard(P.hand.cards[0]);

                P.solvedhand = Hand.solve([hcard1.textCode, hcard2.textCode]);
                hands.push(P.solvedhand);
                P.handtext = hcard2.textCode + ', ' + hcard1.textCode;
                P.setText(P.handtext + ' - ' + P.solvedhand.name);
                //players.push(_hand);
                players.push(P);
            }
            while (c < count_players);
            _z = 0;
            deck.cards.slice( total-count_players * 2 - 5, total - count_players * 2 ).reverse().forEach(function(card, i){
                var _card = card;
                var $el = _card.$el;

                X = + 27.5 - 70 *5 / 2 + 80 * i ; //47.5+ _board_x[1]  - 70 *5 / 2 + 70 * i ;//+ 15 - 70 *5 / 2 + 80 * i ;
                Y = _board_y[1]+25 ;//80;
                
                _card.setSide('back');
                _z += 1;
                zIndex = total - 1 + _z;
                $el.style.zIndex = zIndex;
                _card.animateTo({
                    delay: _delay + (i * 50) + 75*_z, // wait 1 second + i * 2 ms
                    duration: 500,
                    ease: 'quartOut',
                    x: X - (total-_z)/4,
                    y: Y - (total-_z)/4, 
                    rot: 0,
                    onStart: function onStart() {
                        //
                    },
                    onComplete: function onComplete() {
                        _card.setSide('front');
                    },
                });
                
                var hcard = HumanReadableCard( _card );
                board.push( hcard );
                
                //P.hand.addCard(_card);
            });
            hands = [];
            players.forEach( function( player, i ) {
                var h1 = HumanReadableCard(player.hand.cards[1]);
                var h2 = HumanReadableCard(player.hand.cards[0]);
                var h3 = board[0];
                var h4 = board[1];
                var h5 = board[2];
                var h6 = board[3];
                var h7 = board[4];
                var solvedhand = Hand.solve( [h1.textCode, h2.textCode, h3.textCode, h4.textCode, h5.textCode, h6.textCode, h7.textCode ]);
                player.handtext = h1.textCode + "," + h2.textCode + "," + h3.textCode + "," + h4.textCode + "," + h5.textCode + "," + h6.textCode + "," + h7.textCode
                player.setText( player.handtext );//+ ':' + solvedhand.name );
                hands.push( solvedhand );
            });
            /*
            P.solvedhand = Hand.solve([hcard1.textCode, hcard2.textCode]);
            hands.push(P.solvedhand);
            P.handtext = hcard2.textCode + ', ' + hcard1.textCode;
            P.setText(P.handtext + ' - ' + P.solvedhand.name);
        */
            var winners = Hand.winners(hands);

            hands.forEach(function(hand, i){
                winners.forEach(function(winner, k){
                    if (winner==hand) {
                        if (winnersname=='') {
                            winnersname = hand.name;
                        } else {
                            winnersname += '; ' + hand.name;
                        }

                        if (winnerstext=='') {
                            winnerstext = hand.toString().replace('10', 'T').replace('10', 'T').replace('1', 'A') + ' - ' + winnersname;
                        } else {
                            winnerstext += '; ' + hand.toString().replace('10', 'T').replace('10', 'T').replace('1', 'A') + ' - ' + winnersname;
                        }
                        
                    }
                })
                
            });

            winnerplayers = []; // clear winners
            
            if (winners.length > 1 ){
                console.log('WINNERS:'+winners.length);
                winners.forEach(function(w,i){
                    var h = '';
                    w.cardPool.forEach(function(c, k){
                        h += c.value+c.suit+",";
                    });
                    console.log('winner'+i+':'+h);
                });
            }

            players.forEach(function(player,i){
                var _p = player;
                var cardpool = [];
                cardpool.push(HumanReadableCard(_p.hand.cards[1]).textCode);
                cardpool.push(HumanReadableCard(_p.hand.cards[0]).textCode);
                cardpool.push(board[0].textCode);
                cardpool.push(board[1].textCode);
                cardpool.push(board[2].textCode);
                cardpool.push(board[3].textCode);
                cardpool.push(board[4].textCode);
                console.log('player'+i+':'+cardpool[0]+','+cardpool[1]+','+cardpool[2]+','+cardpool[3]+','+cardpool[4]+','+cardpool[5]+','+cardpool[6]+',');
                
                winners.forEach(function(winner,k){
                    var _w = winner;
                    cnt = 0;
                    _w.cardPool.forEach(function(_c,l){
                        var _t = _c.value + _c.suit;
                        cardpool.forEach(function(_pc,m){
                            if (_t.replace(/[^\w\s!?]/g,'') == _pc.replace(/[^\w\s!?]/g,'')) {
                                cnt += 1;
                                console.log('cnt: '+cnt+' ::: ' + _t + ' = ' + _pc);
                            } else {
                                console.log('winner card: ' + _t + ' != ' + _pc);
                            }
                        });
                    });
                    console.log('CNT:' + cnt);
                
                  
                   if (cnt == 7) {
                      var playerId = _p.getId();
                      var el = $('div#'+playerId).removeClass('border-dark').addClass('border-primary');
                      var el2 = $('div#smallcardheadercontainer'+playerId).removeClass('border-dark bg-dark').addClass('border-primary bg-primary');
                      winnerplayers.push(_p);
                      console.log(_p.getId() + ' - winner');
                  } else {
                      console.log(_p.getId() + ' - looser');
                  } 
                  
                });
                
                
            });
            if (cnt == 0) {
                var _ww = winners;
                var _pp = players;
                console.log('ERROR');
            }
            //winnerstext = winners.toString().replace('10', 'T').replace('10', 'T');
            $('#ranksuit').text(winnerstext).removeClass('text-dark text-danger text-success text-primary');
        }, delayInMilliseconds);
    });
    $('#btnellipse').click(function() {
        //deck.sort();

        var total = deck.cards.length + 1;
        var alpha = Math.PI * 2 / total;
        var rot = 360 / total;



        deck.cards.reverse().forEach(function (card, i) {
            var $el = card.$el;

            //card.setSide(i%2?'front':'back');
            card.setSide('front');
            //card.setSide('back');

            var theta = alpha * i;
            var pointx = Math.floor(Math.cos(theta)*window.innerWidth/4);
            var pointy = Math.floor(Math.sin(theta)*window.innerHeight/4)/1.25;

            // explode
            card.animateTo({
                delay: 400 + i * 75, // wait 1 second + i * 2 ms
                duration: 500,
                ease: 'quartOut',

                x: pointx,//Math.random() * window.innerWidth - window.innerWidth / 2,
                y: pointy,//Math.random() * window.innerHeight - window.innerHeight / 2
                rot: rot * i-60,
                onStart: function onStart() {
                    $el.style.zIndex = total - 1 + i;
                },
            });
        });
    });
    var rot = 0;
    $('#btnrotate').click(function() {
        // moveto
        //deck.moveto(false, -450, -50, 360);
        //deck.moveto(false, -450, 350, 720);
        //deck.moveto(false, 450, 350, 360);
        //deck.moveto(false, 450, -50, 0);
        //deck.moveto(false, 0, 0, 0);
        //if (rot==0) {
            rot = 180;
        //} else {
        //    rot = 0;
        //}
        deck.moveto(false, 0, 0, rot, -35);
        deck.moveto(false, 0, 0, -rot, 1);
    });

    deck.mount($container);

// messsages

// end messsages

    deck.intro();
    deck.sort();

  });