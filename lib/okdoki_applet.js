
// ================================================================
// Container
// ================================================================

var Okdoki_Applet = function (source, multi_def) {
  var app = JSON_Applet(source);
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



Okdoki_Applet.IS_ERROR  = function (o) { return (_.isObject(o) && o.constructor == Error); };

var DEFS = to_multi_def({

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
});

var EVENT_DEFS = {
  'on_click' : function (meta, content) {
    meta.data.js.push(_.last(meta.data.eles), 'on_click', content);
    return "";
  }
};


// ================================================================
// Helpers
// ================================================================




// ================================================================
// Element
// ================================================================


var Element = {};
Element = function () {}
Element.new = function (raw_tag, raw_attrs, raw_content, page) {
  var string_body = Ok.string_body(raw_content);
  var err         = null;
  var e           = new Ok.Element();
  e.parent        = page;
  e.tag           = Ok.escape(raw_tag);
  e.attrs         = {};
  e.raw_attrs     = raw_attrs;

  if (string_body) {
    e.text    = string_body;
    e.childs  = [];
  } else {
    e.childs = raw_content;
  }

  if (!DSL[e.tag])
    return new Error('Unknown tag: ' + e.tag);

  var results = DSL[e.tag](e);
  if (IS_ERROR(results))
    return results;

  return e;
};

Element.prototype.origin = function () {
  return this.parent.origin();
};

Element.prototype.compile = function () {
  var me = this;
  var $ = cheerio.load('<' + me.tag + '>');
  var e = $(me.tag);

  _.each(me.attrs, function (a_text, a_name) {
   e.attr( a_name, a_text );
  });


  if (me.text) {
    e.text(me.text);
  } else {
    e.html( Ok.Page.new(e.childs, me).compile().html );
  }

  return $.html();

};







