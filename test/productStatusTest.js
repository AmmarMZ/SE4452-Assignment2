let purchaseOrder = require('../purchaseOrder.js');

const product1 = 'product1';
const product2 = 'product2';

const invalid = 'invalid';
const soldout = 'soldout';
const available = 'available';
const limited = 'limited';

describe('Product Status Tests', () => {
	/**
	 * Decision Table Tests
     * We are going to do a test for every range of age vs every range of balances
     * That way we will cover every combination of inputs and their outputs
     * We dont need EC or BV testing here because the DT tests will cover every input 
     * and the functions that account status uses will be EC and BV tested on their own
     **/
    describe('Decision Table Tests', () => {

        // set up a few ranges that are outside and inside the acceptable thresholds
        let inventoryThresholds = [
            { start: -50, end: 0 },
            { start: 250, end: 251 },
            { start: 500, end: 501 },
            { start: 750, end: 751 },
            { start: 1000, end: 1001 },
            { start: 1001, end: 2000 },
        ];

        // set up a few quantities outside and inside the acceptable ranges
        let quantities = [
            { start: -50, end: 0 },
            { start: 0, end: 1 },
            { start: 1, end: 250 },
            { start: 250, end: 500 },
            { start: 500, end: 750 },
            { start: 750, end: 1001 },
            { start: 1001, end: 1500 },

        ]

        let returns = [
            [invalid, invalid, invalid, invalid, invalid, invalid, invalid],
            [invalid, soldout, limited, available, available, available, invalid],
            [invalid, soldout, limited, limited, available, available, invalid],
            [invalid, soldout, limited, limited, limited, available, invalid],
            [invalid, soldout, limited, limited, limited, limited, invalid],
            [invalid, invalid, invalid, invalid, invalid, invalid, invalid],
            
        ]

        // We know that if the products are not the same we return 'invalid'
        // however we do not need to add another for loop to add test cases where 
        // the product != inventory.name because we will never pass the if statement and 
        // the Test cases will be redundant
        // For this for loop we are assuming that the productName = inventory.name
        // Then we can loop through the possible thresholds and quantities to simulate 
        // every possible output for every possible input

        for (let j = 0; j < inventoryThresholds.length; j++) {
            let tc = 1;
            let currThresh = getRandInRange(inventoryThresholds[j].start, inventoryThresholds[j].end);
            for (let k = 0; k < quantities.length; k++) {
                let currQuant = getRandInRange(quantities[k].start, quantities[k].end);
                let inv = [];
                inv.push({
                    name: product1,
                    q: currQuant
                });

                it(`Decision Table Test ${(j + 1) + '-' + tc++}: Return ${returns[j][k]} for quantity = ${currQuant} and threshold = ${currThresh}`, () => {
                    purchaseOrder.productStatus(product1, inv, currThresh) == returns[j][k];
                });
            }
        }
    });

    // Here we have a test case when product != inventory.name which should return invalid. This only needs to be 
    // tested once since the function will return invalid no matter what we set the other parameters
    describe('Equivalence Class Tests', () => {
        it(`Equivalence Class Test 1: Return ${invalid} for quantity = anyValue and threshold = anyValue when product != inventory.name` , () => {
            let inv = [];
                inv.push({
                    name: product1,
                    q: getRandInRange(-100, 2000),
                });
            purchaseOrder.productStatus(product2, inv, getRandInRange(-100, 2000)) == invalid;
        });
    });

    describe('Boundary Value Tests - Keeping product == inventory.name', () => {
        let thresholdBounds = [
            -1, 0, 1, 999, 1000, 1001
        ];
        let inventoryBounds = [
            -1, 0, 1, 999, 1000, 1001
        ]
        let BVreturns = [
            [invalid, invalid, invalid, invalid, invalid, invalid],
            [invalid, soldout, available, available, available, invalid],
            [invalid, soldout, available, available, available, invalid],
            [invalid, soldout, limited, available, available, invalid],
            [invalid, soldout, limited, limited, available, invalid],
            [invalid, invalid, invalid, invalid, invalid, invalid],
        ]
        for (let i = 0; i < thresholdBounds.length; i++) {
            let currThresh = thresholdBounds[i];
            let tc = 1
            for (let j = 0; j < inventoryBounds.length; j++) {
                let currQuant = inventoryBounds[j];
                let inv = [];
                inv.push({
                    name: product1,
                    q: currQuant
                })
                it(`Boundary Value Test ${(i + 1) + '-' + tc++}: Return ${BVreturns[i][j]} for quantity = ${currQuant} and threshold = ${currThresh}`, () => {
                    purchaseOrder.productStatus(product1, inv, currThresh) == BVreturns[i][j];
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