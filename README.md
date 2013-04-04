

What is it?
----------

An npm package that adds various HTML and JS functionality
to a standard [JSON Applet](https://github.com/da99/json_applet).

Install & Use
-------------

    npm install okdoki_applet

    var OK = require("okdoki_applet").Applet;

    // Use as a regular JSON applet,
    var results = OK(['form', [ ... ]]).run().results;

    // To get the HTML
    results.html

    // To get the JS:
    results.js



