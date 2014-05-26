"use strict";

describe('Util#join', function() {
	var util = require('../../lib/util');

	it('should create a URL with url parts only', function() {
		var url = util.join({
			first: 1,
			second: 2,
			third: 3,
			fourth: 4,
			fifth: 5
		}, ['first','second','third'],['q1','q2']);
		url.should.eql('1/2/3');
	});

	it('should create a URL with url parts and query parts', function() {
		var url = util.join({
			first: 1,
			second: 2,
			third: 3,
			fourth: 4,
			fifth: 5,
			q1: 'with space',
			q2: 5
		}, ['first','second','third'],['q1','q2']);
		url.should.eql('1/2/3?q1=with%20space&q2=5');
	});

	it('url parts should stop at two', function() {
		var url = util.join({
			first: 1,
			second: 2,
			fourth: 4,
			fifth: 5
		}, ['first','second','third','fourth','fifth'],['q1','q2']);
		url.should.eql('1/2');
	});

	it('url parts should stop at two but query parts should keep going', function() {
		var url = util.join({
			first: 1,
			second: 2,
			fourth: 4,
			fifth: 5,
			q2: 5
		}, ['first','second','third','fourth','fifth'],['q1','q2']);
		url.should.eql('1/2?q2=5');
	});
});