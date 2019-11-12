let assert = require('assert');
let purchaseOrder = require('../purchaseOrder.js');

const INVALID = 'invalid';
const GOOD = 'good';
const BAD = 'bad';
const RESTRICTED = 'restricted';
const DEFAULT = 'default';

describe('Credit Status Tests', () => {
  describe('Equivalence Class Tests', () => {

    it(`Equivalence Test 1: return ${INVALID} if (creditScore < 0)`, () => {
      let params = {
        creditScore: -1
      };
      assert.equal(purchaseOrder.creditStatus.creditStatus(params, RESTRICTED), INVALID);
    });

    it(`Equivalence Test 2: return ${GOOD} if (0 < creditScore < 100)`, () => {
        let params = {
          creditScore: 50
        };
        assert.equal(purchaseOrder.creditStatus.creditStatus(params, RESTRICTED), GOOD);
      });

      it(`Equivalence Test 3: return ${INVALID} if (creditScore > 100)`, () => {
        let params = {
          creditScore: 110
        };
        assert.equal(purchaseOrder.creditStatus.creditStatus(params, RESTRICTED), INVALID);
      });

      it(`Equivalence Test 4: return ${GOOD} if (creditCheckMode == ${RESTRICTED})`, () => {
        let params = {
          creditScore: 50
        };
        assert.equal(purchaseOrder.creditStatus.creditStatus(params, RESTRICTED), GOOD);
      });

      it(`Equivalence Test 5: return ${BAD} if (creditCheckMode == ${DEFAULT})`, () => {
        let params = {
          creditScore: 80
        };
        assert.equal(purchaseOrder.creditStatus.creditStatus(params, RESTRICTED), GOOD);
      });

  });

  describe('Boundary Value Tests', () => {
    it('Boundary Value Test 1: Credit Score below lower bound', () => {
      let params = {
        creditScore: -1
      }
      assert.equal(purchaseOrder.creditStatus.creditStatus(params, DEFAULT), INVALID)
    });

    it('Boundary Value Test 2: Credit Score at lower bound', () => {
      let params = {
        creditScore: 0
      }
      assert.equal(purchaseOrder.creditStatus.creditStatus(params,DEFAULT), BAD)
    });

    it('Boundary Value Test 3: Credit Score above lower bound', () => {
      let params = {
        creditScore: 1
      }
      assert.equal(purchaseOrder.creditStatus.creditStatus(params,DEFAULT), BAD)
    });

    it('Boundary Value Test 4: Credit score below upper bound', () => {
      let params = {
        creditScore: 99
      }
      assert.equal(purchaseOrder.creditStatus.creditStatus(params, DEFAULT), GOOD)
    });

    it('Boundary Value Test 5: Credit score at upper bound', () => {
      let params = {
        creditScore: 100
      }

      assert.equal(purchaseOrder.creditStatus.creditStatus(params, DEFAULT), GOOD)
    });

    it('Boundary Value Test 6: Credit score above upper bound', () => {
      let params = {
        creditScore: 101
      }
      assert.equal(purchaseOrder.creditStatus.creditStatus(params, DEFAULT), INVALID)
    });
  });
});