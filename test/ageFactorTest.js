let assert = require('assert');
let purchaseOrder = require('../purchaseOrder.js');

describe('Get Age Factor Tests', () => {
	/**
	 * Equivalence test cases:
	 * Used to determine whether the function is returning the proper return value given the input
	 * The input will be a value between the boundaries of the if statements of the function and not the boundary values themselves
	 * we will save this for the boundary tests
	 */

	let ages = [
		{start: -50, end: 15}, // 0
		{start: 15, end: 20}, // 5
		{start: 20, end: 30}, // 10
	   	{start: 30, end: 40}, // 20
	   	{start: 40, end: 65}, // 50
	   	{start: 65, end: 110}, // 20
	   	{start: 110, end: 200}, // 0
	];

	let ECreturns = [
		0, 5, 10, 20, 50, 20, 0
	];

	describe('Equivalence Class Tests', () => {

		for (let i = 0; i < ages.length; i++) {
            let currAge = getRandInRange(ages[i].start, ages[i].end);
			it(`Equivalence Test ${(i+1)}: Return ${ECreturns[i]} for age = ${currAge}`, () => {
				let input = {
					age: currAge,
				};
				assert.equal(purchaseOrder.getAgeFactor(input), ECreturns[i]);
			});
		}
	});

	let agesBoundaries = [
		14, 15, 16, 19, 20, 21, 29, 30, 31, 39, 40, 41, 64, 65, 66, 109, 110, 111
	];
	let BCreturns = [
		0, 5, 5, 5, 10, 10, 10, 20, 20, 20, 50, 50, 50, 20, 20, 20, 20, 0,
	];

	/**
   * Boundary tests are used to test the boundaries of the if statements of the function we are testing.
   * For example if there is an if statement checking the value of a variable between (0, 10] then we
   * will input values 0, 1, 9 and 10 to check if the function returns properly
   */
	describe('Boundary Class Tests', () => {
		for (let i = 0; i < BCreturns.length; i++) {
			it(`Boundary Test ${(i+1)}: Return ${BCreturns[i]} for age = ${agesBoundaries[i]}`, () => {
				let input = {
					age: agesBoundaries[i],
				};
				assert.equal(purchaseOrder.getAgeFactor(input), BCreturns[i]);
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