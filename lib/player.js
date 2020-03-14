'use strict';

var Player = function() {
  var _smallCardId = 'RealHero';
  var _smallCardClass = 'container playersmallcard mt-1 bg-light';
  var _smallCardInlineStyle = 'left: -60px; top: -40px; width: 120px; padding-right: 10px; padding-left: 10px;';
  var _smallCardHeader = 'Real Hero';
  var _smallCardText = 'The best player.';
  
  var el = createElement('div');

  function createSmallCard() {
    el.setAttribute('id', _smallCardId);
    el.setAttribute('class', _smallCardClass);
    el.setAttribute('style', _smallCardInlineStyle);
    
    var _smallCard = `
              <div class="media border p-1">
                <img src="img/img_avatar3.png" alt="Real Hero" class="mr-1 mt-1 rounded-circle" style="width:40px;">
                <div class="media-body mt-1">
                  <h6 style="font-size:10px;"><strong><span class="smallcardheader">` + _smallCardHeader + `</span></strong></h6>
                  <p style="font-size: 9px; margin-bottom: 0.5rem">` + _smallCardText + `</p>      
                </div>
              </div>
            
          `;
    el.innerHTML = _smallCard;  
  }
  
  function createElement(type) {
    return document.createElement(type);
  } 
  
  function mount(target) {
    // mount card to target (deck)
    target.appendChild(el);

    self.$root = target;
  }

  function unmount() {
    // unmount from root (deck)
    self.$root && self.$root.removeChild(el);
    self.$root = null;
  }
  
  function setId(id) {
    _smallCardId = id;
  }
  
  function setHeader(header) {
    _smallCardHeader = header;
  }
  
  function setText(text) {
    _smallCardText = text;
  }
  
  // Helper for moving Small Card
  var style = document.createElement('p').style;
  var memoized = {};
  
  function prefix(param) {
    if (typeof memoized[param] !== 'undefined') {
      return memoized[param];
    }

    if (typeof style[param] !== 'undefined') {
      memoized[param] = param;
      return param;
    }

    var camelCase = param[0].toUpperCase() + param.slice(1);
    var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
    var test;

    for (var i = 0, len = prefixes.length; i < len; i++) {
      test = prefixes[i] + camelCase;
      if (typeof style[test] !== 'undefined') {
        memoized[param] = test;
        return test;
      }
    }
  }
  
  var has3d;

  function translate(a, b, c) {
    typeof has3d !== 'undefined' || (has3d = check3d());

    c = c || 0;

    if (has3d) {
      return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
    } else {
      return 'translate(' + a + ', ' + b + ')';
    }
  }

  function check3d() {
    // I admit, this line is stealed from the great Velocity.js!
    // http://julian.com/research/velocity/
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) {
      return false;
    }

    var transform = prefix('transform');
    var $p = document.createElement('p');

    document.body.appendChild($p);
    $p.style[transform] = 'translate3d(1px,1px,1px)';

    has3d = $p.style[transform];
    has3d = has3d != null && has3d.length && has3d !== 'none';

    document.body.removeChild($p);

    return has3d;
  }
  // end Helper for moving Small Card
  
  // current hand
  var Hand = function() {
    var cards = [];
    var self = {
      cards: cards,
      addCard: addCard,
      clearHand: clearHand
    };
    
    function addCard(card) {
      if (cards.length < 2) {
        cards.push(card);
        return self;
      }
    }
  
    function clearHand() {
      cards = []; 
      return self;
    }
    return self;
  };

  var hand = new Hand();
  
  var self = {
    $el: el, mount: mount, unmount: unmount, createSmallCard: createSmallCard, setId:setId, setHeader: setHeader, setText: setText, moveto: moveto, hand: hand
  };
  
  // start Small Card coordinates, 0,0 is in the center of container
  
  self.x = 0;
  self.y = 0;
  self.z = 0;
  
  var transform = prefix('transform');
  
  function moveto(x = 0, y = 0, z = 0) {
    el.style[transform] = translate(self.x + x + 'px', self.y + y + 'px');
    el.style.zIndex = self.z + z;
  }
  
  return self;
}