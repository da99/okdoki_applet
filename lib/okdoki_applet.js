
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
      return app.def_var('about', env.args[0]);
    },

    // === BOXes
    'box create'     : function (env, app) {
      var box    = $('<div></div>');
      var target = Okdoki_Applet.target(env.args[0]);

      var raw_name = env.args[1];
      if (raw_name) {
        var name   = WWW_Applet.standardize_name(env.args[1]);
        app.data('boxs')[name] = box;
      };

      box.addClass('box');
      target.append(box);

      return box;
    },

    'box #' : function (env, app) {
      var parent = app.read_var('about');
      if (!parent)
        return null;
      var box  = $($(parent).children('.box')[env.args[0]]);
      if (box.length == 0)
        return null;

      return box;
    },

    'first box'    : function (env, app) {
      env.args.unshift(1-1);
      return Okdoki_Applet.Base_Funcs['box #'](env, app);
    },

    'second box'    : function (env, app) {
      env.args.unshift(2-1);
      return Okdoki_Applet.Base_Funcs['box #'](env, app);
    },

    // === TEXT
    'text create'    : function (env, app) {
      var parent = app.read_var('about');
      if (!parent)
        return null;

      var box = $('<span></span>');
      box.addClass('box');

      if (env.args.length == 1) {
        var txt = env.args[0];
      } else {
        var txt = env.args[1];
        var name   = WWW_Applet.standardize_name(env.args[0]);
        app.data('boxs')[name] = box;
      };

      box.text(txt);
      parent.append(box);

      return box;
    },

    'text update'    : not_ready ,

    'down letter case' : function (env, app) {
      var target = app.read_var('about');
      return target.css('textTransform', 'lowercase');
    },

    'up letter case' : function (env, app) {
      var target = app.read_var('about');
      return target.css('textTransform', 'uppercase');
    },

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
  'About:', [ 'box create', ['workspace', 'The_Time'] ],
  'text create', ['7:00'],
  'text create', ['a.m.'],
  'text create', ['Friday'],

  'About:', ['second box', []],
  'up letter case', [],
];

var app = Okdoki_Applet.new(source);
app.run();


// === Clock
var source = [
  'About:', [ 'box create', ['workspace', 'The_Clock'] ],
  'text create', ['TIME', '-:--'],
  'text create', ['MERI', '*.*.'],
  'text create', ['DAY',  'Friday'],

  'on every second', [
    'text update', ['TIME', 'time NOW', ['%H:%M']],
    'text update', ['MERI', 'time NOW', ['%am_pm']],
    'text update', ['DAY',  'time NOW', ['%D']],
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








