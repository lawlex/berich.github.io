$(function() {
  
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
            var card;
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
        deck.shuffle();
        deck.shuffle();
        var delayInMilliseconds = 1000; //1 second
        var winnerstext = '';
        setTimeout(function() {
            var hands = [];
            deck.cards.forEach(function (card, i) {
                var z = i/4;
                var $el = card.$el;
                card.setSide('back');
                card.animateTo({
                    delay: 100 + i * 1, // wait 1 second + i * 2 ms
                    duration: 500,
                    ease: 'quartOut',

                    x: -window.innerWidth/2 + window.innerWidth / 8 - z,
                    y: -window.innerHeight/2 + window.innerHeight / 3 - z,
                    rot: 0,
                });
            });

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

                var P = Player();

                deck.cards.slice((total-2) - c*2,total - c*2).reverse().forEach(function(card, i){
                    
                    var _card = card;
                    var $el = _card.$el;
                    theta = alpha * (c+1);
                    
                    var pointx = Math.floor(Math.cos(theta)*window.innerWidth/4);
                    var pointy = Math.floor(Math.sin(theta)*window.innerHeight/4);

                    X = - 12.5 + pointx + 25 * _p; //(wndow.innerWidth/2 - 90*2) - 50 * _p;
                    Y = + (window.innerHeight/6) + pointy + 60; //- (window.innerHeight/6) + 120 * c ;
                    
                    _card.setSide('back');
                    _z += 1;
                    zIndex = total - 1 + _z;
                    $el.style.zIndex = zIndex;
                    _card.animateTo({
                        delay: 500 + (_p * 300) + 75 * c, // wait 1 second + i * 2 ms
                        duration: 500,
                        ease: 'quartOut',
                        x: X,
                        y: Y, 
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

                c += 1;

                
                P.setId('Player' + c);
                P.setHeader('Player ' + c);
                P.mount($container);
                P.moveto(X - 12.5, Y + 80, zIndex + 1);
                var hcard1 = HumanReadableCard(P.hand.cards[1]);
                var hcard2 = HumanReadableCard(P.hand.cards[0]);

                P.solvedhand = Hand.solve([hcard1.textCode, hcard2.textCode]);
                hands.push(P.solvedhand);
                P.handtext = hcard2.textCode + ', ' + hcard1.textCode;
                P.setText(P.handtext + ' - ' + P.solvedhand.name);
                //players.push(_hand);
            }
            while (c < count_players);
            var winners = Hand.winners(hands);
            hands.forEach(function(hand, i){
                winners.forEach(function(winner, k){
                    if (winner==hand) {
                        if (winnerstext=='') {
                            winnerstext = hand.toString().replace('10', 'T').replace('10', 'T');
                        } else {
                            winnerstext += '; ' + hand.toString().replace('10', 'T').replace('10', 'T');
                        }
                    }
                })
                
            });
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
                y: window.innerHeight/6+pointy,//Math.random() * window.innerHeight - window.innerHeight / 2
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