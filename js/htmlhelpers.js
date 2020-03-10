// Small jQuery Helper for creation footer Button

    function $createButton(_btnId, _btnText, _btn_Class, _btn_InlineStyle) {

        return $('<button id="' + _btnId + '" type="button"' + _btn_Class + _btn_InlineStyle + '>' + _btnText + '</button>');
    };

    // Small jQuery Helper for creation footer Button Groups
    function $createButtonGroup(_btnId, _btnText, _btn_Class, _btn_InlineStyle) {
        //return $('<button id="' + _btnId + '" type="button"' + _btn_Class + _btn_InlineStyle + '>' + _btnText + '</button>');
        return $(`
          <div class"btn-group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
              Sony
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Tablet</a>
              <a class="dropdown-item" href="#">Smartphone</a>
            </div
          </div>
        `);
    };

        // Button Styles
        var _btn_Class = ' class="btn btn-dark btn-sm btn-outline-light"';
        var _btn_InlineStyle = ' style="font-size:.7rem;"';
    
        // Button Sort
        var $_btnsort = $createButton('btnsort', 'Sort', _btn_Class, _btn_InlineStyle);
    
        // Button Shuffle
        var $_btnshuffle = $createButton('btnshuffle', 'Shuffle', _btn_Class, _btn_InlineStyle);
    
        // Button By suit
        var $_btnbysuit = $createButton('btnbysuit', 'By suit', _btn_Class, _btn_InlineStyle);
    
        // Button Fan
        var $_btnfan =  $createButton('btnfan', 'Fan', _btn_Class, _btn_InlineStyle);
        
        // Button Poker
        var $_btnpoker = $createButton('btnpoker', 'Poker', _btn_Class, _btn_InlineStyle);
        
        // Button Flip
        var $_btnflip = $createButton('btnflip', 'Flip', _btn_Class, _btn_InlineStyle);
        
        // Button Explode
        var $_btnexplode = $createButton('btnexplode', 'Explode', _btn_Class, _btn_InlineStyle);
        
        // Button Holdem
        var $_btnholdem = $createButton('btnholdem', 'Holdem', _btn_Class, _btn_InlineStyle);
    
        // Button Ellipse
        var $_btnellipse = $createButton('btnellipse', 'Ellipse', _btn_Class, _btn_InlineStyle);
    
        // Button Rotate
        var $_btnrotate = $createButton('btnrotate', 'Rotate', _btn_Class, _btn_InlineStyle);

        // Player Small Card
        /*<div class="container playersmallcard mt-1 bg-light" style="width: 160px; padding-right: 10px; padding-left: 10px;">
                        <div class="media border p-1">
                          <img src="img/img_avatar3.png" alt="Real Hero" class="mr-1 mt-1 rounded-circle" style="width:40px;">
                          <div class="media-body mt-1">
                            <h6 style="font-size:12px;"><strong>Real Hero</strong></h6>
                            <p style="font-size: 11px; margin-bottom: 0.5rem">The best player.</p>      
                          </div>
                        </div>
                      </div>
                    */
        var _smallCardId = '';
        var _smallCardClass = 'class="container playersmallcard mt-1 bg-light" ';
        var _smallCardInlineStyle = 'style="width: 160px; padding-right: 10px; padding-left: 10px;"';
        var _smallCardHeader = 'Real Hero';
        var _smallCardText = 'The best player.';
        function $createPlayerSmallCard(_smallCardId, _smallCardHeader, _smallCardText, _smallCardClass, _smallCardInlineStyle) {
          return $(`
            <div ` + _smallCardId + _smallCardClass + _smallCardInlineStyle + `>
              <div class="media border p-1">
                <img src="img/img_avatar3.png" alt="Real Hero" class="mr-1 mt-1 rounded-circle" style="width:40px;">
                <div class="media-body mt-1">
                  <h6 style="font-size:12px;"><strong>` + _smallCardHeader + `</strong></h6>
                  <p style="font-size: 11px; margin-bottom: 0.5rem">` + _smallCardText + `</p>      
                </div>
              </div>
            </div>
          `);
        };