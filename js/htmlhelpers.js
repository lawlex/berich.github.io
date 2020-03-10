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