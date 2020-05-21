$(document).ready(function() {
    /* this script works */
    /* you can type your code here */

    var noms = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    var nomsreverse = noms.reverse();
    var suits = ['h', 'c', 'd', 's'];
    var suitcolors = ['danger', 'success', 'primary', 'dark'];

    /* common functions */

    // add playing card's html code
    function addplayingcard(_parent, _id, _nom, _suit, _class = 'card playing') {
        var _noms = {
            'E': { 'id': 100, 'cls': 'emptyplace' },
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
    function createboard(_wrapper_id, _container_id, _label = ' Доска: ') {
        $('#' + _wrapper_id).append($('<div/>', {
            'class': 'input-group mb-3',
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
                append: $('<label/>', {
                    'class': 'btn btn-secondary',
                    text: ' Доска: ',
                    append: $('<input/>', {
                        id: 'btnuseboard',
                        type: 'checkbox',
                        name: 'options'
                    }).attr({ 'autocomplte': 'off', 'checked': '' }),
                }),
            }).attr('data-toggle', 'buttons'),
        }).appendTo('#' + _container_id);

        var _htmlboard = {};

        _htmlboard.flophtml = $('<div/>', {
            class: 'input-group-text',
        }).appendTo('#boardcontainer');
        _htmlboard.turnhtml = $('<div/>', {
            class: 'input-group-text',
        }).appendTo('#boardcontainer');
        _htmlboard.riverhtml = $('<div/>', {
            class: 'input-group-text',
        }).appendTo('#boardcontainer');
        return _htmlboard;
    };

    // create hand
    function createhand(_wrapper_id, _container_id, _label) {
        $('#' + _wrapper_id).append($('<div/>', {
            'class': 'input-group mb-3',
            append: $('<div/>', {
                id: _container_id,
                'class': 'input-group-prepend',
            }),
        }));
        $('<div>', {
            'class': 'input-group-text',
            append: $('<div/>', {
                'class': 'btn-group btn-group-toggle',
                append: $('<label/>', {
                    'class': 'btn btn-secondary',
                    text: _label,
                    append: $('<input/>', {
                        id: 'btnusehand',
                        type: 'checkbox',
                        name: 'options'
                    }).attr({ 'autocomplete': 'off', 'checked': '' }),
                }),
            }).attr('data-toggle', 'buttons'),
        }).appendTo('#' + _container_id);
        return $('<div/>', {
            class: 'input-group-text',
        }).appendTo('#' + handcontainer_id);
    };

    var handwrapper_id = 'handwrapper';
    var handcontainer_id = 'handcontainer';
    var handhtml = createhand(handwrapper_id, handcontainer_id, ' Рука: ');

    var handcard1 = addplayingcard(handhtml, 'handcard1', 'A', 'h');
    var handcard1 = addplayingcard(handhtml, 'handcard2', 'A', 's');

    var boardwrapper_id = 'boardwrapper';
    var boardcontainer_id = 'boardcontainer';
    var boardhtml = createboard(boardwrapper_id, boardcontainer_id);

    var flophtml = boardhtml.flophtml;
    var turnhtml = boardhtml.turnhtml;
    var riverhtml = boardhtml.riverhtml;

    var flopcard1 = addplayingcard(flophtml, 'flopcard1', 'A', 'd');
    var flopcard2 = addplayingcard(flophtml, 'flopcard2', 'A', 'c');
    var flopcard3 = addplayingcard(flophtml, 'flopcard3', '2', 'h');
    var turncard = addplayingcard(turnhtml, 'flopcard1', 'K', 'c');
    var rivercard = addplayingcard(riverhtml, 'flopcard1', 'E', 'E');

    // deck
    $('<div/>', {
        'class': 'input-group mb-3',
        append: $('<div/>', {
            'class': 'input-group-prepend',
            append: $('<div/>', {
                'class': 'input-group-text',
                append: $('<div>', {
                    id: 'deckbtngroup',
                    'class': 'btn-group-vertical'
                })
            }),
        }),
    }).appendTo('#deckwrapper');

    $.each(suits, function(i, suit) {
        $('<div/>', {
            id: 'decksuit' + suit,
            'class': 'btn-group',
            css: { fontSize: '16px', margin: '1px', },
        }).appendTo('#deckbtngroup');
        $.each(nomsreverse, function(k, nom) {
            $('<button/>', {
                type: 'button',
                'class': 'btn btn-' + suitcolors[i] + ' deck-btn d-flex align-items-center justify-content-center font-weight-bold',
                text: nom + suit,
                css: { fontSize: '14px' },
                click: function() {
                    $(this).toggleClass('active border-warning checkedbtn')
                        //$(this).html('Cool!');
                }
            }).appendTo('#decksuit' + suit);
        });
    });



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