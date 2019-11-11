var assert = require('assert');
var purchaseOrder = require('../purchaseOrder.js');

describe('Get Balance Factor Tests', () => {
  describe('Equivalence Class Tests', () => {

    it('Equivalence Test 1: return 0 if (balance <= 0)', () => {
      let params = {
        balance: -1
      };
      assert.equal(purchaseOrder.getBalanceFactor(params), 0);
    });

    it('Equivalence Test 2: return 6 if (1 <= balance < 100)', () => {
      let params = {
        balance: 10
      };
      assert.equal(purchaseOrder.getBalanceFactor(params), 6);
    });

    it('Equivalence Test 3: return 16 if (100 <= balance < 1000)', () => {
      let params = {
        balance: 200
      };
      assert.equal(purchaseOrder.getBalanceFactor(params), 16);
    });

    it('Equivalence Test 4: return 30 if (1000 <= balance < 10000)', () => {
      let params = {
        balance: 3000
      };
      assert.equal(purchaseOrder.getBalanceFactor(params), 30);
    });

    it('Equivalence Test 5: return 70 if (10000 <= balance < 30000)', () => {
      let params = {
        balance: 20000
      };
      assert.equal(purchaseOrder.getBalanceFactor(params), 70);
    });

    it('Equivalence Test 6: return 200 if (30000 <= balance < 50000)', () => {
      let params = {
        balance: 40000
      };
      assert.equal(purchaseOrder.getBalanceFactor(params), 200);
    });

    it('Equivalence Test 7: return 0 if (balance >= 50000)', () => {
      let params = {
        balance: 60000
      };
      assert.equal(purchaseOrder.getBalanceFactor(params), 0);
    });
  });

  describe('Boundary Value Tests', () => {
    it('Boundary Value Test 1: return 0 if (balance <= 0)', () => {
      var customer = {
        balance: -1,
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 0)
    });

    it('Boundary Value Test 2: return 0 if (balance <= 0)', function() {
      //balance = 0
      var customer = {
        balance: 0,
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 0)
    });

    it('Boundary Value Test 3: return 6 if (1 <= balance < 100)', function() {
      //balance = 1
      var customer = {
        balance: 1
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 6)
    });

    it('Boundary Value Test 4: return 6 if (1 <= balance < 100)', function() {
      //balance = 99
      var customer = {
        balance: 99
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 6)
    });

    it('Boundary Value Test 5: return 16 if (100 <= balance < 1000)', function() {
      var customer = {
        balance: 100
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 16)
    });

    it('Boundary Value Test 6: return 16 if (100 <= balance < 1000)', function() {
      //balance = 101
      var customer = {
        balance: 101
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 16)
    });


    it('Boundary Value Test 7: return 16 if (100 <= balance < 1000)', function() {
      //balance = 999
      var customer = {
        balance: 999
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 16)
    });

    it('Boundary Value Test 8: return 30 if (1000 <= balance < 10000)', function() {
      //balance = 1000
      var customer = {
        balance: 1000
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 30)
    });

    it('Boundary Value Test 9: if (1000 <= balance < 10000)', function() {
      //balance = 1001
      var customer = {
        balance: 1001
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 30)
    });


    it('Boundary Value Test 10: return 30 if (1000 <= balance < 10000)', function() {
      //balance = 9999
      var customer = {
        balance: 9999
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 30)
    });

    it('Boundary Value Test 11: return 70 if (10000 <= balance < 30000)', function() {
      //balance = 10000
      var customer = {
        balance: 10000
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 70)
    });


    it('Boundary Value Test 12: return 70 if (10000 <= balance < 30000)', function() {
      //balance = 10001
      var customer = {
        balance: 10001
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 70)
    });


    it('Boundary Value Test 13: return 70 if (10000 <= balance < 30000)', function() {
      //balance = 29999
      var customer = {
        balance: 29999
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 70)
    });

    it('Boundary Value Test 14: return 200 if (30000 <= balance < 50000)', function() {
      //balance = 30000
      var customer = {
        balance: 30000
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 200)
    });

    it('Boundary Value Test 15: return 200 if (30000 <= balance < 50000)', function() {
      //balance = 300001
      var customer = {
        balance: 30001
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 200)
    });

    it('Boundary Value Test 16: return 200 if (30000 <= balance < 50000)', function() {
      //balance = 49999
      var customer = {
        balance: 49999
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 200)
    });

    it('Boundary Value Test 17: return 0 if (balance >= 50000)', function() {
      //balance = 50000
      var customer = {
        balance: 50000,
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 0)
    });

    it('Boundary Value Test 18: return 0 if (balance >= 50000)', function() {
      //balance = 50001
      var customer = {
        balance: 50001,
      }
      assert.equal(purchaseOrder.getBalanceFactor(customer), 0)
    });
  });
});