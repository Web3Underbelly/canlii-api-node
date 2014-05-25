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
			if (query[v]) {
				pathArray.push(query[v]);
				return true;
			}
			return false;
		});

		queryParts.forEach(function(v) {
			if (query[v]) {
				queryArray.push(v + '=' + encodeURIComponent(query[v]));
			}
		});


		return pathArray.join('/') + (queryArray.length === 0 ? '' : '?' + queryArray.join('&'));
	}
})();