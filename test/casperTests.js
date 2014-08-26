var fs = require('fs');
var utils = require('utils');
var rules = JSON.parse(fs.read('test_url_list'));

casper.userAgent('Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36');

// For loop won't work here for some reason.
function run(idx) {
  var rule = rules[idx];
  casper.test.begin('Banner appears on ' + rule.example,
                    1, function(test) {
    casper.start(rule.example, function() {
      this.page.injectJs('../src/rules.js');
      this.page.injectJs('../src/inject.js');
      var bannerIsVisible = this.evaluate(function () {
        return document.querySelector('.ad-detector-banner') !== null;
      });
      test.assert(bannerIsVisible);
    });

    casper.run(function() {
      test.done();

      run(idx + 1);
    });
  });
}
run(0);
