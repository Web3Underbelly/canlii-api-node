(function(){
	var opt = {
			key: '',
			language: 'en',
			version: 1
		},
		request = require('superagent'),
		util = require('util');

	exports.config = function(config) {
		Object.keys(config).forEach(function(v) {
			opt[v] = config[v];
		});
	};

	exports.legislationBrowse = function(query, cb){
		if (!opt.key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}

		if (opt.version === 1) {

		} else {
			throw new Error('Unsupported API version.');
		}
	};

	exports.caseBrowse = function(query, cb){
		if (!opt.key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}

		if (opt.version === 1) {

		} else {
			throw new Error('Unsupported API version.');
		}
	};

	exports.caseCitatorTease = function(query, type, cb){
		if (!opt.key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}

		if (opt.version === 1) {

		} else {
			throw new Error('Unsupported API version.');
		}
	};

	exports.queryByUrl = function(url, cb) {
		
	};
})();