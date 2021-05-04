const unit = require('unit.js');
const sinon = require('sinon');
process.env.NODE_ENV = 'test';
const main = require('../main');

describe("Integration tests", function() {
    var qstub;

    before(function() {
        // stubbed connection.query() simulates a database success and is synchronous
        qstub = sinon.stub(main.connection, "query").callsFake(function(query,fn) {
            fn(null,[ { Type:'T', Name:'N', 'Maintained by':'M' } ],null);
        });
    });

    it("index OK", function(done) {
        this.timeout(5000);
        unit
            .httpAgent(main.app)
            .get("/index.html")
            .expect(200,done);
    });

    after(function() {
        qstub.restore();
    });

});