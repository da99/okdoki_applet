
// ================================================================
// Container
// ================================================================

var Okdoki_Applet = {

  'new': function (source) {
    var app = WWW_Applet.new(source, Okdoki_Applet.Base_Funcs);
    app.data('boxs', {});
    return app;
  },

  target : function (name) {
    return $('div.okdoki_applet_' + WWW_Applet.standardize_name(name).toLowerCase());
  },

  Base_Funcs : {
    'About:'          : function (env, app) {
      return app.def_var(env.args[0], env.args[1]);
    },

    // === BOXes
    'box create'     : function (env, app) {
      var box    = $('<div></div>');
      var target = Okdoki_Applet.target(env.args[0]);
      var name   = WWW_Applet.standardize_name(env.args[1]);
      app.data('boxs')[name] = box;
      box.addClass('box');
      target.append(box);

      return box;
    },

    'last box is'    : not_ready ,

    // === TEXT
    'text create'    : not_ready ,
    'text update'    : not_ready ,

    // === TIME
    'on every second' : not_ready
  }
};

// === Hello, World.
var source = [
  'log', ['Hello, World.']
];

var app = Okdoki_Applet.new(source);
app.run();

// === Create and Color Boxes/Text.
var source = [
  'About:', [
    'box create', ['workspace', 'The_Time']
  ],
  'text create'   , ['7:00'],
  'text create'   , ['a.m.'],
  'last box is'   , ['bold', 'uppercase'],
  'text create'   , ['Friday']
];

var app = Okdoki_Applet.new(source);
app.run();


// === Clock
var source = [
  'About:', [
    'box create', ['workspace', 'The_Clock']
  ],
  'text create'   , ['-:--', 'TIME'],
  'text create'   , ['*.*.', 'MERI'],
  'text create'   , ['Friday', 'DAY'],
  'on every second', [
    'text update', ['TIME', 'time read', ['%H:%M']],
    'text update', ['MERI', 'time read', ['%am_pm']],
    'text update', ['DAY',  'time read', ['%D']],
  ]
];

// === Who's Crushing On Me?

function not_ready (env, app) {
  console['log']('Not ready: ' + env.name);
}

// ================================================================
// Helpers
// ================================================================

  // 'form . text_input' : {
    // args    : [req_name, {id: id, lines: num_of_lines}],
    // content : string,
    // run     : function (meta, args, content) {
      // return element('input', [args, 'id', 'name', {type: "text", ok_type: 'text_box'}], (content || ""));
    // }
  // }

  // , 'button' : {
    // args : [id, {type: button_type}],
    // content : req_string,
    // run : function (meta, args, content) {
      // return element('button', [args, 'id', {ok_type: 'button'}], content);
    // }
  // }

  // , 'link' :  {
    // args    : [href],
    // content : req_string,
    // run : function (meta, attrs, content) {
      // return element('a', [args, 'href', {ok_type:'link'}], content);
    // }
  // }

  // , 'on_click' : function (meta, content) {
    // meta.data.js.push(_.last(meta.data.eles), 'on_click', content);
    // return "";
  // }

// };








