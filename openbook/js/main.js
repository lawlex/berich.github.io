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
    var suitcolors = ['danger', 'success', 'primary', 'dark']
    $('<div/>', {
        id: 'deckbtngroup',
        'class': 'btn-group',
    }).appendTo('#deckwrapper');
    $.each(suits, function(i, suit) {
        $('<div/>', {
            id: 'decksuit' + suit,
            'class': 'btn-group-vertical',
            css: { fontSize: '16px', margin: '1px', },
        }).appendTo('#deckwrapper');
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