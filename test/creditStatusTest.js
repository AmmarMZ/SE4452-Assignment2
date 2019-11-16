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


const invalid = 'invalid';
const adverse = 'adverse';
const good = 'good';

const ccmRestricted = 'restricted';
const ccmDefault = 'default';

let creditCheckModes = [
	ccmRestricted, ccmDefault,
];
describe('Credit Status Tests', () => {
	/**
	 * Decision Table Tests
     * We are going to do a test for every range of credit score vs every credit check mode
     * That way we will cover every combination of inputs and their outputs
     **/
	describe('Decision Table Tests', () => {

		/**
		 * setting up the possible credit score ranges, we will randomly select a value from here
		 * using getRandInRange(). Note: @start is inclusive and @end is exclusive
		*/
		let creditScore = [
			{ start: -100, end: 0 },
			{ start: 0, end: 50 },
			{ start: 50, end: 75 },
			{ start: 75, end: 101 },
			{ start: 101, end: 200 },
		];

		 /**
		 * setting up the expected output values of the function being tested.
		 * These values were calculated manually
		 */
		let returns = [
			[invalid, invalid],
			[adverse, adverse],
			[good, adverse],
			[good, good],
			[invalid, invalid],
		];
		for (let i = 0; i < creditScore.length; i++) {

			let currCredit = getRandInRange(creditScore[i].start, creditScore[i].end);
			// tc is to number the test output 
			let tc = 1;

			for (let j = 0; j < creditCheckModes.length; j++) {
				it(`Decision Table Test ${(i + 1) + '-' + tc++}: Return ${returns[i][j]} for credit score = ${currCredit} and credit check mode = ${creditCheckModes[j]}`,
					() => {
						let input = {
							creditScore: currCredit,
						};
						assert.equal(purchaseOrder.creditStatus(input, creditCheckModes[j]), returns[i][j]);
					});
			}
		}
	});

	
	/**
	 * A list of the possible boundary values that is one less, equal and one greater to the boundary being tested.
	 * E.g. if the boundary is 15 we will have 14, 15 and 16 in this list
	*/
	let creditScoreBoundaries = [
		-1, 0, 1, 99, 100, 101
	];

	/**
	 * The expected return values for the boundary being tested. We have 2 expected outputs per input
	 * because we will need to map each boundary to both credit check modes
	 * Each return value maps to the same boundary in @creditScoreBoundaries
	*/
	let BCreturns = [
		[invalid, invalid],
		[adverse, adverse],
		[adverse, adverse],
		[good, good],
		[good, good],
		[invalid, invalid],	
	];


	describe('Boundary Value Tests', () => {
		for (let i = 0; i < creditScoreBoundaries.length; i++) {

			let currCredit = creditScoreBoundaries[i];
			for (let j = 0; j < creditCheckModes.length; j++) {

				it(`Boundary Test ${(i + 1)}: Return ${BCreturns[i][j]} for credit score = ${currCredit} and credit check mode = ${creditCheckModes[j]}`, () => {
					let input = {
						creditScore: currCredit,
					};
					assert.equal(purchaseOrder.creditStatus(input, creditCheckModes[j]),BCreturns[i][j]);
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