(function(){
	var base = 'http://api.canlii.org',
		join = require('./util').join,
		opt = {
			api_key: '',
			language: 'en',
			version: 1
		},
		prepareResult = require('./util').prepareResult,
		request = require('superagent'),
		util = require('util');

	exports.config = function(config) {
		Object.keys(config).forEach(function(v) {
			opt[v] = config[v];
		});
	};

	exports.legislationBrowse = function(query, cb){
		if (!opt.api_key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}

		if (opt.version === 1) {
			query.api_key = opt.api_key;
			query.language = query['language'] || opt.language;

			var url = [base, 'v1', 'legislationBrowse', join(
				query,
				['language', 'databaseId', 'legislationId'],
				['api_key']
			)].join('/');

			request.get(url).end(prepareResult.bind(this, opt.version, cb));
		} else {
			throw new Error('Unsupported API version.');
		}
	};

	exports.caseBrowse = function(query, cb){
		if (!opt.api_key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}

		if (opt.version === 1) {
			query.api_key = opt.api_key;
			query.language = query['language'] || opt.language;

			if (!query.caseId) {
				query.offset = query.offset || 0;
				query.resultCount = query.resultCount || 10;
			}

			var url = [base, 'v1', 'caseBrowse', join(
				query,
				['language', 'databaseId', 'caseId'],
				['api_key', 'offset', 'resultCount', 'publishedBefore', 'publishedAfter', 'decisionBefore', 'decisionAfter']
			)].join('/');

			request.get(url).end(prepareResult.bind(this, opt.version, function fixCaseId(error, result) {
				// For some reason, when caseBrowse returns a list of cases, caseId is an object of the form
				// {language: caseId}. This function fixes that.

				if (error) {
					cb(error);
					return;
				}

				if (result.cases) {
					result.cases.forEach(function(v) {
						v.caseId = v.caseId[Object.keys(v.caseId)[0]];
					});
				}

				cb(null, result);
			}));
		} else {
			throw new Error('Unsupported API version.');
		}
	};

	exports.caseCitatorTease = function(query, cb){
		if (!opt.api_key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}

		if (opt.version === 1) {
			query.api_key = opt.api_key;
			query.language = query['language'] || opt.language;

			var url = [base, 'v1', 'caseCitatorTease', join(
				query,
				['language', 'databaseId', 'caseId', 'citatorType'],
				['api_key']
			)].join('/');

			request.get(url).end(prepareResult.bind(this, opt.version, cb));
		} else {
			throw new Error('Unsupported API version.');
		}
	};

	exports.search = function(query, cb){
		if (!opt.api_key) {
			throw new Error('You need an API key to use the CanLII API. Get one at http://developer.canlii.org.');
		}

		if (opt.version === 1) {
			query.api_key = opt.api_key;
			query.language = query['language'] || opt.language;
			query.offset = query.offset || 0;
			query.resultCount = query.resultCount || 10;

			var url = [base, 'v1', 'search', join(
				query,
				['language'],
				['api_key','fullText', 'offset', 'resultCount']
			)].join('/');

			request.get(url).end(prepareResult.bind(this, opt.version, cb));
		} else {
			throw new Error('Unsupported API version.');
		}
	};

	exports.queryByUrl = function(url, cb) {
		var databases = require('../data/databases.json'),
			regex = /^https?:\/\/(?:www\.)?canlii\.\w+\/(.+)$/;

		var path = regex.exec(url);

		if (path) {
			path = path[1].split('/');
			var method = path[2] === 'laws' ? 'legislationBrowse' : 'caseBrowse';

			if (method === 'legislationBrowse') {
				this.legislationBrowse({
					databaseId: path[1] + (path[3] === 'stat' ? 's' : 'r'),
					legislationId: path[4]
				}, cb);
			} else {
				this.caseBrowse({
					databaseId: databases[path[2]],
					caseId: path[5]
				}, cb);
			}

		} else {
			cb({
				message: 'Not a valid CanLII URL'
			})
		}
	};
})();