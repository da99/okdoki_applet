
// ================================================================
// Container
// ================================================================

var Okdoki_Applet = function (source, multi_def) {
  var app = WWW_Applet(source);
  app.data.page = Page.new();
  app.data.eles = [];
  app.multi_def(DEFS);
  app.multi_def(EVENT_DEFS);
  if (multi_def)
    app.multi_def(multi_def);
};


// ================================================================
// Settings
// ================================================================

var DEFS = {

  'form . text_input' : {
    args    : [req_name, {id: id, lines: num_of_lines}],
    content : string,
    run     : function (meta, args, content) {
      return element('input', [args, 'id', 'name', {type: "text", ok_type: 'text_box'}], (content || ""));
    }
  }

  , 'button' : {
    args : [id, {type: button_type}],
    content : req_string,
    run : function (meta, args, content) {
      return element('button', [args, 'id', {ok_type: 'button'}], content);
    }
  }

  , 'link' :  {
    args    : [href],
    content : req_string,
    run : function (meta, attrs, content) {
      return element('a', [args, 'href', {ok_type:'link'}], content);
    }
  }

  , 'on_click' : function (meta, content) {
    meta.data.js.push(_.last(meta.data.eles), 'on_click', content);
    return "";
  }

};

// ================================================================
// Helpers
// ================================================================








