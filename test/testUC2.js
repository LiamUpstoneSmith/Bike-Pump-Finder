const assert = require('assert');
const sinon = require('sinon');
process.env.NODE_ENV = 'test';
const main = require('../main');

describe("UC2: Find public bike pump by type", function() {

    it("should pass this test", function() {
        var s = "Hello, World!";
        assert.strictEqual(s,"Hello, World!");
    });

    it("should use the ejs view engine", function() {
        assert.strictEqual(main.app.get('view engine'),"ejs");
    });

    it("should connect to the database", function(done) {
        main.connection.ping(function(err) {
            assert.strictEqual(err,null);
            done();
        });
    });

    it("should call render with type", function(done) {
        var request = { query: { type: 'TYPE' }};
        var response = { 
            render(ejs, data) {
                assert.strictEqual(data.type,'TYPE');
                done();
            }
        }
        main.splash(request, response);
    });

    it("should call render without type", function(done) {
        var request = { query: {}};
        var response = { render(ejs, data) {} };
        var spy = sinon.spy(response,'render');
        main.splash(request, response);
        main.connection.ping(function(err) {
            sinon.assert.called(spy);
            done();
        });
    });

    it("should respond with 500 internal server error, with type", function(done) {
        // stub simulates a database error
        var stub = sinon.stub(main.connection, "query").callsFake(function(query,args,fn) {
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

        main.connection.ping(function(err) {
            sinon.assert.called(spy1);
            sinon.assert.called(spy2);
            stub.restore();
            done();
        });
    });

    it("should respond with 500 internal server error, without type", function(done) {
        // stub simulates a database error
        var stub = sinon.stub(main.connection, "query").callsFake(function(query,fn) {
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
        
        main.connection.ping(function(err) {
            sinon.assert.called(spy1);
            sinon.assert.called(spy2);
            stub.restore();
            done();
        });
    });

    after(function(done) {
        main.connection.end();
        done();
    });
});



