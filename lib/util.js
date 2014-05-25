(function() {
	/**
	 * Given {a: '1', b: '2', c: '3', d: '4'}, ['a','c','b'], ['d'] should return 1/3/2?d=4
	 * @param query
	 * @param pathParts
	 * @param queryParts
	 */
	exports.join = function join(query,pathParts,queryParts) {
		var pathArray = [],
			queryArray = [];

		pathParts.every(function(v) {
			if (query.hasOwnProperty(v)) {
				// Only allow valid url characters
				pathArray.push(String(query[v]).replace(/[^a-zA-Z0-9_\.-]/g,''));
				return true;
			}
			return false;
		});

		queryParts.forEach(function(v) {
			if (query.hasOwnProperty(v)) {
				queryArray.push(v + '=' + encodeURIComponent(query[v]));
			}
		});


		return pathArray.join('/') + (queryArray.length === 0 ? '' : '?' + queryArray.join('&'));
	};

	exports.prepareResult = function(version, cb, error, result) {
		if (error) {
			cb(error);
			return;
		}

		if (version === 1) {
			if (result.statusCode === 200) {
				var body = JSON.parse(result.text);

				if (Array.isArray(body) && body[0].error) {
					cb({
						httpStatus: 200,
						masheryCode: null,
						message: 'CanLII errors',
						canliiErrors: body
					});
				} else {
					cb(null, body);
				}

			} else if (result.statusCode === 403) {
				cb({
					httpStatus: 403,
					masheryCode: result.headers['x-mashery-error-code'],
					message: result.req.method + ' ' + result.req.path + ' Forbidden: ' + result.headers['x-mashery-error-code']
				});
			} else {
				cb({
					httpStatus: result.statusCode,
					masheryCode: result.headers['x-mashery-error-code'],
					message: result.req.method + ' ' + result.req.path + ' Error: ' + result.headers['x-mashery-error-code']
				});
			}
		} else {
			throw new Error('Unsupported API version.');
		}
	};



	exports.queryFromUrl = function(url) {

	};
})();