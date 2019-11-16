let purchaseOrder = require('../purchaseOrder.js');

const invalid = 'invalid';
const adverse = 'adverse';
const acceptable = 'acceptable';
const good = 'good';
const excellent = 'excellent';

describe('Account Status Tests', () => {
	/**
	 * Decision Table Tests
     * We are going to do a test for every range of age vs every range of balances
     * That way we will cover every combination of inputs and their outputs
     * We dont need EC or BV testing here because the DT tests will cover every input 
     * and the functions that account status uses will be EC and BV tested on their own
     **/
	describe('Decision Table Tests', () => {

		// setting up variable ranges  
		let ages = [
            {start: -50, end: 15}, // 0
            {start: 15, end: 20}, // 5
            {start: 20, end: 30}, // 10
            {start: 30, end: 40}, // 20
            {start: 40, end: 65}, // 50
            {start: 65, end: 111}, // 20
            {start: 111, end: 200}, // 0
        ];

        // range of balances
        let balances = [
            {start: -50, end: 1}, // 0
            {start: 1, end: 100}, // 6
            {start: 100, end: 500}, // 16
            {start: 500, end: 1000}, // 30
            {start: 1000, end: 3000}, // 70
            {start: 3000, end: 5000}, // 200
            {start: 5000, end: 6000}, // 0
        ];

        // manually calculated the return values
        let returns = [
            [invalid, invalid, invalid, invalid, invalid, invalid, invalid],
            [invalid, adverse, adverse, acceptable, acceptable, excellent, invalid],
            [invalid, adverse, acceptable, acceptable, good, excellent, invalid],
            [invalid, acceptable, acceptable, good, excellent, excellent, invalid],
            [invalid, acceptable, good, excellent, excellent, excellent, invalid],
            [invalid, acceptable, acceptable, good, excellent, excellent, invalid],
            [invalid, invalid, invalid, invalid, invalid, invalid, invalid],
        ];
        for (let i = 0; i < ages.length; i++) {

            let currAge = getRandInRange(ages[i].start, ages[i].end);
            // tc is to number the test output 
            let tc = 1;

            for (let j = 0; j < balances.length; j++) {

                let currBalance = getRandInRange(balances[j].start, balances[j].end);
                it(`Decision Table Test ${(i+1) + '-' + tc++}: Return ${returns[i][j]} for age = ${currAge} and balance = ${currBalance}`, () => {
                    let input = {
                        age: currAge,
                        balance: currBalance,
                    };
                    purchaseOrder.accountStatus(input) == returns[i][j];
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