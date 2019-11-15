let assert = require('assert');
let purchaseOrder = require('../purchaseOrder.js');

const invalid = 'invalid';
const adverse = 'adverse';
const good = 'good';

const ccmRestricted = 'restricted';
const ccmDefault = 'default';

describe('Credit Status Tests', () => {
	/**
	 * Decision Table Tests
     * We are going to do a test for every range of age vs every range of balances
     * That way we will cover every combination of inputs and their outputs
     * We dont need EC or BV testing here because the DT tests will cover every input 
     * and the functions that account status uses will be EC and BV tested on their own
     **/
	describe('Decision Table Tests', () => {

		// setting up variable ranges  
		let creditScore = [
            {start: -100, end : 0}, 
            {start: 0, end: 50},
            {start: 50, end: 75},
            {start: 75, end: 101},
            {start: 101, end: 200},
        ];

        let creditCheckModes = [
            ccmRestricted, ccmDefault,
        ]

        // manually calculated the return values
        let returns = [
            [invalid, invalid],
            [adverse, adverse],
            [good, adverse],
            [good, good],
            [invalid, invalid],
        ];
        // tc is to number the test output 
        let tc = 1;
        for (let i = 0; i < creditScore.length; i++) {

            let currCredit = getRandInRange(creditScore[i].start, creditScore[i].end);
            tc = 1;

            for (let j = 0; j < creditCheckModes.length; j++) {
                it(`Decision Table Test ${(i+1) + '-' + tc++}: Return ${returns[i][j]} for credit score = ${currCredit} and credit check mode = ${creditCheckModes[j]}`, 
                 () => {
                    let input = {
                        creditScore: currCredit,
                    };
                    assert.equal(purchaseOrder.creditStatus(input, creditCheckModes[j]), returns[i][j]);
                });
            }
        }	
	});
});

/**
 * 
 * @param {int} min - inclusive
 * @param {int} max - exclusive
 *  Gets a random value in within the range instead of hard coding a value from the range
 */
function getRandInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}