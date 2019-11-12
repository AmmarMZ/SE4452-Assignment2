let assert = require('assert');
let purchaseOrder = require('../purchaseOrder.js');

const INVALID = 'invalid';
const SOLDOUT = 'soldout';
const LIMITED = 'limited';
const AVAILABLE = 'available';
const PRODUCTNAME = 'productName';
const INVENTORYTHRESHOLD = 50;

describe('Product Status Tests', () => {
  describe('Equivalence Class Tests', () => {

    it(`Equivalence Test 1: return ${SOLDOUT} if (quantity == 0)`, () => {
      let inventory = [];
      inventory.push({
          name: PRODUCTNAME,
          q: 0
      });
      assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), SOLDOUT);
    });

    it(`Equivalance Test 2: return ${LIMITED} if (quantity == 25)`, () => {
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 25
        });
        assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), LIMITED);
      });

      it(`Equivalance Test 3: return ${AVAILABLE} if(quantity -- 25)`, () => {
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 50
        });
        assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), AVAILABLE);
      });

  });

  describe('Boundary Value tests', () => {
    it('Boundary Value Test 1: Quantity below lower bound', () => {
      let inventory = [];
      inventory.push({
          name: PRODUCTNAME,
          q: -1
      });
      assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), INVALID);
    });

    it('Boundary Value Test 2: Quantity at lower bound', () => {
      let inventory = [];
      inventory.push({
          name: PRODUCTNAME,
          q: 0
      });
      assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), SOLDOUT);
    });

    it('Boundary Value Test 3: Quantity above lower bound', () => {
      let inventory = [];
      inventory.push({
          name: PRODUCTNAME,
          q: 1
      });
      assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), LIMITED);
    });

    it('Boundary Value Test 4: Quantity below upper bound', () => {
      let inventory = [];
      inventory.push({
          name: PRODUCTNAME,
          q: 49
      });
      assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), LIMITED);
    });

    it('Boundary Value Test 5: Quantity at upper bound', () => {
      let inventory = [];
      inventory.push({
          name: PRODUCTNAME,
          q: 50
      });
      assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), AVAILABLE);
    });

    it('Boundary Value Test 6: Quantity above upper bound', () => {
      let inventory = [];
      inventory.push({
          name: PRODUCTNAME,
          q: 51
      });
      assert.equal(purchaseOrder.productStatus.productStatus(PRODUCTNAME, inventory, INVENTORYTHRESHOLD), AVAILABLE);
    });
  });
});