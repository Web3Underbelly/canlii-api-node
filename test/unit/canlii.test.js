describe('Test test', function() {
	it('should equal 123', function() {
		var api = require('../../lib/canlii'),
			error = 0;

		try {
			api.caseBrowse();
		} catch (e) {
			error++;
		}
		error.should.eql(1);

		api.config({
			key: '123'
		});
		try {
			api.caseBrowse();
		} catch (e) {
			error++;
		}
		error.should.eql(1);
	});
});