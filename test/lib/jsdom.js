var _ = require('lodash');
var jsdom = require('jsdom');
var assert = require('assert');

jsdom.defaultDocumentFeatures = {
  FetchExternalResources: false,
  ProcessExternalResources: false
};

var hasAddedClassList = false;

function notImplemented() {
  throw new Error("mock classList modifiers not implemented");
}
var DOMTokenListPrototype = {
  contains: function(item) {
    return Array.prototype.indexOf.call(this, item) !== -1;
  },
  add: notImplemented, remove: notImplemented, toggle: notImplemented
};

function main() {
  var document = jsdom.jsdom.apply(jsdom, arguments);

  // Monkey-patch the Element prototype to have a simple classList getter.
  if (!hasAddedClassList) {
    var div = document.createElement("div");
    var proto = div;
    do {
      proto = Object.getPrototypeOf(proto);
    } while (!_.has(proto, 'className'));
    Object.defineProperty(proto, 'classList', {
      get: function() {
        // jshint -W103
        var list = this.className.split(' ').filter(Boolean);
        list.__proto__ = DOMTokenListPrototype;
        return Object.freeze(list);
      }
    });
  }

  var originalCreateEvent = document.createEvent;
  document.createEvent = function(type) {
    var event = originalCreateEvent.apply(this, arguments);
    if (type == 'CustomEvent') {
      assert(!event.initCustomEvent);
      event.initCustomEvent = function(type, bubbles, cancelable, detail) {
        if (detail) {
          throw new Error("mock initCustomEvent doesn't support detail parameter");
        }
        event.initEvent(type, bubbles, cancelable);
      };
    }
    return event;
  };

  return document;
}

module.exports = main;
