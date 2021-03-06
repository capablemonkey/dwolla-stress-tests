var keys = require('../keys.js');
var arete = require('arete');
var dwolla = require('dwolla-node')(keys.appKey, keys.appSecret);

// flag to false to test production API
dwolla.sandbox = keys.sandbox;
dwolla.setToken(keys.accessToken);

// TEST 1: 
// (TODO: we may want to implement a specific interval between requests)

describe('Transactions / Send', function() {
	it('1000 Send requests in quick succession', function(done) {
		dwolla.setToken(keys.accessToken);

		arete.loadTest({
			name: 'send-1000',
			requests: 1000,
			concurrentRequests: 100,
			targetFunction: function(callback) {
				dwolla.send('9999', 'n@dwolla.com', 0.33, {destinationType: 'Email', notes: 'Thanks for the coffee!'}, callback);
			},
			printResponses: false,
			callback: done
		});

	});
});