(function(){
	var opt = {
			key: '',
			language: 'en',
			version: 1
		},
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
	};

	exports.caseBrowse = function(query, cb){
		if (!opt.key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}
	};

	exports.caseCitatorTease = function(query, cb){
		if (!opt.key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}
	};

	exports.queryByUrl = function(url, cb) {
		if (!opt.key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}
	};
})();