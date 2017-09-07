"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const math = require("mathjs");
const _1 = require("../.");
const risk_json = require('../risk');
const trans = Object.freeze([
    Object.freeze({ age: 55, gender: 'male' }),
    Object.freeze({ age: 23, gender: 'female' }),
    Object.freeze({ age: 100, gender: 'male' }),
    Object.freeze({ age: 50, gender: 'male' }),
    Object.freeze({ age: 50, gender: 'male', sibling: true }),
    Object.freeze({ age: 50, gender: 'male', offspring: true })
]);
describe('test calc_relative_risk', () => {
    describe('barbados', () => {
        const study = 'barbados';
        it('calculates relative risk', () => {
            chai_1.expect(_1.calc_relative_risk(risk_json, Object.assign({ study }, trans[0]))).to.eql({
                age: 55,
                study: 'barbados',
                risk_per_study: {
                    barbados: {
                        _denominator: 100,
                        age: '50-59',
                        ci: '2.9-7.0',
                        gender: 'male',
                        max_prevalence: 4.6
                    },
                    framingham: {
                        age: '52-64',
                        gender: 'male',
                        meth2_prevalence: 1,
                        meth3_prevalence: 1.2,
                        n: 601,
                        oags: 6
                    },
                    ghana: { max_prevalence: 6.5, age: '55-59' },
                    japanese: { age: '50-59', gender: 'male', max_prevalence: 7.7 },
                    olmsted: { max_prevalence: 1.13260785, age: '50-59' },
                    singapore: {
                        _denominator: 100,
                        age: '50-59',
                        gender: 'male',
                        prevalence: 2.6
                    }
                },
                graphed_rr: [
                    { name: 'White [Framingham]', size: 1.2, value: 1.2 },
                    { name: 'Black [Barbados]', size: 4.6, value: 4.6 },
                    { name: 'Black [Ghana]', size: 6.5, value: 6.5 },
                    { name: 'Tajima [Japanese]', size: 7.7, value: 7.7 },
                    { name: 'White [Olmsted]', size: 1.13260785, value: 1.13260785 },
                    { name: 'Chinese [Singapore: urban]', size: 2.6, value: 2.6 }
                ],
                gender: 'male'
            });
        });
        it('correctly identifies most at risk', () => {
            const input = Object.assign({ study }, trans[2]);
            const risk = _1.risk_from_study(risk_json, input);
            chai_1.expect(risk).to.eql(24.8);
            const risks = _1.risks_from_study(risk_json, input);
            chai_1.expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });
        it('calculates added risk of family history', () => {
            const no_fam = { age: trans[3].age, gender: trans[4].gender, study };
            const fam = Object.assign({ study }, trans[4]);
            const no_fam_risk = _1.risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = _1.risk_from_study(risk_json, fam);
            const fam_risk = _1.combined_risk(_1.familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            chai_1.expect(no_fam_risk).to.eql(4.6);
            chai_1.expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });
    describe('framingham', () => {
        const study = 'framingham';
        it('calculates risk_from_study', () => {
            chai_1.expect(_1.risk_from_study(risk_json, Object.assign({ study }, trans[0]))).to.eql(1.2);
            chai_1.expect(_1.risk_from_study(risk_json, Object.assign({ study }, trans[1]))).to.eql(0.5);
        });
        it('correctly identifies most at risk', () => {
            const input = Object.assign({ study }, trans[2]);
            const risk = _1.risk_from_study(risk_json, input);
            chai_1.expect(risk).to.eql(5.6);
            const risks = _1.risks_from_study(risk_json, input);
            chai_1.expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });
        it('calculates added risk of family history', () => {
            const no_fam = { age: trans[3].age, gender: trans[4].gender, study };
            const fam = Object.assign({ study }, trans[4]);
            const no_fam_risk = _1.risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = _1.risk_from_study(risk_json, fam);
            const fam_risk = _1.combined_risk(_1.familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            chai_1.expect(no_fam_risk).to.eql(1.2);
            chai_1.expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });
    describe('olmsted', () => {
        const study = 'olmsted';
        it('calculates risk_from_study', () => {
            chai_1.expect(_1.risk_from_study(risk_json, Object.assign({ study }, trans[0]))).to.eql(1.13260785);
            chai_1.expect(_1.risk_from_study(risk_json, Object.assign({ study }, trans[1]))).to.eql(0.1895492496);
        });
        it('correctly identifies most at risk', () => {
            const input = Object.assign({ study }, trans[2]);
            const risk = _1.risk_from_study(risk_json, input);
            chai_1.expect(risk).to.eql(7.381032154);
            const risks = _1.risks_from_study(risk_json, input);
            chai_1.expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });
        it('calculates added risk of family history', () => {
            const no_fam = { age: trans[3].age, gender: trans[4].gender, study };
            const fam = Object.assign({ study }, trans[4]);
            const no_fam_risk = _1.risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = _1.risk_from_study(risk_json, fam);
            const fam_risk = _1.combined_risk(_1.familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            chai_1.expect(no_fam_risk).to.eql(1.13260785);
            chai_1.expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });
});
