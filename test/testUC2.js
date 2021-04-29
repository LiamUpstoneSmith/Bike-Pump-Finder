const assert = require('assert');
const { stub } = require('sinon');
const sinon = require('sinon');
process.env.NODE_ENV = 'test';
const main = require('../main');

describe("UC2: Find public bike pump by type (database success cases)", function() {

    it("should pass this test", function() {
        var s = "Hello, World!";
        assert.strictEqual(s,"Hello, World!");
    });

    it("should use the ejs view engine", function() {
        assert.strictEqual(main.app.get('view engine'),"ejs");
    });

    it("should call render with type", function() {
        // stubbed connection.query() simulates a database success and is synchronous
        var qstub = sinon.stub(main.connection, "query").callsFake(function(query,args,fn) {
            fn(null,[ { Type:'T', Name:'N', 'Maintained by':'M' } ],null);
        });
        var request = { query: { type: 'TYPE' }};
        var response = { 
            render(ejs, data) { assert.strictEqual(data.type,'TYPE'); }
        }
        main.splash(request, response);
        qstub.restore();
    });

    it("should call render without type", function() {
        // stubbed connection.query() simulates a database success and is synchronous
        var qstub = sinon.stub(main.connection, "query").callsFake(function(query,fn) {
            fn(null,[ { Type:'T', Name:'N', 'Maintained by':'M' } ],null);
        });
        var request = { query: {}};
        var response = { render(ejs, data) {} };
        var spy = sinon.spy(response,'render');
        main.splash(request, response);
        sinon.assert.called(spy);
        qstub.restore();
    });

});

describe("UC2: Find public bike pump by type (database error cases)", function() {

    it("should respond with 500 internal server error, with type", function() {
        // stubbed connection.query() simulates a database error and is synchronous
        var qstub = sinon.stub(main.connection, "query").callsFake(function(query,args,fn) {
            fn('ERROR',null,null);
        });
        var request = { query: { type: 'TYPE' }};
        var response = { 
            status(code) { assert.strictEqual(code,500); },
            send(err) { assert.strictEqual(err,'ERROR'); }
        }
        // spies
        var spy1 = sinon.spy(response,'status');
        var spy2 = sinon.spy(response,'send');

        main.splash(request, response);

        sinon.assert.called(spy1);
        sinon.assert.called(spy2);
        qstub.restore();
    });

    it("should respond with 500 internal server error, without type", function() {
        // stubbed connection.query() simulates a database error and is synchronous
        var qstub = sinon.stub(main.connection, "query").callsFake(function(query,fn) {
            fn('ERROR',null,null);
        });
        var request = { query: {}};
        var response = { 
            status(code) { assert.strictEqual(code,500); },
            send(err) { assert.strictEqual(err,'ERROR'); }
        }
        // spies
        var spy1 = sinon.spy(response,'status');
        var spy2 = sinon.spy(response,'send');

        main.splash(request, response);
        
        sinon.assert.called(spy1);
        sinon.assert.called(spy2);
        qstub.restore();
    });

});
