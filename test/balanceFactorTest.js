/**
 * Code Written By :    Ammar Mirza
 * Student Number :     250486071
 * Email :              amirza28@uwo.ca
 * 
 * The test cases for this assignment were written with the PROVIDED purchaseOrder.js
 * The original purchaseOrder.js was modified because some of the brackets and conditional statements were incorrect 
 * and were causing errors. When running the tests please use the purchaseOrder.js file that was included in the submission.
 * All functions were tested implicitly and stub functions were not used. This is because it was simple enough to simulate
 * the function output values. Applicable Equivalence, Boundary and Decision testing was done based on the function being tested.
 */

let purchaseOrder = require('../purchaseOrder.js');
let assert = require('assert');

describe('Get Balance Factor Tests', () => {

	/**
	 * Equivalence test cases:
	 * Used to determine whether the function is returning the proper return value given the input
	 * The input will be a value between the boundaries of the if statements of the function and not the boundary values themselves
	 * we will save this for the boundary tests
	 */

	/**
	 * setting up the possible balance ranges, we will randomly select a value from here
	 * using getRandInRange(). Note: @start is inclusive and @end is exclusive
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

	/**
	 * the expected return values mapping to the balance ranges in @balances
	*/
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
				assert.equal(purchaseOrder.getBalanceFactor(input), ECreturns[i]);
			});
		}
    });
	
	
	/**
	 * A list of the possible boundary values that is one less, equal and one greater to the boundary being tested.
	 * E.g. if the boundary is 15 we will have 14, 15 and 16 in this list
	*/
    let balanceBoundaries = [
		-1, 0, 1, 99, 100, 101, 499, 500, 501, 999, 1000, 1001, 2999, 3000, 3001, 4999, 5000, 5001
	];

	/**
	 * The expected return values for the boundary being tested. Each return value maps
	 * to the same boundary in @balanceBoundaries
	*/
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
				assert.equal(purchaseOrder.getBalanceFactor(input), BCreturns[i]);
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