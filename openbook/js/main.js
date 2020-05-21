$(document).ready(function() {
    /* this script works */
    /* you can type your code here */

    /*

        <div class="btn-group-vertical">
            <button type="button" class="btn btn-primary deck-btn d-flex align-items-center justify-content-center font-weight-bold">Ah</button>
            <button type="button" class="btn btn-primary deck-btn d-flex align-items-center justify-content-center font-weight-bold">Kh</button>
            <button type="button" class="btn btn-primary deck-btn d-flex align-items-center justify-content-center font-weight-bold">Qh</button>
        </div>

    */
    var noms = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    var nomsreverse = noms.reverse();
    var suits = ['h', 'c', 'd', 's'];
    var suitcolors = ['danger', 'success', 'primary', 'dark'];
    $('<div/>', {
        'class': 'input-group mb-3',
        append: $('<div/>', {
            id: 'tablecontainer',
            'class': 'input-group-prepend',
        }),
    }).appendTo('#tablewrapper');
    $('<div>', {
        'class': 'input-group-text',
        append: $('<div/>', {
            'class': 'btn-group btn-group-toggle',
            append: $('<label/>', {
                'class': 'btn btn-secondary',
                text: ' Рука: ',
                append: $('<input/>', {
                    id: 'btnusehand',
                    type: 'checkbox',
                    name: 'options'
                }).attr({ 'autocomplte': 'off', 'checked': '' }),
            }),
        }).attr('data-toggle', 'buttons'),
    }).appendTo('#tablecontainer');
    var handhtml = $('<div/>', {
        class: 'input-group-text',
    }).appendTo('#tablecontainer');
    var handcard1 = handhtml.append($(
        `<div id='handcard1' class='card playing rank-a suit-hearts'>
          <div class='card-body'>
              <div class='card-title'></div>
              <div class='card-text'></div>
          </div>
          </div>`, {}));
    var handcard2 = handhtml.append($(
        `<div id='handcard1' class='card playing rank-a suit-spades'>
            <div class='card-body'>
                <div class='card-title'></div>
                <div class='card-text'></div>
            </div>
            </div>`, {}));

    /*
    <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary">
                        <input type="checkbox" name="options" id="btnusehand" autocomplete="off" checked> Рука: </label>
                    </div>
                </div>

                <div class="input-group-text">
                    <div class="card playing rank-a suit-hearts">
                        <div class="card-body">
                            <div class="card-title"></div>
                            <div class="card-text"></div>
                        </div>
                    </div>
                    <div class="card playing rank-a suit-spades">
                        <div class="card-body">
                            <div class="card-title"></div>
                            <div class="card-text"></div>
                        </div>
                    </div>
                </div>
                <div class="input-group-text">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary">
                        <input type="checkbox" name="options" id="btnuseboard" autocomplete="off" checked> Доска: </label>
                    </div>
                </div>

                <div class="input-group-text">
                    <div class="card playing rank-a suit-diams">
                        <div class="card-body">
                            <div class="card-title"></div>
                            <div class="card-text"></div>
                        </div>
                    </div>
                    <div class="card playing rank-a suit-clubs">
                        <div class="card-body">
                            <div class="card-title"></div>
                            <div class="card-text"></div>
                        </div>
                    </div>
                    <div class="card playing rank-2 suit-hearts">
                        <div class="card-body">
                            <div class="card-title"></div>
                            <div class="card-text"></div>
                        </div>
                    </div>
                </div>
                <div class="input-group-text">
                    <div class="card playing rank-k suit-clubs">
                        <div class="card-body">
                            <div class="card-title"></div>
                            <div class="card-text"></div>
                        </div>
                    </div>
                </div>
                <div class="input-group-text">
                    <div class="card playing emptyplace">
                        <div class="card-body">
                            <div class="card-title"></div>
                            <div class="card-text"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        */
    $('<div/>', {
        id: 'deckbtngroup',
        'class': 'btn-group-vertical',
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