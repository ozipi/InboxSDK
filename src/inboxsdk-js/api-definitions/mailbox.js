var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var Mailbox = function(platformImplementationLoader){
	EventEmitter.call(this);

	this._platformImplementationLoader = platformImplementationLoader;
};

Mailbox.prototype = Object.create(EventEmitter.prototype);

_.extend(Mailbox.prototype, {

	registerThreadRowViewHandler: function(handler) {
		return this._platformImplementationLoader.registerHandler('Mailbox', 'ThreadRowView', handler);
	}

});

module.exports = Mailbox;
