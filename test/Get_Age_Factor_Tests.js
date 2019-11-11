let assert = require('assert');
let purchaseOrder = require('../purchaseOrder.js');

describe('Get Age Factor Tests', () => {
  describe('Equivalence Class Tests', () => {

    it('Equivalence Test 1: Return 0 if (age < 5)', () => {
      let params = {
        age: 2,
      };
      assert.equal(purchaseOrder.getAgeFactor(params), 0);
    });

    it('Equivalence Test 2: return 5 if (5 <= age < 10)', () => {
      let params = {
        age: 7,
      };
      assert.equal(purchaseOrder.getAgeFactor(params), 5);
    });

    it('Equivalence Test 3: return 10 if (10 <= age < 18)', () => {
      let params = {
        age: 15,
      };
      assert.equal(purchaseOrder.getAgeFactor(params), 10);
    });


    it('Equivalence Test 4: return 20 if (18 <= age < 30)', () => {
      let params = {
        age: 25,
      };
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });


    it('Equivalence Test 5: return 50 if (30 <= age < 70)', () => {
      let params = {
        age: 40,
      };
      assert.equal(purchaseOrder.getAgeFactor(params), 50);
    });

    it('Equivalence Test 6: return 20 if (70 <= age <= 120)', () => {
      let params = {
        age: 90,
      };
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });

    it('Equivalence Test 7: return 0 if (age >= 120)', () => {
      let params = {
        age: 130,
      };
      assert.equal(purchaseOrder.getAgeFactor(params), 0);
    });

  });

  describe('Boundary Value Tests', () => {
    it('Boundary Value Test 1: return 0 if (age < 5)', () => {
      let params = {
        age: 4,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 0);
    });

    it('Boundary Value Test 2: return 5 if (5 <= age < 10)', () => {
      let params = {
        age: 5,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 5);
    });

    it('Boundary Value Test 3: return 5 if (5 <= age < 10)', () => {
      let params = {
        age: 6,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 5);
    });

    it('Boundary Value Test 4: return 5 if (5 <= age < 10)', () => {
      let params = {
        age: 9,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 5);
    });

    it('Boundary Value Test 5: return 10 if (10 <= age < 18)', () => {
      let params = {
        age: 10,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 10);
    });

    it('Boundary Value Test 6: return 10 if (10 <= age < 18)', () => {
      let params = {
        age: 11,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 10);
    });
    
    it('Boundary Value Test 7: return 10 if (10 <= age < 18)', () => {
      let params = {
        age: 17,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 10);
    });

        
    it('Boundary Value Test 8: return 20 if (18 <= age < 30)', () => {
      let params = {
        age: 18,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });

        
    it('Boundary Value Test 9: return 20 if (18 <= age < 30)', () => {
      let params = {
        age: 19,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });

        
    it('Boundary Value Test 10: return 20 if (18 <= age < 30)', () => {
      let params = {
        age: 29,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });

    it('Boundary Value Test 11: return 50 if (30 <= age < 70)', () => {
      let params = {
        age: 30,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 50);
    });

    it('Boundary Value Test 12: return 50 if (30 <= age < 70)', () => {
      let params = {
        age: 31,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 50);
    });

    it('Boundary Value Test 13: return 50 if (30 <= age < 70)', () => {
      let params = {
        age: 69,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 50);
    });

    it('Boundary Value Test 14: return 20 if (70 <= age <= 120)', () => {
      let params = {
        age: 70,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });
    
    it('Boundary Value Test 15: return 20 if (70 <= age <= 120)', () => {
      let params = {
        age: 71,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });

    it('Boundary Value Test 16: return 20 if (70 <= age <= 120)', () => {
      let params = {
        age: 119,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });

    it('Boundary Value Test 17: return 20 if (70 <= age <= 120)', () => {
      let params = {
        age: 120,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 20);
    });

    it('Boundary Value Test 18: return 0 if (age > 120)', () => {
      let params = {
        age: 121,
      }
      assert.equal(purchaseOrder.getAgeFactor(params), 0);
    });
  });
});