
// ================================================================
// Container
// ================================================================

var Okdoki_Applet = {

  _data : {'EVERY SEC' : []},

  data : function (k, v) {
    var name = WWW_Applet.standardize_name(k);
    if (arguments.length == 2)
      this._data[name] = v;
    return this._data[name];
  },

  lead_zero : function (val) {
    if (val < 10)
      return '0' + val;
    return '' + val;
  },

  'new': function (source) {
    var app = WWW_Applet.new(source, Okdoki_Applet.Base_Funcs);
    app.data('boxs', {});
    app.data('every sec', []);
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

    'text update'    : function (env, app) {
      var txt  = env.args[1];
      var name = WWW_Applet.standardize_name(env.args[0]);
      var box  = app.data('boxs')[name];
      box.text(txt);
      return box;
    } ,

    'down letter case' : function (env, app) {
      var target = app.read_var('about');
      return target.css('textTransform', 'lowercase');
    },

    'up letter case' : function (env, app) {
      var target = app.read_var('about');
      return target.css('textTransform', 'uppercase');
    },

    'time now' : function (env, app) {
      var format = env.args[0];
      var now = new Date;
      return format.replace(/\{([^\}]+)\}/g, function (sub, cap) {
        switch (cap) {

          case 'D':
            return Okdoki_Applet.lead_zero(now.getDate());
            break;

          case 'd':
            return now.getDate();
            break;

          case "H":
            return Okdoki_Applet.lead_zero(now.getHours());
            break;

          case "h":
            return now.getHours();
            break;

          case "M":
            return Okdoki_Applet.lead_zero(now.getMinutes());
            break;

          case "m":
            return now.getMinutes();
            break;

          case "S":
            return Okdoki_Applet.lead_zero(now.getSeconds());
            break;

          case "s":
            return now.getSeconds();
            break;

        }; // === switch

        switch (cap.toUpperCase()) {
          case 'DAY NAME':
            return 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ')[now.getDay()]
            break;

          case 'DAY':
            return 'Sun Mon Tues Wed Thur Fri Sat'.split(' ')[now.getDay()]
            break;

          case 'P.A.M.':
            return (now.getHours() < 12) ? 'a.m.' : 'p.m.';
            break;

          case 'PAM':
            return (now.getHours() < 12) ? 'am' : 'pm';
            break;
        }; // === switch

        return cap;
      });
    },

    // === TIME
    'on every second' : function (env, app) {
      app.local_def_var('about', app.read_var('about'));
      var run_this = function () {
        app.eval(env.args);
      };
      Okdoki_Applet.data('every sec').push(run_this);
      return true;
    }
  }
};

setInterval(function () {
  _.each(Okdoki_Applet.data('every sec'), function (v, k) {
    v();
  });
}, 1000);

Okdoki_Applet.Base_Funcs['on every second'].use_raw = true;


// ================================================================
// Helpers
// ================================================================

function not_ready (env, app) {
  console['log']('Not ready: ' + env.name);
}

