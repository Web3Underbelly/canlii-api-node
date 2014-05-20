(function() {
	exports.APIObject = function APIObject(content) {
		Object.keys(content).forEach(function(v) {
			this[v] = content[v];
		});
	};

	exports.caseDb = function caseDb() {

	};

	exports.caseMini = function caseMini() {

	};

	exports.caseFull = function caseFull() {

	};

	exports.legislationDb = function legislationDb() {

	};

	exports.legislationMini = function legislationMini() {

	};

	exports.legislationFull = function legislationFull() {

	};
})();