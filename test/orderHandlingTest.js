let purchaseOrder = require('../purchaseOrder.js');

const ccmRestricted = 'restricted';
const prod1 = 'product1';

const rejected = 'rejected';
const accepted = 'accepted';
const underReview = 'underReview';
const pending = 'pending';


describe('Order Handling Tests', () => {
	/**
	 * Decision Table Tests
     * We are going to do a test for every range of age vs every range of balances
     * That way we will cover every combination of inputs and their outputs
     * We dont need EC or BV testing here because the DT tests will cover every input 
     * and the functions that account status uses will be EC and BV tested on their own
     **/
	describe('Decision Table Tests', () => {

        // Because we already have tests for each function
        // we only need inputs that simulate the results of accountStatus
        // creditStatus and product Status respectively
         
        // params for accountStatus() within orderHandling() that will
        // simulate the following outputs
		let accountStatuses = [
            {age: 0, balance: 0}, // returns invalid
            {age: 17, balance: 50}, // returns adverse
            {age: 17, balance: 750}, // returns acceptable
            {age: 25, balance: 2000}, // returns good
            {age: 25, balance: 4000}, // returns excellent
        ];

        
        // params for creditStatus() within orderHandling() that will
        // simulate the following outputs
        let creditStatuses = [
            {creditScore: -50, creditCheckMode: ccmRestricted}, // returns invalid
            {creditScore: 25, creditCheckMode: ccmRestricted}, // returns adverse
            {creditScore: 65, creditCheckMode: ccmRestricted}, // returns good
        ]

        // params for productStatus() within orderHandling() that will
        // simulate the following outputs
        let productStatuses = [
            {name: prod1, threshold: -5, q: -200}, // returns invalid
            {name: prod1, threshold: 250, q: 0}, // returns soldout
            {name: prod1, threshold: 250, q: 240}, // returns limited
            {name: prod1, threshold: 250, q: 300}, // returns available
        ]

        let returns = [
            [
                [rejected, rejected, rejected, rejected], // [0][0][k]
                [rejected, rejected, rejected, rejected], // [0][1][k]
                [rejected, rejected, rejected, rejected], // [0][2][k]
            ],
            [
                [rejected, rejected, rejected, rejected], // [1][0][k]
                [rejected, rejected, rejected, rejected], // [1][1][k]
                [undefined, rejected, rejected, rejected], // [1][2][k]
            ],
            [
                [rejected, rejected, rejected, rejected], // [2][0][k]
                [rejected, rejected, undefined, rejected], // [2][1][k]
                [pending, rejected, rejected, rejected], // [2][2][k]
            ],
            [
                [rejected, rejected, rejected, rejected], // [3][0][k]
                [underReview, rejected, rejected, rejected], // [3][1][k]
                [accepted, rejected, rejected, rejected], // [3][2][k]
            ],
            [
                [rejected, rejected, rejected, rejected], // [4][0][k]
                [accepted, rejected, rejected, rejected], // [4][1][k]
                [accepted, rejected, rejected, rejected], // [4][2][k]
            ]
        ];

        // combining all 3 functions will give us 60 possible unqiue combinations of 
        // the results of the 3 functions within orderHandling and thus 
        // cover all possible conditional and output paths
        
        let temp = 1;
        for (let i = 0; i < accountStatuses.length; i++) {

            let currClientAccount = {
                age: accountStatuses[i].age,
                balance: accountStatuses[i].balance,
            };
            for (let j = 0; j < creditStatuses.length; j++) {
                currClientAccount.creditScore = creditStatuses[j].creditScore;
                    for (let k = 0; k < productStatuses.length; k++) {
                    let inv = [];
                    inv.push({
                        name: productStatuses[k].name,
                        q: productStatuses[k].q,
                    });

                   it(`Decision Table Test ${(i + 1) + '-' + (j + 1) + '-' + (k+1)}: Return ${returns[i][j][k]}`, () => {	
					    purchaseOrder.orderHandling(currClientAccount, prod1, inv, productStatuses[k].threshold, ccmRestricted) == returns[i][j][k];
					});
                }
            }
        }
    });
});
