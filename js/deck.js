$(function() {
    var _delay = 200;
    /* global Deck */

    var prefix = Deck.prefix;

    var transform = prefix('transform');

    var translate = Deck.translate;

    var $container = document.getElementById('container');

    /* holdem area */

    var count_players = 6; // ten max

    var delayInMilliseconds = 1000; //1 second
    
    var players = []; // ten max, push для добавления руки

    var P;
    var winnerplayers = [];

    var board = [];
    var T = Table();
    var TT;
    var _deck_x;
    var _deck_y;
    var _board_x = [];
    var _board_y = [];


    /* end holdem area */

    var $_footerbtngroup = $('#footerbtngroup');    
    // add buttons
    //$_footerbtngroup.append($_btnflip, $_btnshuffle, $_btnbysuit, $_btnfan, $_btnpoker, $_btnsort, $_btnholdem, $_btnellipse);
    $_footerbtngroup.append($_btnholdem);

    var deck = Deck();

    // Table
    var table = Table();
    
    table.placeWidth = Deck.Card(0).$el.offsetWidth + 25 + 20;
    table.placeHeight = Deck.Card(0).$el.offsetHeight + 25 + 20;
    
    //console.log( Deck.Card(0).$el.offsetWidth + ' - ' + Deck.Card(0).$el.offsetHeight);
    
    table.Calc();
    T = Table();
        
    T.Calc();

    TT = T.table_6max;
    // easter eggs start

    //var acesClicked = [];
    //var kingsClicked = [];

    deck.cards.forEach(function(card, i) {
        card.enableDragging();
        card.enableFlipping();

        card.$el.addEventListener('mousedown', onTouch);
        card.$el.addEventListener('touchstart', onTouch);

        function onTouch() {
            //var card;
                
            //console.log(card.$el.offsetWidth + ' x ' + card.$el.offsetHeight);
            //console.log(Deck.Card(i).$el.outerHTML);
            var HRCard = HumanReadableCard(Deck.Card(i));
            var colors = 'text-dark text-danger text-dark text-danger'.split(' ');
            var colors4 = 'text-dark text-danger text-success text-primary'.split(' ');
            
            $('#ranksuit').text(HRCard.humanRankSuit + ' ' + HRCard.textCode).removeClass('text-dark text-danger text-success text-primary').addClass(colors[HRCard.suit]);

/* example deck libray work */
/*
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
            */
        } // end onTouch
    }); // end forEach
/*
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
*/
    // easter eggs end


    $('#btnholdem').click(function() {
        players = []; // ten max, push для добавления руки
        winnerplayers = [];
    
        board = [];
        _board_x = [];
        _board_y = [];
        
        // get places
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

        deckshuffle( deck, _deck_x, _deck_y + 25 );

        var winnerstext = '';
        
        // holdem
        var hands = [];
        var total = deck.cards.length;
        
        var c = 0;

        // create players
        setTimeout(function() {

          do {
            
            var X, Y;
            var zIndex;
            var _p = 0;
            var _z = 1;
            var _x, _y;

            P = new Player();
                
            c += 1;
                
            TT.places.forEach( function(row, _numrow) {
              row.forEach( function(col, _numcol){
                if ( c.toString() == col ){
                  _y = _numrow * 140 - TT.height * 140 / 2 + 140 / 2;
                  _x = _numcol * 120 - TT.width * 120 / 2 + 120 / 2;
                }
              });
            });
                
            var itemsfrom = total - (c - 1) * 2;
            var itemsto = (total - 2) - (c - 1) * 2;
                
            deck.cards.slice(itemsto, itemsfrom).forEach( function(card, i) {
              X = _x + -12.5 + 25 *_p ;
              Y = _y ;
                    
              card.setSide('back');
              _z += 1;
              zIndex = total - 1 + _z;
              card.$el.style.zIndex = zIndex;
                    
              // card animate to
              cardAnimateTo(
                card,
                _delay + (_p * 50) + 75 * (c - 1),
                500,'quartOut',
                //X -_z/4,Y-_z/4,0,
                X,Y,0,
                'front'
              );
              // end card animate to
                    
              _p += 1;
                    
              P.hand.addCard(card);

            });
                
            P.setId('Player' + c);
            P.setHeader('Player ' + c);

            P.mount($container);
            P.moveto(X - 12.5, Y + 60, zIndex + 1);

            var hcard1 = HumanReadableCard(P.hand.cards[1]);
            var hcard2 = HumanReadableCard(P.hand.cards[0]);

            P.solvedhand = Hand.solve([hcard1.textCode, hcard2.textCode]);
            hands.push(P.solvedhand);
            P.handtext = hcard2.textCode + ', ' + hcard1.textCode;
            P.setText(P.handtext + ' - ' + P.solvedhand.name);
            players.push(P);
          } while (c < count_players);
          
        }, delayInMilliseconds);
        // end create players
        
        // flop
        setTimeout(function() {
          _z = 0;

          itemsfrom = total - count_players * 2;
          itemsto =   total - count_players * 2 - 3;
            
          deck.cards.slice( itemsto, itemsfrom ).reverse().forEach(function(card, i){

            X = _board_x[1] + 47.5 - 70 * 5 / 2 + 70 * i; 
            Y = _board_y[1] + 25;
                
            card.setSide('back');
            _z += 1;
            zIndex = total - 1 + _z;
            card.$el.style.zIndex = zIndex;
                
            // card animate to
            cardAnimateTo(
              card,
              _delay + (i * 50) + 75*_z,
              500,'quartOut',
              X - (total-_z)/4,
              Y - (total-_z)/4,
              0,
              'front'
            );
            // end card animate to
                
            var hcard = HumanReadableCard( card );
            board.push( hcard );
                
            //P.hand.addCard(_card);
          });

        }, delayInMilliseconds);
        // end flop
        
        // turn
        setTimeout(function() {

          itemsfrom = total - count_players * 2 - 3;
          itemsto =   total - count_players * 2 - 4;
            
          deck.cards.slice( itemsto, itemsfrom ).reverse().forEach(function(card, i){
            i = i + 3;
            X = _board_x[1] + 47.5 - 70 * 5 / 2 + 70 * i; 
            Y = _board_y[1] + 25 ;
                
            card.setSide('back');
            _z += 1;
            zIndex = total - 1 + _z;
            card.$el.style.zIndex = zIndex;
                
            // card animate to
            cardAnimateTo(
              card,
              _delay + (i * 50) + 75 * _z,
              500,'quartOut',
              X - (total-_z)/4,
              Y - (total-_z)/4,
              0,
              'front'
            );
            // end card animate to
                
            var hcard = HumanReadableCard( card );
            board.push( hcard );
                
            //P.hand.addCard(_card);
          });
            
        }, delayInMilliseconds);
        // end turn
        
        // river
        setTimeout(function() {

          itemsfrom = total - count_players * 2 - 4;
          itemsto =   total - count_players * 2 - 5;
            
          deck.cards.slice( itemsto, itemsfrom ).reverse().forEach(function(card, i){
            i = i + 4;
            X = _board_x[1] + 47.5 - 70 * 5 / 2 + 70 * i; 
            Y = _board_y[1] + 25 ;
                
            card.setSide('back');
            _z += 1;
            zIndex = total - 1 + _z;
            card.$el.style.zIndex = zIndex;
                
            // card animate to
            cardAnimateTo(
              card,
              _delay + (i * 50) + 75*_z,
              500,'quartOut',
              X - (total-_z)/4,
              Y - (total-_z)/4,
              0,
              'front'
            );
            // end card animate to
                
            var hcard = HumanReadableCard( card );
            board.push( hcard );
                
            //P.hand.addCard(_card);
          });
          
        }, delayInMilliseconds);
        // end river
        
        // get winners
        setTimeout(function() {
  
          hands = [];
          players.forEach( function( player, i ) {
            var c1 = HumanReadableCard(player.hand.cards[1]);
            var c2 = HumanReadableCard(player.hand.cards[0]);
            var c3 = board[0];
            var c4 = board[1];
            var c5 = board[2];
            var c6 = board[3];
            var c7 = board[4];
            var solvedhand = Hand.solve( [c1.textCode, c2.textCode, c3.textCode, c4.textCode, c5.textCode, c6.textCode, c7.textCode ]);
            player.handtext = c1.textCode + "," + c2.textCode + "," + c3.textCode + "," + c4.textCode + "," + c5.textCode + "," + c6.textCode + "," + c7.textCode
            player.setText( player.handtext ); //+ ':' + solvedhand.name );
            hands.push( solvedhand );
          });
            
          var winners = Hand.winners(hands);

          winnerstext = getWinnersText(hands);

          winnerplayers = []; // clear winners
            
          var Winners = prepare_players( players, board, winners );

          // highlight winners
          Winners.forEach( function( Winner, i ) {
            var playerId = Winner.getId();
            var el = $('div#'+playerId).removeClass('border-dark').addClass('border-primary');
            var el2 = $('div#smallcardheadercontainer'+playerId).removeClass('border-dark bg-dark').addClass('border-primary bg-primary');
          });

          $('#ranksuit').text(winnerstext).removeClass('text-dark text-danger text-success text-primary');
          
        }, delayInMilliseconds);
        // end get winners

    }); // end btnholdem

    // deck shuffle
    function deckshuffle(_deck, _x = 0, _y = 0) {
      _deck.shuffle( _x, _y + 25);
      _deck.shuffle( _x, _y + 25);
    }

    // card animate to
    function cardAnimateTo(card,delay,duration,ease,x,y,rot,side){
      card.animateTo({
          delay: delay, 
          duration: duration,
          ease: ease,
          x: x,
          y: y, 
          rot: rot,
          onStart: function onStart() {
              //
          },
          onComplete: function onComplete() {
              card.setSide(side);
          },
      });
    }

    // prepare winnerstext
    function getWinnersText( _hands ) {
        var _winners = Hand.winners( _hands );

        var _winnerstext = '';
        var _winnersname = '';

        _hands.forEach( function( hand, i ){
            _winners.forEach( function( winner, k ){
                if ( winner == hand ) {
                    if ( _winnersname == '' ) {
                        _winnersname = hand.name;
                    } else {
                        _winnersname += '; ' + hand.name;
                    }

                    if ( _winnerstext == '' ) {
                        _winnerstext = hand.toString().replace('10', 'T').replace('10', 'T').replace('10', 'T') + ' - ' + _winnersname;
                    } else {
                        _winnerstext += '; ' + hand.toString().replace('10', 'T').replace('10', 'T').replace('10', 'T') + ' - ' + _winnersname;
                    }
                }
            })
        });
        return _winnerstext;
    }

    function prepare_players(_players, _board, _winners) {
        var cnt = 0;
        var winnerplayers = [];
        _players.forEach(function(player,i){
            var _p = player;
            var cardpool = [];
            cardpool.push(HumanReadableCard(_p.hand.cards[1]).textCode);
            cardpool.push(HumanReadableCard(_p.hand.cards[0]).textCode);
            cardpool.push(_board[0].textCode);
            cardpool.push(_board[1].textCode);
            cardpool.push(_board[2].textCode);
            cardpool.push(_board[3].textCode);
            cardpool.push(_board[4].textCode);

            _winners.forEach( function( winner, k ) {
                var _w = winner;
                cnt = 0;
                _w.cardPool.forEach(function( _c, l ){
                    var _t = _c.value + _c.suit;
                    cardpool.forEach(function( _pc, m ){
                        if (_t.replace(/[^\w\s!?]/g,'') == _pc.replace(/[^\w\s!?]/g,'')) {
                            cnt += 1;
                        }
                    });
                });
              
                if (cnt == 7) winnerplayers.push(_p);
              
            });
            
        });
        if (cnt == 0) {
            var _ww = winners;
            var _pp = players;
            console.log('ERROR');
        
        }
        return winnerplayers;
    }
    
    // ---------------
    // example buttons
    // ---------------

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
// end example buttons
    deck.mount($container);

// messsages

// end messsages

    deck.intro();
    deck.sort();

  });