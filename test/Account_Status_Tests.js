let assert = require('assert');
let purchaseOrder = require('../purchaseOrder.js');

const INVALID = 'invalid';
const GOOD = 'good';
const VERYGOOD = 'very good';
const POOR = 'poor';

describe('Account Status Tests', () => {
  describe('Equivalence Class Tests', () => {

    it(`Equivalent Test 1: return ${INVALID} if (age < 5)`, () => {
      let params = {
        age: 2,
        balance: 500,
        creditScore: 50
      };
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Equivalent Test 2: return ${GOOD} if (5 <= age <= 120)`, () => {
      let params = {
        age: 50,
        balance: 500,
        creditScore: 50
      };
      assert.equal(purchaseOrder.AccountStatus.accStat(params), GOOD);
    });

    it(`Equivalent Test 3: return ${INVALID} if (age > 120)`, () => {
      let params = {
        age: 130,
        balance: 500,
        creditScore: 50
      };
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Equivalent Test 4: return ${INVALID} if (balance < 0)`, () => {
      let params = {
        age: 20,
        balance: -500,
        creditScore: 50
      };
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Equivalent Test 5: return ${VERYGOOD} if (0 <= balance <= 50000)`, () => {
      let params = {
        age: 20,
        balance: 10000,
        creditScore: 50
      };
      assert.equal(purchaseOrder.AccountStatus.accStat(params), VERYGOOD);
    });

    it(`Equivalent Test 6: return ${INVALID} if (balance > 50000)`, () => {
      let params = {
        age: 20,
        balance: 60000,
        creditScore: 50
      };
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });
  });

  describe('Boundary Value Tests', () => {
    it(`Boundary Value Test 1: return ${INVALID} if (age < 5 && balance = any value)`, () => {
      let params = {
        age: 4,
        balance: -1,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Boundary Value Test 2: return ${INVALID} if (age < 5 && balance = any value)`, () => {
      let params = {
        age: 4,
        balance: 0,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Boundary Value Test 3: return ${INVALID} if (age < 5 && balance = any value)`, () => {
      let params = {
        age: 4,
        balance: 10,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Boundary Value Test 4: return ${INVALID} if (age < 5 && balance = any value)`, () => {
      let params = {
        age: 4,
        balance: 100,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Boundary Value Test 5: return ${INVALID} if (age < 5 && balance = any value)`, () => {
      let params = {
        age: 4,
        balance: 1000,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });
    
    it(`Boundary Value Test 6: return ${INVALID} if (age < 5 && balance = any value)`, () => {
      let params = {
        age: 4,
        balance: 10000,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Boundary Value Test 7: return ${INVALID} if (age < 5 && balance = any value)`, () => {
      let params = {
        age: 4,
        balance: 30000,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it(`Boundary Value Test 8: return ${INVALID} if (age < 5 && balance = any value)`, () => {
      let params = {
        age: 4,
        balance: 50000,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });


    it('Boundary Value Test 9: age and balance', () => {
      let params = {
        age: 5,
        balance: 0,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it('Boundary Value Test 10: age and balance', () => {
      let params = {
        age: 6,
        balance: 1,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), POOR);
    });

    it('Boundary Value Test 11: age and balance', () => {
      let params = {
        age: 119,
        balance: 49999,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), VERYGOOD);
    });

    it('Boundary Value Test 12: age and balance', () => {
      let params = {
        age: 120,
        balance: 50000,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });

    it('Boundary Value Test 13: age and balance', () => {
      let params = {
        age: 121,
        balance: 50001,
      }
      assert.equal(purchaseOrder.AccountStatus.accStat(params), INVALID);
    });
  });
});