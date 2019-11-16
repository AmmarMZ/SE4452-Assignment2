let purchaseOrder = require('../purchaseOrder.js');

describe('Get Balance Factor Tests', () => {
	/**
	 * Equivalence test cases:
	 * Used to determine whether the function is returning the proper return value given the input
	 * The input will be a value between the boundaries of the if statements of the function and not the boundary values themselves
	 * we will save this for the boundary tests
	 */

    let balances = [
        {start: -50, end: 0}, // 0
        {start: 0, end: 100}, // 6
        {start: 100, end: 500}, // 16
        {start: 500, end: 1000}, // 30
        {start: 1000, end: 3000}, // 70
        {start: 3000, end: 5000}, // 200
        {start: 5000, end: 6000}, // 0
    ];

	let ECreturns = [
		0, 6, 16, 30, 70, 200, 0
	];

	describe('Equivalence Class Tests', () => {

		for (let i = 0; i < balances.length; i++) {
            let currBalance = getRandInRange(balances[i].start, balances[i].end);
			it(`Equivalence Test ${(i+1)}: Return ${ECreturns[i]} for balance = ${currBalance}`, () => {
				let input = {
					balance: currBalance,
				};
				purchaseOrder.getBalanceFactor(input) == ECreturns[i];
			});
		}
    });
    
    let balanceBoundaries = [
		-1, 0, 1, 99, 100, 101, 499, 500, 501, 999, 1000, 1001, 2999, 3000, 3001, 4999, 5000, 5001
	];
	let BCreturns = [
		0, 0, 6, 6, 16, 16, 16, 30, 30, 30, 70, 70, 70, 200, 200, 200, 0, 0
	];

	/**
   * Boundary tests are used to test the boundaries of the if statements of the function we are testing.
   * For example if there is an if statement checking the value of a variable between (0, 10] then we
   * will input values 0, 1, 9 and 10 to check if the function returns properly
   */
	describe('Boundary Class Tests', () => {
		for (let i = 0; i < BCreturns.length; i++) {
			it(`Boundary Test ${(i+1)}: Return ${BCreturns[i]} for balance = ${balanceBoundaries[i]}`, () => {
				let input = {
					balance: balanceBoundaries[i],
				};
				purchaseOrder.getBalanceFactor(input) == BCreturns[i];
			});
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