$(document).ready(function() {
    /* this script works */
    /* you can type your code here */

    /*

    $.ajax({
      url: 'sometext.txt',
      dataType: 'text',
      
      success: function (data) {
        console.log(data);
      }
    });

    */

    var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    var ranksreverse = ranks.reverse();
    var suits = ['h', 'c', 'd', 's'];
    var suitcolors = ['danger', 'success', 'primary', 'dark'];

    var fulldeck = [];

    $.each(ranksreverse, function(i, value) {
        $.each(suits, function(i2, value2) {
            fulldeck.push(value2 + value);
        })
    })

    var checkedbtn = '';
    var checkedbtnid = '';

    var table = {};

    var cardspool = {};

    var handpairs = {};

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
    function getPairCode(handcard1, handcard2) {
        var code = '';
        var _ranks = {};
        var _suits = {};
        console.log('handcard1:' + handcard1 + ', handcard2:' + handcard2);
        $.each(ranksreverse, function(i, value) {
            _ranks[value] = i;
        });
        $.each(suits, function(i, value) {
            _suits[value] = i;
        })
        if (_ranks[handcard1[0]] == _ranks[handcard2[0]]) {
            code = handcard1[0] + handcard2[0];
        } else if (_suits[handcard1[1]] == _suits[handcard2[1]]) {
            if (_ranks[handcard1[0]] > _ranks[handcard2[0]]) {
                code = handcard2[0] + handcard1[0] + 's';
            } else {
                code = handcard1[0] + handcard2[0] + 's';
            }
        } else {
            if (_ranks[handcard1[0]] > _ranks[handcard2[0]]) {
                code = handcard2[0] + handcard1[0] + 'o';
            } else {
                code = handcard1[0] + handcard2[0] + 'o';
            }
        }
        return code;
    }

    var isMouseDown = false;
    var isBtnMouseDown = '';

    function isLeftButton(event) {
        var button = event.which ? event.which : event.button;
        return button < 2;
    }

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
    var pokersolveronchart = true;
    // poker solver
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
                var code = getPairCode(table[key].cards.handcard1, table[key].cards.handcard2);
                if (code != 'BB' && code != 'EE') {
                    var stat = {};
                    var count = { count: 1 };
                    stat[key] = count;
                    if (winner) {
                        if (pokersolveronchart) {

                            checkChartButton(code, key);
                            if ('result' in handpairs[code][key]) {
                                handpairs[code][key].result = handpairs[code][key].result + 1;
                            } else {
                                handpairs[code][key]['result'] = 1;
                            }
                        }
                    } else {
                        if (code in handpairs) {
                            if (key in handpairs[code]) {
                                if ('count' in handpairs[code][key]) {
                                    handpairs[code][key].Count = handpairs[code][key].count + 1;
                                } else {
                                    handpairs[code][key]['count'] = 1;
                                }
                            } else {

                                handpairs[code][key] = count;
                            }
                        } else {

                            handpairs[code] = stat;
                        }
                    }
                }
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
    function setplayingcard(_parent, _id, _rank, _suit, _class = 'card playing fullcolor') {
        var _ranks = {
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
                'class': _class + ' ' + _ranks[_rank].cls + ' ' + _suits[_suit].cls,
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

    // create html button
    function createhtmlbutton(_cls, _container_id, _label) {
        var btn = $('<button/>', {
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
        });
        return btn;
    }

    // create cards
    function createcards(_wrapper_id, _container_id) {

        $('#' + _wrapper_id).append($('<div/>', {
            'class': '',
            append: $('<div/>', {
                id: _container_id,
                'class': '',
            }),
        }));

        return $('<div/>', {
            class: '',
        }).appendTo('#' + _container_id);

    };

    // set cards
    function setcards(_handhtml, _cards, _html_id = '') {

        if (_html_id == '') {} else {
            _handhtml.empty();
        }
        $.each(_cards, function(id, card) {
            setplayingcard(_handhtml, id, card[0], card[1]);
        });
    };

    // create hand
    function createhand(_wrapper_id, _container_id, _label = '', _cls = '') {
        if (_label == '') {
            $('#' + _wrapper_id).append($('<div/>', {
                'class': 'input-group mb-1',
                append: $('<div/>', {
                    id: _container_id,
                    'class': 'input-group-prepend',
                }),
            }));
            return $('<div/>', {
                class: 'input-group-text',
            }).appendTo('#' + _container_id);
        } else {
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
                append: createhtmlbutton(_cls, _container_id, _label),
            }).appendTo('#' + _container_id);
            return $('<div/>', {
                class: 'input-group-text',
            }).appendTo('#' + _container_id);
        }
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
                                        $('.border-success').removeClass('border-success');
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

                        console.log('end click clear table');
                    },
                })),
            }),
        }).appendTo('#' + deckwrapper_id);

        var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        var ranksreverse = ranks.reverse();
        var suits = ['h', 'c', 'd', 's'];
        var suitcolors = ['danger', 'success', 'primary', 'dark'];

        $.each(suits, function(i, suit) {
            $('<div/>', {
                id: 'decksuit' + suit,
                'class': 'btn-group',
                css: { fontSize: '16px', margin: '1px', },
            }).appendTo('#' + deckcontainer_id);
            $.each(ranksreverse, function(k, rank) {
                $('<button/>', {
                    type: 'button',
                    'class': 'btn btn-' + suitcolors[i] + ' deck-btn d-flex align-items-center justify-content-center font-weight-bold',
                    text: rank + suit,
                    id: 'btncard' + rank + suit,
                    css: { fontSize: '14px' },
                    click: function() {
                        var _this = this;
                        var btncard = rank + suit;

                        if (checkedbtnid != '') {

                            var _id = checkedbtnid.slice(3);
                            $.each(table[_id].cards, function(_key, _value) {
                                if (_value == 'EE' || _value == 'BB') {
                                    var exist = btncard in cardspool;
                                    if (!exist) {
                                        table[_id].cards[_key] = rank + suit;
                                        cardspool[btncard] = _id;
                                        $(_this).toggleClass('active border-warning checkedbtn');
                                    }

                                }
                                if (Object.keys(table[_id].cards).length == 2) {
                                    console.log(table[_id].id + ': ' + getPairCode(table[_id].cards.handcard1, table[_id].cards.handcard2));
                                    sethand(table[_id].html, table[_id].cards, table[_id].id);
                                } else {
                                    setboard(table[_id].html, table[_id].cards, table[_id].id);
                                }


                            })


                        }
                        //$(this).html('Cool!');
                        pokersolver();

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

    //buttons
    $('#buttonswrapper').append($('<button/>', {
        'class': 'btn btn-success',
        text: 'Random',
        click: function() {
            cardspool = {};
            fulldeck = [];
            $.each(suits, function(i, value) {
                $.each(ranksreverse, function(i2, value2) {
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


            $.each(table, function(key, value) {


                if (Object.keys(table[key].cards).length == 2) {
                    var code = getPairCode(table[key].cards.handcard1, table[key].cards.handcard2);

                    console.log(key + ': ' + code);
                    if (!pokersolveronchart) checkChartButton(code, key);
                }

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
        },
    }));

    // chart
    function getChartBtnCode(rows, cols, row, col) {
        var code = '';
        var type = '';

        var char1 = rows[row];
        var char2 = cols[col];

        if (row > col) {
            code = char2 + char1 + 'o';
            type = 'outsuited';
        } else if (row < col) {
            code = char1 + char2 + 's';
            type = 'suited';
        } else {
            code = char1 + char2;
            type = 'pair';
        }
        return { code: code, type: type };
    }
    // toggle button
    function toggleChartButton(btn, src = 'manual') {
        if (btn in handpairs) { delete handpairs[btn] } else {
            var stat = {};
            var count = { count: 1 };
            stat[src] = count;
            handpairs[btn][src][count] = count;
        };
        $('#chartbtn' + btn).toggleClass('checked');
    }
    // check button
    function checkChartButton(btn, src = 'manual') {
        var stat = {};
        var count = { count: 1 };
        stat[src] = count;
        if (btn in handpairs) {
            if (src in handpairs[btn]) {
                if (count in handpairs[btn][src]) {
                    handpairs[btn][src].count = handpairs[btn][src].count + 1;
                } else {
                    handpairs[btn][src] = count;
                }
            } else {
                handpairs[btn][src] = count;
            }

        } else { handpairs[btn] = stat; };
        $('#chartbtn' + btn).addClass('checked');
    }
    // check button
    function uncheckChartButton(btn, src = 'manual') {
        if (btn in handpairs) {
            if (Object.keys(handpairs[btn]).length == 1) {
                delete handpairs[btn];
            } else {
                delete handpairs[btn][src];
            }
        } else {};
        $('#chartbtn' + btn).removeClass('checked');
    }

    //
    function uncheckAllChartButtons() {
        handpairs = {};
        $('.chart-btn').removeClass('checked');
    }

    // chart itself
    $('<div/>', {
        class: 'input-group mb-1',
        css: {
            'margin': '0px auto',
            'max-width': '600px',
        },
        append: $('<div/>', {
            class: 'input-group-prepend',
            css: {
                'margin': '0 auto',
                'max-width': '600px'
            },
            append: $('<div/>', {
                class: 'input-group-text',
                append: $('<div/>', {
                    id: 'chartbtngroup',
                    class: 'btn-group-vertical',

                }), // end chartbtngroup
            }).append($('<button/>', {
                class: 'btn btn-secondary ml-2',
                css: {
                    'height': '100%',
                    'width': '40px',
                    'padding': '1px',
                    'margin': '1px',
                },
                text: '×',
                click: function() {
                    uncheckAllChartButtons();
                }
            })), // end input-group-text
        }),
    }, ).appendTo($('#chartwrapper'));
    $.each(ranksreverse, function(i, _rank) {
        $('#chartbtngroup').append($('<div/>', { //создать в цикле
                id: 'chartrow' + _rank,
                class: 'btn-group',
                css: {
                    'font-size': '16px',
                    'margin': '0px',
                },

            }) // end chartrowA)
        )
        $.each(ranksreverse, function(i2, _rank2) {
            $('#chartrow' + _rank).append(
                $('<button/>', { // создать в цикле
                    id: 'chartbtn' + getChartBtnCode(ranksreverse, ranksreverse, i, i2).code,
                    class: 'btn btn-light border border-secondary chart-btn d-flex align-items-center justify-content-center font-weight-bold' + ' ' + getChartBtnCode(ranksreverse, ranksreverse, i, i2).type,
                    text: getChartBtnCode(ranksreverse, ranksreverse, i, i2).code,
                    click: function() {

                        toggleChartButton(getChartBtnCode(ranksreverse, ranksreverse, i, i2).code);


                    },
                    mousedown: function(event) {
                        if (isLeftButton(event)) {
                            isMouseDown = true;
                            isBtnMouseDown = getChartBtnCode(ranksreverse, ranksreverse, i, i2).code;

                        }
                    },
                    mouseout: function(event) {
                        if (isMouseDown) {
                            if (isBtnMouseDown == getChartBtnCode(ranksreverse, ranksreverse, i, i2).code) {
                                toggleChartButton(isBtnMouseDown);
                            }
                        }
                    },
                    mouseup: function(event) {
                        if (isLeftButton(event))
                            isMouseDown = false;
                    },
                    mouseover: function(event) {
                        if (isMouseDown) {
                            toggleChartButton(getChartBtnCode(ranksreverse, ranksreverse, i, i2).code);
                        }
                    },
                }) // end chartbtnAA
            );
        })


    });

    /*
     *
     * LOAD HAND HISTORY FILE
     * 
     */
    (function($) {
        // Add click event handler to button
        $('#load-file').click(function() {
            var hands = [];
            var hand = [];
            if (!window.FileReader) {
                return alert('FileReader API is not supported by your browser.');
            }
            var $i = $('#file'),
                input = $i[0];
            if (input.files && input.files[0]) {
                file = input.files[0];
                fr = new FileReader();
                fr.onload = function() {
                    var lines = fr.result.split("\n");
                    var numLines = lines.length;

                    var i = 0;
                    do {
                        if (lines[i].indexOf('Hand #') >= 0) {
                            if (hand.length > 0) hands.push(hand);
                            hand = [];
                            hand.push(lines[i]);
                        } else if (lines[i].length != 0) {
                            hand.push(lines[i]);
                        }
                        i++;
                    }
                    while (i != numLines);

                    $.each(hands, function(i2, hand) {
                        var jHand = {};
                        var isBlinds = false;
                        var isPreflop = false;
                        var isFlop = false;
                        var isTurn = false;
                        var isRiver = false;
                        var isShowDown = false;
                        var isSummary = false;
                        var players = {};
                        var blinds = {};

                        $.each(hand, function(i3, line) {


                            if (line.indexOf('Hand #') >= 0) {
                                // section
                                isBlinds = true;
                                isPreflop = false;
                                isFlop = false;
                                isTurn = false;
                                isRiver = false;
                                isShowDown = false;
                                isSummary = false;
                                blinds = {}; // sets blinds to null
                                players = {}; // sets players to null

                                // parsing 1st line
                                var len = line.length;
                                var div1 = line.indexOf(':');
                                var div2 = line.indexOf('-');
                                var title = line.substring(0, div1).trim();
                                var gametype = line.substring(div1 + 1, div2).trim();
                                var timestamp = line.slice(div2 + 1).trim();

                                //"2020/04/30 5:16:54 MSK [2020/04/29 22:16:54 ET]"

                                var timestring = timestamp.substring(0, timestamp.indexOf(' ', timestamp.indexOf(' ')));
                                var time = Date.parse(timestring);
                                jHand['title'] = title;
                                jHand['type'] = gametype;
                                jHand['timestamp'] = timestamp;
                                jHand['time'] = new Date(time);
                                $('#file-content').append($('<div/>').html('<span class="text-primary font-weight-bold">' + title + '</span>' + ' <span class="text-primary">' + gametype + '</span>' + ' <span>' + jHand['time'].toDateString() + '</span>'));
                            } else if (line.indexOf('*** HOLE CARDS ***') >= 0) {
                                // section
                                isBlinds = false;
                                isPreflop = true;
                                isFlop = false;
                                isTurn = false;
                                isRiver = false;
                                isShowDown = false;
                                isSummary = false;
                                $('#file-content').append($('<div/>').html('<span class="font-weight-bold"> PREFLOP </span>'));
                            } else if (line.indexOf('*** FLOP ***') >= 0) {
                                // section
                                isBlinds = false;
                                isPreflop = false;
                                isFlop = true;
                                isTurn = false;
                                isRiver = false;
                                isShowDown = false;
                                isSummary = false;

                                var br1 = line.indexOf('[');
                                var br2 = line.indexOf(']');
                                var str = line.substring(br1 + 1, br2);

                                var arr = str.split(' ');
                                jHand['flopcards'] = arr;

                                $('#file-content').append($('<div/>').html('<span class="font-weight-bold"> FLOP: </span> <span class="font-weight-bold text-success">' + str + '</span>'));

                                $('#file-content').append($('<div/>', { id: 'flopcardswrapper' + i2 }));
                                var flopcards = { flopcard1: jHand['flopcards'][0], flopcard2: jHand['flopcards'][1], flopcard3: jHand['flopcards'][2] };
                                var cardshtml = createcards('flopcardswrapper' + i2, 'flopcards' + i2);
                                setcards(cardshtml, flopcards);


                            } else if (line.indexOf('*** TURN ***') >= 0) {
                                // section
                                isBlinds = false;
                                isPreflop = false;
                                isFlop = false;
                                isTurn = true;
                                isRiver = false;
                                isShowDown = false;
                                isSummary = false;

                                var br1 = line.indexOf('[');
                                var br2 = line.indexOf(']');
                                var br3 = line.indexOf('[', br2 + 1);
                                var br4 = line.indexOf(']', br2 + 1);
                                var str = line.substring(br1 + 1, br2);
                                var str2 = line.substring(br3 + 1, br4);
                                var arr = str.split(' ');
                                jHand['turncard'] = str2;
                                arr.push(str2);

                                $('#file-content').append($('<div/>').html('<span class="font-weight-bold"> TURN: </span> <span class="font-weight-bold text-success">' + str + ' ' + str2 + '</span>'));

                                $('#file-content').append($('<div/>', { id: 'turncardswrapper' + i2 }));
                                var turncards = { turncard1: jHand['flopcards'][0], turncard2: jHand['flopcards'][1], turncard3: jHand['flopcards'][2], turncard4: jHand['turncard'] };
                                var cardshtml = createcards('turncardswrapper' + i2, 'turncards' + i2);
                                setcards(cardshtml, turncards);

                            } else if (line.indexOf('*** RIVER ***') >= 0) {
                                // section
                                isBlinds = false;
                                isPreflop = false;
                                isFlop = false;
                                isTurn = false;
                                isRiver = true;
                                isShowDown = false;
                                isSummary = false;
                                var br1 = line.indexOf('[');
                                var br2 = line.indexOf(']');
                                var br3 = line.indexOf('[', br2 + 1);
                                var br4 = line.indexOf(']', br2 + 1);
                                var str = line.substring(br1 + 1, br2);
                                var str2 = line.substring(br3 + 1, br4);
                                var arr = str.split(' ');
                                jHand['rivercard'] = str2;
                                arr.push(str2);

                                $('#file-content').append($('<div/>').html('<span class="font-weight-bold"> RIVER: </span> <span class="font-weight-bold text-success">' + str + ' ' + str2 + '</span>'));


                                $('#file-content').append($('<div/>', { id: 'rivercardswrapper' + i2 }));
                                var rivercards = { rivercard1: jHand['flopcards'][0], rivercard2: jHand['flopcards'][1], rivercard3: jHand['flopcards'][2], rivercard4: jHand['turncard'], rivercard5: jHand['rivercard'] };
                                var cardshtml = createcards('rivercardswrapper' + i2, 'rivercards' + i2);
                                setcards(cardshtml, rivercards);
                            } else if (line.indexOf('*** SHOW DOWN ***') >= 0) {
                                // section
                                isBlinds = false;
                                isPreflop = false;
                                isFlop = false;
                                isTurn = false;
                                isRiver = false;
                                isShowDown = true;
                                isSummary = false;
                                $('#file-content').append($('<div/>').html('<span class="font-weight-bold"> SHOWDOWN </span>'));
                            } else if (line.indexOf('*** SUMMARY ***') >= 0) {
                                // section
                                isBlinds = false;
                                isPreflop = false;
                                isFlop = false;
                                isTurn = false;
                                isRiver = false;
                                isShowDown = false;
                                isSummary = true;
                                $('#file-content').append($('<div/>').html('<span class="font-weight-bold"> SUMMARY </span>'));
                            } else {
                                if (line.indexOf('Table') >= 0) {
                                    // parsing 2nd line
                                    // Table 'Aconcagua' 6-max Seat #6 is the button
                                    var div1 = line.indexOf(' ');
                                    var div2 = line.indexOf('\'');
                                    var div3 = line.indexOf('\'', line.indexOf('\''));
                                    var div4 = line.indexOf('(');
                                    var div5 = line.indexOf(')');
                                    var div6 = line.indexOf('Seat #');
                                    var div7 = line.indexOf(' ', line.indexOf('Seat #') + 6);
                                    jHand['table'] = line.substring(div1, div6).trim();
                                    jHand['moneytype'] = line.substring(div4 + 1, div5);
                                    jHand['button'] = line.substring(div6 + 6, div7);
                                    $('#file-content').append($('<div/>').html('Table ' + jHand['table'] + ' ' + ' Seat №' + jHand['button'] + ' is the button'));
                                } else if (line.indexOf('Seat ') >= 0 && line.indexOf(':') >= 0 && isBlinds) {
                                    // Seats
                                    var div1 = line.indexOf(' ');
                                    var div2 = line.indexOf(':');
                                    var br1 = line.indexOf('(');
                                    var br2 = line.indexOf(')');
                                    var div3 = line.indexOf('in', br1 + 1);
                                    var seatNum = line.substring(div1 + 1, div2).trim();
                                    var nickname = line.substring(div2 + 2, br1).trim();
                                    var stack = line.substring(br1 + 1, div3).trim();

                                    $('#file-content').append($('<div/>').html('Seat №' + seatNum + ': ' + nickname + ', stack: ' + stack + ''));
                                } else if (line.indexOf('posts') >= 0 && line.indexOf(':') >= 0 && isBlinds) {
                                    // Blinds
                                    var div1 = line.indexOf(':');
                                    var div2 = line.indexOf('posts');
                                    var div3 = line.indexOf('blind');
                                    var nickname = line.substring(0, div1).trim();
                                    var type = line.substring(div2 + 6, div3).trim();
                                    var sum = line.slice(line.indexOf(' ', div3 + 5)).trim();
                                    var blind = { type: type, sum: sum };
                                    blinds['nickname'] = blind;
                                    $('#file-content').append($('<div/>').html(nickname + ': <span class="font-weight-bold">' + type + '</span> - ' + sum + ''));
                                } else if (line.indexOf('sit') >= 0 && line.indexOf('out') >= 0 && isBlinds) {
                                    // sit out
                                    $('#file-content').append($('<div/>').html('<span class="text-secondary font-weight-lighter">' + line + '</span>'));

                                    /* 
                                     * SECTIONS PREFLOP, FLOP, TURN, RIVER, SHOWDOWN SUMMARY
                                     *
                                     */
                                } else if (line.indexOf('Dealt to') >= 0) {

                                    if (isPreflop) {
                                        // dealt to
                                        var div1 = line.indexOf(' ', 7);
                                        var div2 = line.indexOf(' ', div1 + 1);
                                        var br1 = line.indexOf('[');
                                        var br2 = line.indexOf(']');
                                        var nickname = line.substring(div1, div2);
                                        var cards = line.substring(br1 + 1, br2);
                                        jHand['cards'] = cards.split(' ');
                                        var _dev_cls = '';
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ' takes </span><span class="text-danger font-weight-bold">' + cards + '</span>'));
                                        $('#file-content').append($('<div/>', { id: 'preflopcardswrapper' + i2 }));
                                        var handcards = { handcard1: jHand['cards'][0], handcard2: jHand['cards'][1] };
                                        var cardshtml = createcards('preflopcardswrapper' + i2, 'handcards' + i2);
                                        setcards(cardshtml, handcards);
                                    }
                                    // end dealt to
                                } else if (line.indexOf(':') >= 0) {
                                    // actions
                                    if (isPreflop) {
                                        var div = line.indexOf(':');
                                        var nickname = line.substring(0, div);
                                        var action = line.slice(div + 1);
                                        var isfolded = false;
                                        var ischecked = false;
                                        var iscalled = false;
                                        var israised = false;
                                        var _dev_cls = 'bg-info';
                                        if (line.indexOf('folds') >= 0) {
                                            isfolded = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('checks') >= 0) {
                                            ischecked = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('calls') >= 0) {
                                            iscalled = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('raises') >= 0) {
                                            israised = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('doesn\'t show hand') >= 0) {
                                            // doesn't show
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else {
                                            $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                        }
                                    }

                                    if (isFlop) {
                                        var div = line.indexOf(':');
                                        var nickname = line.substring(0, div);
                                        var action = line.slice(div + 1);
                                        var isfolded = false;
                                        var ischecked = false;
                                        var iscalled = false;
                                        var isbetted = false;
                                        var israised = false;
                                        var _dev_cls = 'bg-info';
                                        if (line.indexOf('folds') >= 0) {
                                            isfolded = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('checks') >= 0) {
                                            ischecked = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('calls') >= 0) {
                                            iscalled = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('bets') >= 0) {
                                            isbetted = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('raises') >= 0) {
                                            israised = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('doesn\'t show hand') >= 0) {
                                            // doesn't show
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else {
                                            $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                        }
                                    }

                                    if (isTurn) {
                                        var div = line.indexOf(':');
                                        var nickname = line.substring(0, div);
                                        var action = line.slice(div + 1);
                                        var isfolded = false;
                                        var ischecked = false;
                                        var iscalled = false;
                                        var isbetted = false;
                                        var israised = false;
                                        var _dev_cls = 'bg-info';
                                        if (line.indexOf('folds') >= 0) {
                                            isfolded = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('checks') >= 0) {
                                            ischecked = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('calls') >= 0) {
                                            iscalled = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('bets') >= 0) {
                                            isbetted = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('raises') >= 0) {
                                            israised = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('doesn\'t show hand') >= 0) {
                                            // doesn't show
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else {
                                            $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                        }
                                    }
                                    if (isRiver) {
                                        var div = line.indexOf(':');
                                        var nickname = line.substring(0, div);
                                        var action = line.slice(div + 1);
                                        var isfolded = false;
                                        var ischecked = false;
                                        var iscalled = false;
                                        var isbetted = false;
                                        var israised = false;
                                        var _dev_cls = 'bg-info';
                                        if (line.indexOf('folds') >= 0) {
                                            isfolded = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('checks') >= 0) {
                                            ischecked = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('calls') >= 0) {
                                            iscalled = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('bets') >= 0) {
                                            isbetted = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('raises') >= 0) {
                                            israised = true;
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else if (line.indexOf('doesn\'t show hand') >= 0) {
                                            // doesn't show
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' - <span>' + action + '</span>'));
                                        } else {
                                            $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                        }
                                    }
                                    if (isShowDown) {
                                        var div = line.indexOf(':');
                                        var nickname = line.substring(0, div);
                                        var action = line.slice(div + 1);
                                        var br1 = line.indexOf('[');
                                        var br2 = line.indexOf(']');
                                        var str = line.substring(br1 + 1, br2);
                                        var arr = str.split(' ');
                                        var br3 = line.indexOf('(');
                                        var br4 = line.indexOf(')');
                                        var str2 = line.substring(br3 + 1, br4);

                                        var _dev_cls = 'bg-info';
                                        if (line.indexOf('shows') >= 0) {

                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + nickname + ': </span>' + ' <span> - ' + str + '</span>' + ' <span> (' + str2 + ')</span>'));

                                            $('#file-content').append($('<div/>', { id: 'showscardswrapper' + nickname + i2 }));
                                            var handcards = { handard1: arr[0], handcard2: arr[1] };
                                            var cardshtml = createcards('showscardswrapper' + nickname + i2, 'handcards' + nickname + i2);
                                            setcards(cardshtml, handcards);

                                        } else {
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                        }


                                    }
                                    if (isSummary) {

                                        var place = '';
                                        if (line.indexOf('(button)') >= 0) {
                                            place = 'BTN';
                                            line = line.replace('(button)', '');
                                        }
                                        if (line.indexOf('(big blind)') >= 0) {
                                            place = 'BB';
                                            line = line.replace('(big blind)', '');
                                        }
                                        if (line.indexOf('(small blind)') >= 0) {
                                            place = 'SB';
                                            line = line.replace('(small blind)', '');
                                        }
                                        var div = line.indexOf(':');
                                        var sitname = line.substring(0, div);

                                        var spc2 = line.indexOf(' ', div + 1);
                                        var spc3 = line.indexOf(' ', spc2 + 1);
                                        var nickname = line.substring(spc2, spc3);
                                        var action = line.slice(div + 1);
                                        var br1 = line.indexOf('[');
                                        var br2 = line.indexOf(']');
                                        var str = line.substring(br1 + 1, br2);
                                        var arr = str.split(' ');
                                        var br3 = line.indexOf('(');
                                        var br4 = line.indexOf(')');
                                        var str2 = line.substring(br3 + 1, br4);

                                        var _dev_cls = 'bg-info';



                                        if (line.indexOf('showed') >= 0) {
                                            // Seat 6: SportageIII showed [Ah Tc] and won ($0.63) with a pair of Aces
                                            // Seat 5: thesaltypup (big blind) showed [Ac 4c] and lost with a pair of Ace
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span> <span class="' + _dev_cls + '">' + sitname + '</span><span class="bg-success">' + place + '</span> <span class="bg-warning">' + nickname + '</span>'));

                                            var _id = 'summarycardswrapper' + sitname.replace(' ', '_') + '_' + i2;
                                            var _id2 = 'summaryhandcards' + sitname.replace(' ', '_') + '_' + i2;

                                            $('#file-content').append($('<div/>', { id: _id }));
                                            var handcards = { handcard1: arr[0], handcard2: arr[1] };
                                            var cardshtml = createcards(_id, _id2);
                                            setcards(cardshtml, handcards);
                                            console.log('showed');
                                        } else {
                                            $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span><span class="bg-success">' + place + '</span>'));
                                        }


                                    }
                                    // end actions
                                } else if (line.indexOf('Uncalled') >= 0) {
                                    // Uncalled
                                    var _dev_cls = 'bg-info';
                                    if (isPreflop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isFlop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isTurn) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isRiver) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isSummary) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }

                                    // end Uncalled
                                } else if (line.indexOf('collected') >= 0) {
                                    // collected
                                    var _dev_cls = 'bg-info';
                                    if (isPreflop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isFlop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isTurn) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isRiver) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isSummary) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    // end collected
                                } else if (line.indexOf('joins') >= 0) {
                                    // joined
                                    var _dev_cls = 'bg-info';
                                    if (isPreflop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isFlop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isTurn) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isRiver) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isSummary) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    // end joined
                                } else if (line.indexOf('leaves') >= 0) {
                                    // leaved
                                    var _dev_cls = 'bg-info';
                                    if (isPreflop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isFlop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isTurn) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isRiver) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isSummary) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    // end leaved
                                } else if (line.indexOf('disconnected') >= 0) {
                                    // disconnected
                                    var _dev_cls = 'bg-info';
                                    if (isPreflop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isFlop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isTurn) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isRiver) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isSummary) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    // end disconnected
                                } else if (line.indexOf('timed out') >= 0) {
                                    // timed out
                                    var _dev_cls = 'bg-info';
                                    if (isPreflop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isFlop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isTurn) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isRiver) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    if (isSummary) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    }
                                    // end timed out
                                } else if (line.indexOf('Total pot') >= 0) {
                                    // Total pot
                                    var _dev_cls = 'bg-info';
                                    if (isSummary) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else {
                                        $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                    }
                                    // end Total pot
                                } else if (line.indexOf('Board') >= 0) {
                                    // Board
                                    var _dev_cls = 'bg-info';
                                    if (isSummary) {

                                        var br1 = line.indexOf('[');
                                        var br2 = line.indexOf(']');
                                        var str = line.substring(br1 + 1, br2);
                                        var arr = str.split(' ');

                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '"> Board - ' + str + '</span>'));

                                        $('#file-content').append($('<div/>', { id: 'showdowncardswrapper' + i2 }));
                                        var boardcards = {};
                                        $.each(arr, function(i, card) {
                                            boardcards['boardcard' + i + 1] = arr[i];
                                        });

                                        var cardshtml = createcards('showdowncardswrapper' + i2, 'boardcards' + i2);
                                        setcards(cardshtml, boardcards);

                                    } else {
                                        $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                    }
                                    // end Board
                                } else if (line.indexOf('cashed out') >= 0) {
                                    // cashed out
                                    var _dev_cls = 'bg-info';
                                    if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else {
                                        $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                    }
                                    // end cashed out
                                } else if (line.indexOf('said') >= 0) {
                                    // said
                                    var _dev_cls = 'bg-info';
                                    if (isPreflop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else if (isFlop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else if (isTurn) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else if (isRiver) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else {
                                        $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                    }
                                    // end said
                                } else if (line.indexOf('removed from the table') >= 0) {
                                    // removed from the table
                                    var _dev_cls = 'bg-info';
                                    if (isPreflop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else if (isFlop) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else if (isTurn) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else if (isRiver) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else if (isShowDown) {
                                        $('#file-content').append($('<div/>').html('<span class="' + _dev_cls + '">' + line + '</span>'));
                                    } else {
                                        $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                    }
                                    // end removed from the table
                                } else if (line.length <= 3) {
                                    // empty lines

                                } else {
                                    $('#file-content').append($('<div/>').html('<span class="bg-warning"> needs to prepare -' + line + '</span>'));
                                }

                            }
                        });
                    });
                    console.log('end of file');
                };
                fr.readAsText(file);

            } else {
                alert('File not selected or browser incomatible');
            }
        });
    })(jQuery);

    /* 
    https://o7planning.org/ru/12333/javascript-filereader-tutorial#a37895846 
    */
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
.appendTo('#wrapper'); */