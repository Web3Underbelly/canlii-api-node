'use strict';

var api = require('../../lib/canlii'),
	config = require('../config.json');

describe('Setup', function() {
	it('should require a key', function () {
		var error = 0;

		try {
			api.caseBrowse();
		} catch (e) {
			error++;
		}
		error.should.eql(1);
	});

	it('should let you set a key', function() {
		api.config(config);
	});
});

describe('Legislation', function() {
	var db, legislation;

	it('should fetch legislative databases', function(done) {
		api.legislationBrowse({}, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('legislationDatabases');
			result.legislationDatabases.length.should.be.greaterThan(0);

			db = result.legislationDatabases[Math.floor(Math.random() * (result.legislationDatabases.length))];

			done();
		});
	});

	it('should fetch legislations', function(done) {
		api.legislationBrowse(db, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('legislations');
			result.legislations.length.should.be.greaterThan(0);

			legislation = result.legislations[Math.floor(Math.random() * (result.legislations.length))];

			done();
		});
	});

	it('should fetch legislation', function(done) {
		api.legislationBrowse(legislation, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('url');

			done();
		});
	});
});

describe('Cases', function() {
	var db, caseEntry;

	it('should fetch case databases', function(done) {
		api.caseBrowse({}, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('caseDatabases');
			result.caseDatabases.length.should.be.greaterThan(0);

			db = result.caseDatabases[Math.floor(Math.random() * (result.caseDatabases.length))];

			done();
		});
	});

	it('should fetch cases', function(done) {
		api.caseBrowse(db, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('cases');
			result.cases.length.should.be.greaterThan(0);

			caseEntry = result.cases[Math.floor(Math.random() * (result.cases.length))];

			done();
		});
	});

	it('should fetch case', function(done) {
		api.caseBrowse(caseEntry, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('url');

			done();
		});
	});
});

describe('Case Citator', function() {
	it('should fetch cited cases', function(done) {
		api.caseCitatorTease({
			databaseId: "csc-scc",
			caseId: "2008scc9",
			citatorType: 'citedCases'
		}, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('citedCases');
			done();
		})
	});

	it('should fetch citing cases', function(done) {
		api.caseCitatorTease({
			databaseId: "csc-scc",
			caseId: "2008scc9",
			citatorType: 'citingCases'
		}, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('citingCases');
			done();
		})
	});

	it('should fetch cited legislation', function(done) {
		api.caseCitatorTease({
			databaseId: "csc-scc",
			caseId: "2008scc9",
			citatorType: 'citedLegislations'
		}, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('citedLegislations');
			done();
		})
	});
});

describe('Search', function() {
	it('should search', function(done) {
		api.search({
			fullText: 'estoppel',
			resultCount: 7
		}, function(error, result) {
			if (error) {
				console.log(error);
			}
			result.should.have.property('results');
			result.results.length.should.eql(7);
			done();
		})
	});
});

describe('Query by URL', function() {
	it('should query cases', function(done) {
		api.queryByUrl('http://www.canlii.org/en/ca/scc/doc/2009/2009scc4/2009scc4.html', function(error, result) {
			result.citation.should.eql('2009 SCC 4, [2009] 1 SCR 104');
			done();
		});
	});

	it('should query legislation', function(done) {
		api.queryByUrl('http://www.canlii.org/en/ca/laws/stat/rsc-1985-c-c-46/latest/rsc-1985-c-c-46.html', function(error, result) {
			result.citation.should.eql('RSC 1985, c C-46');
			done();
		});
	});

	it('should query regulations', function(done) {
		api.queryByUrl('http://www.canlii.org/en/ca/laws/regu/si-93-169/latest/si-93-169.html', function(error, result) {
			result.citation.should.eql('SI/93-169');
			done();
		});
	});
});