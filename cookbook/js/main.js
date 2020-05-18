$(document).ready(function() {
    /* this script works */
    /* you can type your code here */
    var currentposition = 0; // 0 - BB
    var currenttypehand = 0; // 0 - Мусорные руки
    var currentaction = 1; // 1 - Все сбросились
    var countplayers = 6; // 6 игроков для столов 6-max
    var players = [
      '2',
      '3',
      '4',
      '5',
      '6'
    ];
    var positions = [
      'BB',
      'SB',
      'BTN',
      'CO',
      'MP',
      'UTG'
    ];
    var actions = [
      'Все сбросились',
      'Был лимп (лимпы)',
      'Один рейз',
      'Один рейз и колл',
      'Был ре-рейз (3бет)'
    ];
    function getTypeTitle(index) {
        var types = [
            'Мусорные карты',
            'Одномастные коннекторы',
            'Старшие коннекторы',
            'Старшие одномастные карты',
            'Слабые карманные пары',
            'Сильные карманные пары',
            'Слабые бродвейные руки',
            'Сильные бродвейные руки',
            'Премиум-руки'
        ];
        return types[index];
    }

    
    var types = [
        'Мусорные карты',
        'Одномастные коннекторы',
        'Старшие коннекторы',
        'Старшие одномастные карты',
        'Слабые карманные пары',
        'Сильные карманные пары',
        'Слабые бродвейные руки',
        'Сильные бродвейные руки',
        'Премиум-руки'
    ];
    var hands = {
        "AA": 8,
        "AKo": 8,
        "AKs": 8,
        "KK": 8,
        "QQ": 8,
        "AJo": 7,
        "AJs": 7,
        "AQo": 7,
        "AQs": 7,
        "KQo": 7,
        "KQs": 7,
        "ATo": 6,
        "ATs": 6,
        "KJo": 6,
        "KJs": 6,
        "QJo": 6,
        "QJs": 6,
        "88": 5,
        "99": 5,
        "JJ": 5,
        "TT": 5,
        "22": 4,
        "33": 4,
        "44": 4,
        "55": 4,
        "66": 4,
        "77": 4,
        "A2s": 3,
        "A3s": 3,
        "A4s": 3,
        "A5s": 3,
        "A6s": 3,
        "A7s": 3,
        "A8s": 3,
        "A9s": 3,
        "J8s": 3,
        "J9s": 3,
        "K8s": 3,
        "K9s": 3,
        "Q8s": 3,
        "Q9s": 3,
        "JTo": 2,
        "JTs": 2,
        "KTo": 2,
        "KTs": 2,
        "QTo": 2,
        "QTs": 2,
        "65s": 1,
        "75s": 1,
        "76s": 1,
        "87s": 1,
        "98s": 1,
        "T8s": 1,
        "T9s": 1,
        "32o": 0,
        "32s": 0,
        "42o": 0,
        "42s": 0,
        "43o": 0,
        "43s": 0,
        "52o": 0,
        "52s": 0,
        "53o": 0,
        "53s": 0,
        "54o": 0,
        "54s": 0,
        "62o": 0,
        "62s": 0,
        "63o": 0,
        "63s": 0,
        "64o": 0,
        "64s": 0,
        "65o": 0,
        "72o": 0,
        "72s": 0,
        "73o": 0,
        "73s": 0,
        "74o": 0,
        "74s": 0,
        "75o": 0,
        "76o": 0,
        "82o": 0,
        "82s": 0,
        "83o": 0,
        "83s": 0,
        "84o": 0,
        "84s": 0,
        "85o": 0,
        "85s": 0,
        "86o": 0,
        "86s": 0,
        "87o": 0,
        "92o": 0,
        "92s": 0,
        "93o": 0,
        "93s": 0,
        "94o": 0,
        "94s": 0,
        "95o": 0,
        "95s": 0,
        "96o": 0,
        "96s": 0,
        "97o": 0,
        "97s": 0,
        "98o": 0,
        "A2o": 0,
        "A3o": 0,
        "A4o": 0,
        "A5o": 0,
        "A6o": 0,
        "A7o": 0,
        "A8o": 0,
        "A9o": 0,
        "J2o": 0,
        "J2s": 0,
        "J3o": 0,
        "J3s": 0,
        "J4o": 0,
        "J4s": 0,
        "J5o": 0,
        "J5s": 0,
        "J6o": 0,
        "J6s": 0,
        "J7o": 0,
        "J7s": 0,
        "J8o": 0,
        "J9o": 0,
        "K2o": 0,
        "K2s": 0,
        "K3o": 0,
        "K3s": 0,
        "K4o": 0,
        "K4s": 0,
        "K5o": 0,
        "K5s": 0,
        "K6o": 0,
        "K6s": 0,
        "K7o": 0,
        "K7s": 0,
        "K8o": 0,
        "K9o": 0,
        "Q2o": 0,
        "Q2s": 0,
        "Q3o": 0,
        "Q3s": 0,
        "Q4o": 0,
        "Q4s": 0,
        "Q5o": 0,
        "Q5s": 0,
        "Q6o": 0,
        "Q6s": 0,
        "Q7o": 0,
        "Q7s": 0,
        "Q8o": 0,
        "Q9o": 0,
        "T2o": 0,
        "T2s": 0,
        "T3o": 0,
        "T3s": 0,
        "T4o": 0,
        "T4s": 0,
        "T5o": 0,
        "T5s": 0,
        "T6o": 0,
        "T6s": 0,
        "T7o": 0,
        "T7s": 0,
        "T8o": 0,
        "T9o": 0
    };

    var heroesaction = {
      "BB": {
        "c8":{"a1":"Рейз","a2":"Рейз","a3":"Ре-рейз (3бет) и олл-ин на префлопе","a4":"Ре-рейз (3бет) и олл-ин на префлопе","a5":"Ре-рейз (3бет) и олл-ин на префлопе"},
        "c7":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c6":{"a1":"Рейз","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c5":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c4":{"a1":"Рейз","a2":"Чек","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c3":{"a1":"Рейз","a2":"Чек","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c2":{"a1":"Рейз","a2":"Чек","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c1":{"a1":"Рейз","a2":"Чек","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c0":{"a1":"Фолд","a2":"Фолд","a3":"Фолд","a4":"Фолд","a5":"Фолд"}
      },
      "SB": {
        "c8":{"a1":"Рейз","a2":"Рейз","a3":"Ре-рейз (3бет) и олл-ин на префлопе","a4":"Ре-рейз (3бет) и олл-ин на префлопе","a5":"Ре-рейз (3бет) и олл-ин на префлопе"},
        "c7":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c6":{"a1":"Рейз","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c5":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c4":{"a1":"Рейз","a2":"Колл","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c3":{"a1":"Рейз","a2":"Колл","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c2":{"a1":"Рейз","a2":"Колл","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c1":{"a1":"Рейз","a2":"Колл","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c0":{"a1":"Фолд","a2":"Фолд","a3":"Фолд","a4":"Фолд","a5":"Фолд"}},
      "BTN": {
        "c8":{"a1":"Рейз","a2":"Рейз","a3":"Ре-рейз (3бет) и олл-ин на префлопе","a4":"Ре-рейз (3бет) и олл-ин на префлопе","a5":"Ре-рейз (3бет) и олл-ин на префлопе"},
        "c7":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c6":{"a1":"Рейз","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c5":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c4":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c3":{"a1":"Рейз","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c2":{"a1":"Рейз","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c1":{"a1":"Рейз","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c0":{"a1":"Фолд","a2":"Фолд","a3":"Фолд","a4":"Фолд","a5":"Фолд"}
      },
      "CO": {
        "c8":{"a1":"Рейз","a2":"Рейз","a3":"Ре-рейз (3бет) и олл-ин на префлопе","a4":"Ре-рейз (3бет) и олл-ин на префлопе","a5":"Ре-рейз (3бет) и олл-ин на префлопе"},
        "c7":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c6":{"a1":"Рейз","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c5":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c4":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"Колл","a5":"Фолд"},
        "c3":{"a1":"Фолд","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c2":{"a1":"Рейз","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c1":{"a1":"Фолд","a2":"Рейз","a3":"Фолд","a4":"Фолд","a5":"Фолд"},
        "c0":{"a1":"Фолд","a2":"Фолд","a3":"Фолд","a4":"Фолд","a5":"Фолд"}
      },
      "MP": {
        "c8":{"a1":"Рейз","a2":"Рейз","a3":"Ре-рейз (3бет) и олл-ин на префлопе","a4":"","a5":""},
        "c7":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"","a5":""},
        "c6":{"a1":"Фолд","a2":"Рейз","a3":"Фолд","a4":"","a5":""},
        "c5":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"","a5":""},
        "c4":{"a1":"Рейз","a2":"Рейз","a3":"Колл","a4":"","a5":""},
        "c3":{"a1":"Фолд","a2":"Фолд","a3":"Фолд","a4":"","a5":""},
        "c2":{"a1":"Фолд","a2":"Рейз","a3":"Фолд","a4":"","a5":""},
        "c1":{"a1":"Фолд","a2":"Фолд","a3":"Фолд","a4":"","a5":""},
        "c0":{"a1":"Фолд","a2":"Фолд","a3":"Фолд","a4":"Фолд","a5":"Фолд"}
      },
      "UTG": {
        "c8":{"a1":"Рейз","a2":"","a3":"","a4":"","a5":""},
        "c7":{"a1":"Рейз","a2":"","a3":"","a4":"","a5":""},
        "c6":{"a1":"Фолд","a2":"","a3":"","a4":"","a5":""},
        "c5":{"a1":"Рейз","a2":"","a3":"","a4":"","a5":""},
        "c4":{"a1":"Рейз","a2":"","a3":"","a4":"","a5":""},
        "c3":{"a1":"Фолд","a2":"","a3":"","a4":"","a5":""},
        "c2":{"a1":"Фолд","a2":"","a3":"","a4":"","a5":""},
        "c1":{"a1":"Фолд","a2":"","a3":"","a4":"","a5":""},
        "c0":{"a1":"Фолд","a2":"Фолд","a3":"Фолд","a4":"Фолд","a5":"Фолд"}
      }
    };

    $.each(players, function(index, value) {
      console.log('index: ' + index + ', value: ' + value);
      $('#btn'+value+'players').click(
        function() {
          countplayers = index + 2;
          //console.log(countplayers);
          $.each(positions, function(n, value) {
            if(n+1>countplayers){
              $('#btn' + positions[n] + 'label').addClass('disabled');
              //$('#btn'+positions[n]).attr('disabled','');
            } else {
              $('#btn' + positions[n] + 'label').removeClass('disabled');

            }

            var p = currentposition+1;
            console.log(p);
            if ( p == countplayers ) {
              $('#btnActions' + 2 + 'label').addClass('disabled');
              $('#btnActions' + 3 + 'label').addClass('disabled');
              $('#btnActions' + 4 + 'label').addClass('disabled');
              $('#btnActions' + 5 + 'label').addClass('disabled');
            } else {
              $('#btnActions' + 1 + 'label').removeClass('disabled');
              $('#btnActions' + 2 + 'label').removeClass('disabled');
              $('#btnActions' + 3 + 'label').removeClass('disabled');
              $('#btnActions' + 4 + 'label').removeClass('disabled');
              $('#btnActions' + 5 + 'label').removeClass('disabled');
            }
            
            if ( p + 1 == countplayers ) {
              $('#btnActions' + 1 + 'label').removeClass('disabled');
              $('#btnActions' + 2 + 'label').removeClass('disabled');
              $('#btnActions' + 3 + 'label').removeClass('disabled');
              $('#btnActions' + 4 + 'label').addClass('disabled');
              $('#btnActions' + 5 + 'label').addClass('disabled');
            } else if (p > countplayers) {
              console.log(p + ' - ' + countplayers);
              $('#clickposition').addClass('d-none');
              $('#preflopdecision').addClass('d-none');
              $('#btnActions' + 1 + 'label').addClass('disabled');
              $('#btnActions' + 2 + 'label').addClass('disabled');
              $('#btnActions' + 3 + 'label').addClass('disabled');
              $('#btnActions' + 4 + 'label').addClass('disabled');
              $('#btnActions' + 5 + 'label').addClass('disabled');
            }
          });      
        }
      );
    });

    $.each(types, function(index, value) {
        console.log('index: ' + index + ', value: ' + value);
    });


    $.each(positions, function(index, value) {
      $('#btnclickpositionclose').click(function(){$('#clickposition').addClass('d-none');});
      $('#btn' + value).click(function(){
        console.log('index: ' + index + ', countplayers: ' + countplayers);
        var p = index + 1;
        if ( p == countplayers ) {
          $('#btnActions' + 1 + 'label').removeClass('disabled');
          $('#btnActions' + 2 + 'label').addClass('disabled');
          $('#btnActions' + 3 + 'label').addClass('disabled');
          $('#btnActions' + 4 + 'label').addClass('disabled');
          $('#btnActions' + 5 + 'label').addClass('disabled');
        } else {
          $('#btnActions' + 1 + 'label').removeClass('disabled');
          $('#btnActions' + 2 + 'label').removeClass('disabled');
          $('#btnActions' + 3 + 'label').removeClass('disabled');
          $('#btnActions' + 4 + 'label').removeClass('disabled');
          $('#btnActions' + 5 + 'label').removeClass('disabled');
        }
        
        if ( p + 1 == countplayers ) {
          $('#btnActions' + 1 + 'label').removeClass('disabled');
          $('#btnActions' + 2 + 'label').removeClass('disabled');
          $('#btnActions' + 3 + 'label').removeClass('disabled');
          $('#btnActions' + 4 + 'label').addClass('disabled');
          $('#btnActions' + 5 + 'label').addClass('disabled');
        } else {

        }



        currentposition = index;
        $('#clickposition').removeClass('d-none');
          $('#choosenposition').text(value);

          var p = heroesaction[positions[currentposition]];
        
          var c = p["c" + currenttypehand];
          var a = c["a" + currentaction];
          console.log(currentposition + ' - ' + currenttypehand + ' - ' + currentaction + ' - ' + a);
          $('#preflopdecision').removeClass('alert-success d-none').addClass('alert-info display-4');
          $('#preflopdecisiontext').text(a);
      });


    })
    $.each(hands, function(key, value) {
        $('#' + key).attr('title', getTypeTitle(value));
        $('#' + key).tooltip();
        $('#btnclickhandclose').click(function(){$('#clickhand').addClass('d-none');});
        $('#' + key).click(function(){
          $('#clickhand').removeClass('d-none');
          currenttypehand = value;
          $('#choosenhand').text(key + ' - ' + getTypeTitle(value));
          var p = heroesaction[positions[currentposition]];
        
          var c = p["c" + currenttypehand];
          var a = c["a" + currentaction];
          console.log(currentposition + ' - ' + currenttypehand + ' - ' + currentaction + ' - ' + a);
          $('#preflopdecision').removeClass('alert-success d-none').addClass('alert-info display-4');
          $('#preflopdecisiontext').text(a);          
        });
        console.log('key: ' + key + ', value: ' + getTypeTitle(value));


    });

    $.each(actions, function(index, value){
      console.log('index: ' + index + ', value: ' + value);
      currentaction = index + 1;
      $('#btnActions' + currentaction).click(function(){
        currentaction = index + 1;
        var p = heroesaction[positions[currentposition]];
        
        var c = p["c" + currenttypehand];
        var a = c["a" + currentaction];
        console.log(currentposition + ' - ' + currenttypehand + ' - ' + currentaction + ' - ' + a);
        $('#preflopdecision').removeClass('alert-success d-none').addClass('alert-info');
        $('#preflopdecisiontext').text(a);
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
}).appendTo('#wrapper');
*/