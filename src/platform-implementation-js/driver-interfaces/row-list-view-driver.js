var _ = require('lodash');
var BasicClass = require('../lib/basic-class');

var RowListViewDriver = function(){
	BasicClass.call(this);
};

RowListViewDriver.prototype = Object.create(BasicClass.prototype);

_.extend(RowListViewDriver.prototype, {

	getSelectedThreadRows: null

});

module.exports = RowListViewDriver;
