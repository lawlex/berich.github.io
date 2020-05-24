$(document).ready(function() {
    /* this script works */
    /* you can type your code here */

    var noms = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    var nomsreverse = noms.reverse();
    var suits = ['h', 'c', 'd', 's'];
    var suitcolors = ['danger', 'success', 'primary', 'dark'];

    var fulldeck = [];

    $.each(suits, function(i, value) {
        $.each(nomsreverse, function(i2, value2) {
            fulldeck.push(value2 + value);
        })
    })

    var checkedbtn = '';
    var checkedbtnid = '';

    var table = {};

    var cardspool = {};

    // 'EE' - empty place
    // 'BB' - back
    var heroeshand = {
        'handcard1': 'Ah',
        'handcard2': 'As'
    };

    var UTGId = 'UTG';
    var UTGCardsLabel = 'UTG';
    var UTGCards = {
        'handcard1': 'BB',
        'handcard2': 'BB'
    }

    var UTG1Id = 'UTG1';
    var UTG1CardsLabel = 'UTG+1';
    var UTG1Cards = {
        'handcard1': 'BB',
        'handcard2': 'BB'
    }

    var COId = 'CO';
    var COCardsLabel = 'CO';
    var COCards = {
        'handcard1': 'BB',
        'handcard2': 'BB'
    }

    var BUId = 'BU';
    var BUCardsLabel = 'BU';
    var BUCards = {
        'handcard1': 'BB',
        'handcard2': 'BB'
    }

    var SBId = 'SB';
    var SBCardsLabel = 'SB';
    var SBCards = {
        'handcard1': 'BB',
        'handcard2': 'BB'
    }

    var BBId = 'BB';
    var BBCardsLabel = 'BB';
    var BBCards = {
        'handcard1': 'BB',
        'handcard2': 'BB'
    }

    var boardId = 'board';
    var boardCardsLabel = 'Board';
    var boardCards = {
        'flopcard1': 'Ad',
        'flopcard2': 'Ac',
        'flopcard3': '2h',
        'turncard': 'Kc',
        'rivercard': 'BB'
    }

    table.UTG = { id: UTGId, label: UTGCardsLabel, cards: UTGCards, html: {}, solvehand: {} };
    table.UTG1 = { id: UTG1Id, label: UTG1CardsLabel, cards: UTG1Cards, html: {}, solvehand: {} };
    table.CO = { id: COId, label: COCardsLabel, cards: COCards, html: {}, solvehand: {} };
    table.BU = { id: BUId, label: BUCardsLabel, cards: BUCards, html: {}, solvehand: {} };
    table.SB = { id: SBId, label: SBCardsLabel, cards: SBCards, html: {}, solvehand: {} };
    table.BB = { id: BBId, label: BBCardsLabel, cards: BBCards, html: {}, solvehand: {} };
    table.board = { id: boardId, label: boardCardsLabel, cards: boardCards, html: {}, solvehand: {} };

    /* common functions */

    // shuffle deck with Fisher Yates method
    function fisherYates(array) {
        var rnd, temp;

        for (var i = array.length - 1; i; i--) {
            rnd = Math.random() * i | 0;
            temp = array[i];
            array[i] = array[rnd];
            array[rnd] = temp;
        }

        return array;
    }

    // poker solver вынести в отдельную функцию
    function pokersolver() {
        $('#solverwrapper').empty();
        $.each(table, function(_key, _value) {
            var _arr = [];

            if (Object.keys(table[_key].cards).length == 2) {
                $.each(table[_key].cards, function(_key2, _value2) {
                    if (_value2 != 'BB' && _value2 != 'EE') {

                        _arr.push(_value2);
                    }
                });

                $.each(table.board.cards, function(_key2, _value2) {
                    if (_value2 != 'BB' && _value2 != 'EE') {

                        _arr.push(_value2);
                    }
                });
                table[_key].solvehand = Hand.solve(_arr);
                /*
                                $('#solverwrapper').append($('<div/>', {
                                    text: _key + ': ' + table[_key].solvehand.descr
                                }));
                */
            }

            /*
            $('#solverwrapper').append($('<div/>', {
                text: 'winner: ' + Hand.winners([table.UTG.solvehand, table.UTG1.solvehand]),
            }));*/
        }); // end poker solver
        var _hands = [];
        $.each(table, function(key, value) {
            if (Object.keys(table[key].cards).length == 2) {
                _hands.push(table[key].solvehand);
            }
        });
        var winners = Hand.winners(_hands);
        /*
                $('#solverwrapper').append($('<div/>', {
                    text: 'winners: ' + winners,
                }));
                console.log('');
        */
        $.each(table, function(key, value) {
            var winner = false;
            if (Object.keys(table[key].cards).length == 2) {
                winner = isWinner(winners, table[key].solvehand);
                $('#solverwrapper').append($('<div/>', {
                    'class': function() {
                        if (winner) { return 'text-success'; } else { return 'text-danger'; }
                    },
                    text: key + ': ' + table[key].solvehand.descr
                }));
                $('#' + key).removeClass('border-success border-danger border-width-3').addClass(function() { if (winner) { return 'border border-success border-width-3'; } else { return 'border border-danger border-width-3'; } });
                console.log(key + ': ' + isWinner(winners, table[key].solvehand));
            }
        });
    }

    function isWinner(winners, solvehand) {
        var winner = false;
        var solvehandlen = solvehand.cards.length;
        var _c = {};
        _c['c1'] = false;
        _c['c2'] = false;
        _c['c3'] = false;
        _c['c4'] = false;
        _c['c5'] = false;
        _c['c6'] = false;
        _c['c7'] = false;
        $.each(winners, function(i, _winner) {
            var winnerlen = _winner.cards.length;


            $.each(_winner.cards, function(i2, card) {
                $.each(solvehand.cards, function(i3, value) {
                    var v = value.rank + value.suit;
                    var c = card.rank + card.suit;
                    if (v == c) {
                        _c['c' + i3] = true;
                    }
                });
            });
            var cnt = 0;
            $.each(_c, function(key, value) {

                if (value) cnt++;
            })
            if (solvehandlen == winnerlen && solvehandlen == cnt) {
                winner = true;
            };
        });
        return winner;
    }
    // set playing card's html code
    function setplayingcard(_parent, _id, _nom, _suit, _class = 'card playing fullcolor') {
        var _noms = {
            'E': { 'id': 100, 'cls': 'emptyplace' },
            'B': { 'id': 200, 'cls': 'back' },
            '2': { 'id': 1, 'cls': 'rank-2' },
            '3': { 'id': 2, 'cls': 'rank-3' },
            '4': { 'id': 3, 'cls': 'rank-4' },
            '5': { 'id': 4, 'cls': 'rank-5' },
            '6': { 'id': 5, 'cls': 'rank-6' },
            '7': { 'id': 6, 'cls': 'rank-7' },
            '8': { 'id': 7, 'cls': 'rank-8' },
            '9': { 'id': 8, 'cls': 'rank-9' },
            'T': { 'id': 9, 'cls': 'rank-t' },
            'J': { 'id': 10, 'cls': 'rank-j' },
            'Q': { 'id': 11, 'cls': 'rank-q' },
            'K': { 'id': 12, 'cls': 'rank-k' },
            'A': { 'id': 13, 'cls': 'rank-a' },
        };
        var _suits = {
            'E': { 'id': 100, 'cls': '' },
            'B': { 'id': 200, 'cls': '' },
            'h': { 'id': 1, 'cls': 'suit-hearts' },
            'c': { 'id': 2, 'cls': 'suit-clubs' },
            'd': { 'id': 3, 'cls': 'suit-diams' },
            's': { 'id': 4, 'cls': 'suit-spades' },
        };

        return _parent.append($(
            '<div/>', {
                id: _id,
                'class': _class + ' ' + _noms[_nom].cls + ' ' + _suits[_suit].cls,
                append: $('<div/>', {
                    'class': 'card-body',
                }).append($('<div/>', {
                    'class': 'card-title',
                })).append($('<div/>', {
                    'class': 'card-text',
                })),
            }));
    };

    // create board
    function createboard(_wrapper_id, _container_id, _label = ' Board ') {
        $('#' + _wrapper_id).append($('<div/>', {
            'class': 'input-group mb-1',
            append: $('<div/>', {
                id: _container_id,
                'class': 'input-group-prepend',
            }),
        }));
        // board
        $('<div>', {
            'class': 'input-group-text',
            append: $('<div/>', {
                'class': 'btn-group btn-group-toggle',
                append: $('<button/>', {
                    'class': 'btn btn-dark cardsoptions',
                    id: 'btn' + _container_id,
                    text: 'Board',
                    css: { width: '80px' },
                    click: function() {
                        if (checkedbtn == _label) {
                            $(this).removeClass('checkedbtn');
                            checkedbtn = '';
                            checkedbtnid = '';
                        } else {
                            checkedbtn = _label;
                            checkedbtnid = 'btn' + _container_id;
                            $('.cardsoptions').removeClass('checkedbtn');
                            $(this).addClass('checkedbtn');
                        }
                    },
                }),
            }),
        }).appendTo('#' + _container_id);

        var _htmlboard = {};

        _htmlboard.flophtml = $('<div/>', {
            class: 'input-group-text',
        }).appendTo('#' + _container_id);
        _htmlboard.turnhtml = $('<div/>', {
            class: 'input-group-text',
        }).appendTo('#' + _container_id);
        _htmlboard.riverhtml = $('<div/>', {
            class: 'input-group-text',
        }).appendTo('#' + _container_id);
        return _htmlboard;
    };

    // create hand
    function createhand(_wrapper_id, _container_id, _label, _cls = '') {
        $('#' + _wrapper_id).append($('<div/>', {
            'class': 'input-group mb-1',
            append: $('<div/>', {
                id: _container_id,
                'class': 'input-group-prepend',
                css: { margin: '0 auto', 'max-width': '500px' },
            }),
        }));
        $('<div>', {
            'class': 'input-group-text',
            append: $('<div/>', {
                id: 'btn' + _container_id,
                'class': 'btn-group',
                append: $('<button/>', {
                    'class': 'btn btn-dark cardsoptions' + ' ' + _cls,
                    id: 'lbl' + _container_id,
                    click: function() {
                        if (checkedbtn == _label) {
                            $(this).removeClass('checkedbtn');
                            checkedbtn = '';
                            checkedbtnid = '';
                        } else {
                            checkedbtn = _label;
                            checkedbtnid = 'btn' + _container_id;
                            $('.cardsoptions').removeClass('checkedbtn');
                            $(this).addClass('checkedbtn');
                        }
                    },
                    css: { width: '80px' },
                    text: _label
                }),
            }),
        }).appendTo('#' + _container_id);
        return $('<div/>', {
            class: 'input-group-text',
        }).appendTo('#' + _container_id);
    };

    // set hand
    function sethand(_handhtml, _heroeshand, _html_id = '') {

        if (_html_id == '') {} else {
            _handhtml.empty();
        }
        $.each(_heroeshand, function(id, handcard) {
            setplayingcard(_handhtml, id, handcard[0], handcard[1]);
        });
    };

    // set board
    function setboard(_boardhtml, _boardcards, _html_id = '') {
        var flophtml = _boardhtml.flophtml;
        var turnhtml = _boardhtml.turnhtml;
        var riverhtml = _boardhtml.riverhtml;

        if (_html_id == '') {} else {
            flophtml.empty();
            turnhtml.empty();
            riverhtml.empty();
        }
        var x = 0;
        $.each(_boardcards, function(id, boardcard) {
            if (x < 3) {
                setplayingcard(flophtml, id, boardcard[0], boardcard[1]);
            } else if (x == 3) {
                setplayingcard(turnhtml, id, boardcard[0], boardcard[1]);
            } else {
                setplayingcard(riverhtml, id, boardcard[0], boardcard[1]);
            }
            x++;
        });
    };

    table['UTG'].html = createhand('utgwrapper', table['UTG'].id, table['UTG'].label);
    table['UTG1'].html = createhand('utg1wrapper', table['UTG1'].id, table['UTG1'].label);
    table['CO'].html = createhand('cowrapper', table['CO'].id, table['CO'].label);
    table['BU'].html = createhand('buwrapper', table['BU'].id, table['BU'].label);
    table['SB'].html = createhand('sbwrapper', table['SB'].id, table['SB'].label);
    table['BB'].html = createhand('bbwrapper', table['BB'].id, table['BB'].label);

    table['board'].html = createboard('boardwrapper', table['board'].id, table['board'].label);

    sethand(table['UTG'].html, table['UTG'].cards);
    sethand(table['UTG1'].html, table['UTG1'].cards);
    sethand(table['CO'].html, table['CO'].cards);
    sethand(table['BU'].html, table['BU'].cards);
    sethand(table['SB'].html, table['SB'].cards);
    sethand(table['BB'].html, table['BB'].cards);

    setboard(table['board'].html, table['board'].cards);



    function createdeck(deckwrapper_id, deckcontainer_id, table = {}, cls = 'btn-group-vertical') {
        $('<div/>', {
            'class': 'input-group mb-1',
            css: { margin: '0 auto', 'max-width': '600px' },
            append: $('<div/>', {
                'class': 'input-group-prepend',
                css: { margin: '0 auto', 'max-width': '600px' },
                append: $('<div/>', {
                    'class': 'input-group-text',
                    append: $('<div>', {
                        id: deckcontainer_id,
                        'class': cls,
                    })
                }).append($('<button/>', {
                    'class': 'btn btn-secondary ml-2',
                    text: '×',
                    css: { height: '100%', width: '40px', padding: '1px', margin: '1px' },
                    click: function() {
                        if (checkedbtnid == '') {
                            $.each(table, function(key, value) {
                                $.each(table[key].cards, function(key2, value2) {
                                    if (value2 in cardspool) {
                                        delete cardspool[value2];
                                        $('#btncard' + value2).removeClass('checkedbtn active border-warning');
                                    }
                                    table[key].cards[key2] = 'EE';
                                });
                            });

                            $('#deckbtngroup button').removeClass('checkedbtn active border-warning');
                            $('.card.playing').attr('class', 'card playing emptyplace');

                        } else {
                            var id = checkedbtnid.slice(3);
                            if (Object.keys(table[id].cards).length == 2) {
                                $.each(table[id].cards, function(key, value) {

                                    if (value in cardspool) {
                                        delete cardspool[value];
                                        $('#btncard' + value).removeClass('checkedbtn active border-warning');
                                    }
                                    table[id].cards[key] = 'EE';
                                })
                                sethand(table[id].html, { 'handcard1': 'EE', 'handcard2': 'EE' }, id);
                            } else {
                                $.each(table[id].cards, function(key, value) {
                                    if (value in cardspool) {
                                        delete cardspool[value];
                                        $('#btncard' + value).removeClass('checkedbtn active border-warning');
                                    }

                                    table[id].cards[key] = 'EE';
                                })
                                setboard(table.board.html, table.board.cards, id)
                            }
                        }
                        // poker solver
                        $('#solverwrapper').empty();
                        $.each(table, function(_key, _value) {
                            var _h = {};
                            if (Object.keys(table[_key].cards).length == 2) {
                                table[_key].solvehand = _h;
                            }
                        });
                        /*
                        // poker solver
                        $.each(table, function(_key, _value) {
                            var _h = {}

                            if (Object.keys(table[_key].cards).length == 2) {
                                $.each(table[_key].cards, function(_key2, _value2) {
                                    if (_value2 != 'BB' && _value2 != 'EE') {
                                        _h[_key2] = _value2;
                                    }
                                });

                                $.each(table.board.cards, function(_key2, _value2) {
                                    if (_value2 != 'BB' && _value2 != 'EE') {
                                        _h[_key2] = _value2;
                                    }
                                });
                            }
                            table[_key].solvehand = Hand.solve(_h.handcard1, _h.handcard2, _h.flopcard1, _h.flopcard2, _h.handcard3, _h.turncard1, _h.rivercard1);
                        }); // end poker solver
                        */
                        console.log('end click clear table');
                    },
                })),
            }),
        }).appendTo('#' + deckwrapper_id);

        var noms = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        var nomsreverse = noms.reverse();
        var suits = ['h', 'c', 'd', 's'];
        var suitcolors = ['danger', 'success', 'primary', 'dark'];

        $.each(suits, function(i, suit) {
            $('<div/>', {
                id: 'decksuit' + suit,
                'class': 'btn-group',
                css: { fontSize: '16px', margin: '1px', },
            }).appendTo('#' + deckcontainer_id);
            $.each(nomsreverse, function(k, nom) {
                $('<button/>', {
                    type: 'button',
                    'class': 'btn btn-' + suitcolors[i] + ' deck-btn d-flex align-items-center justify-content-center font-weight-bold',
                    text: nom + suit,
                    id: 'btncard' + nom + suit,
                    css: { fontSize: '14px' },
                    click: function() {
                        var _this = this;
                        var btncard = nom + suit;

                        if (checkedbtnid != '') {

                            var _id = checkedbtnid.slice(3);
                            $.each(table[_id].cards, function(_key, _value) {
                                if (_value == 'EE' || _value == 'BB') {
                                    var exist = btncard in cardspool;
                                    if (!exist) {
                                        table[_id].cards[_key] = nom + suit;
                                        cardspool[btncard] = _id;
                                        $(_this).toggleClass('active border-warning checkedbtn');
                                    }

                                }
                                if (Object.keys(table[_id].cards).length == 2) {
                                    sethand(table[_id].html, table[_id].cards, table[_id].id);
                                } else {
                                    setboard(table[_id].html, table[_id].cards, table[_id].id);
                                }


                            })


                        }
                        //$(this).html('Cool!');
                        pokersolver();
                        // poker solver
                        /*
                        $('#solverwrapper').empty();
                        $.each(table, function(_key, _value) {
                            var _arr = [];

                            if (Object.keys(table[_key].cards).length == 2) {
                                $.each(table[_key].cards, function(_key2, _value2) {
                                    if (_value2 != 'BB' && _value2 != 'EE') {

                                        _arr.push(_value2);
                                    }
                                });

                                $.each(table.board.cards, function(_key2, _value2) {
                                    if (_value2 != 'BB' && _value2 != 'EE') {

                                        _arr.push(_value2);
                                    }
                                });
                                table[_key].solvehand = Hand.solve(_arr);

                                $('#solverwrapper').append($('<div/>', {
                                    text: _key + ': ' + table[_key].solvehand.descr
                                }));
                            }

                        }); // end poker solver
                        */
                        console.log('end click btncard');
                    }
                }).appendTo('#decksuit' + suit);
            });
        });

    };

    var deckwrapper_id = 'deckwrapper';
    var deckcontainer_id = 'deckbtngroup';

    createdeck(deckwrapper_id, deckcontainer_id, table);

    $.each(table, function(key, value) {
        $.each(table[key].cards, function(key2, value2) {
            if (value2 != 'EE' && value2 != 'BB') {
                var exist = value2 in cardspool;

                if (!exist) {
                    cardspool[value2] = key;
                    $('#btncard' + value2).addClass('checkedbtn active border-warning');

                }
            }
        });

    });

    // poker solver
    pokersolver();
    /*
        $('#solverwrapper').empty();
        $.each(table, function(_key, _value) {
            var _arr = [];

            if (Object.keys(table[_key].cards).length == 2) {
                $.each(table[_key].cards, function(_key2, _value2) {
                    if (_value2 != 'BB' && _value2 != 'EE') {

                        _arr.push(_value2);
                    }
                });

                $.each(table.board.cards, function(_key2, _value2) {
                    if (_value2 != 'BB' && _value2 != 'EE') {

                        _arr.push(_value2);
                    }
                });

                table[_key].solvehand = Hand.solve(_arr);

                $('#solverwrapper').append($('<div/>', {
                    text: _key + ': ' + table[_key].solvehand.descr
                }));
            }

            //console.log(table[_key].solvehand.name);
        }); // end poker solver
    */
    //buttons
    $('#buttonswrapper').append($('<button/>', {
        'class': 'btn btn-success',
        text: 'Random',
        click: function() {
            cardspool = {};
            fulldeck = [];
            $.each(suits, function(i, value) {
                $.each(nomsreverse, function(i2, value2) {
                    fulldeck.push(value2 + value);
                })
            })

            // надо вынести в отдельную функцию очистки предыдущих значений ClearAll
            $('#deckbtngroup button').removeClass('checkedbtn active border-warning');

            var shuffleddeck = fisherYates(fulldeck).reverse();
            $.each(table, function(key, value) {
                $.each(table[key].cards, function(key2, value2) {
                    table[key].cards[key2] = shuffleddeck.pop();
                    cardspool[table[key].cards[key2]] = key;

                    $('#btncard' + table[key].cards[key2]).addClass('checkedbtn active border-warning');
                    console.log(table[key].cards[key2]);
                });
            });

            sethand(table['UTG'].html, table['UTG'].cards, table['UTG'].id);
            sethand(table['UTG1'].html, table['UTG1'].cards, table['UTG1'].id);
            sethand(table['CO'].html, table['CO'].cards, table['CO'].id);
            sethand(table['BU'].html, table['BU'].cards, table['BU'].id);
            sethand(table['SB'].html, table['SB'].cards, table['SB'].id);
            sethand(table['BB'].html, table['BB'].cards, table['BB'].id);

            setboard(table['board'].html, table['board'].cards, table['board'].id);


            // poker solver вынести в отдельную функцию
            pokersolver();
            /*
            $('#solverwrapper').empty();
            $.each(table, function(_key, _value) {
                var _arr = [];

                if (Object.keys(table[_key].cards).length == 2) {
                    $.each(table[_key].cards, function(_key2, _value2) {
                        if (_value2 != 'BB' && _value2 != 'EE') {

                            _arr.push(_value2);
                        }
                    });

                    $.each(table.board.cards, function(_key2, _value2) {
                        if (_value2 != 'BB' && _value2 != 'EE') {

                            _arr.push(_value2);
                        }
                    });
                    table[_key].solvehand = Hand.solve(_arr);

                    $('#solverwrapper').append($('<div/>', {
                        text: _key + ': ' + table[_key].solvehand.descr
                    }));
                }

            }); // end poker solver
            */
        },
    }));

});
/*
  
$('<a>',{
  text: 'Я конетейнер-ссылка',
  href: 'http://google.com',
  target: "_blank",
  css: {
    color: 'green',
    backgroundColor: 'black',
    display: 'block',
    position: 'relative',
    padding: '10px',
  },
  width: 200,
  height: 100,
  offset: {
    top: 20,
    left: 120,
  },
  on: {
    click: function(event){
      alert('click');
    },
    mouseover: function(event){
      alert('mouse');
      $(this).off('mouseover');
    }
  },
  append: $('<br>')
    .add($('<span>',{
      text: 'text',
      css:{fonweight: 'bold'}
    })),
})
.appendTo('#wrapper'); *
/.appendTo('#wrapper');
*/