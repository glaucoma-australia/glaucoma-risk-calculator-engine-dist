"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var __1 = require("./..");
var risk_json = require('../risk');
describe('test all refs', function () {
    it('gets all refs', function () {
        chai_1.expect(__1.get_all_refs(risk_json)).to.have.lengthOf(8);
    });
});
