const assert = require('assert');
const { stub } = require('sinon');
const sinon = require('sinon');
process.env.NODE_ENV = 'test';
const main = require('../main');

describe("UC1: Find nearest bike pump", function() {

    it("should set status 500 on database error", function() {
        var response = { 
            status(code) { assert.strictEqual(code,500); },
            send(err) { assert.strictEqual(err,'ERROR'); }
        }
        // spies
        var spy1 = sinon.spy(response,'status');
        var spy2 = sinon.spy(response,'send');
        main.internalServerError(response, 'ERROR');
        sinon.assert.called(spy1);
        sinon.assert.called(spy2);
    });

});
