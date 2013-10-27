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
    'text update', ['TIME', 'time NOW', ['{H}:{M}:{S}']],
    'text update', ['MERI', 'time NOW', ['{P.A.M.}']],
    'text update', ['DAY',  'time NOW', ['{Day name}']],
  ]
];

var app = Okdoki_Applet.new(source);
app.run();

// === Who's Crushing On Me?
var source = [

  // --------- headers --------------------------
  'var', [ 'create crush button', 'function', [
    'About:', [ 'create button', ['crush', 'I have a crush on this person.'] ],
    'on click', [
      'create connection', [],
      'delay, then notify user',  ['1 Hour'],
      'delay, then notify other', ['1 Hour']
    ]
  ]],
  // --------------------------------------------

  'on screen name profile' , [
  ],

  'on screen name profile viewed by other' , [
    'create crush button', []
  ],

  'on screen name profile of other' , [
    'create crush button', []
  ],

];

// === Allow Anony Interaction
var source = [
  'var', ['create anon button', 'function', [
     'create button', ['anon', 'Allow anonymous messages from this person.'],
     'on click', ['anon', 'function', [
        'create connection', []
     ]],
     'connection active by total', ['anon', 5]
  ]],

  'on screen name profile', [
    'when viewed by other', ['create anon button', []],
    'when viewing other',   ['create anon button', []]
  ]
];

// === Anon Friend Intro. Request
var source = [
  'var', ['create anon-friend-intro-request', 'function', [
    'create button', ['anon-friend-intro-request', 'Request person introduce a friend.'],
    'on click', ['anon-friend-intro-request', 'function', [
      'open user-as-target dialog form', ['the-new-friend', 'Write the name of someone you want them to intro:'],
      'on submit', ['the-new-friend', 'function', [
        'create message', ['One vote for {TARGET-SCREEN-NAME} to be introduced to your friends.']
      ]]
    ]]
  ]],
  'on screen name profile', [
    'when viewing other',   ['create anon-friend-intro-request button', []]
  ]
];


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








