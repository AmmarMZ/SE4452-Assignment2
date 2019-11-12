let assert = require('assert');
let purchaseOrder = require('../purchaseOrder.js');
let sinon = require('sinon');

const STATUS_INVALID = 'invalid';
const STATUS_REJECTED = 'rejected';
const STATUS_ACCEPTED = 'accepted';
const STATUS_UNDERREVIEW = 'underReview';
const STATUS_PENDING = 'pending';


const PRODUCTNAME = 'productName';
const CREDIT_STRICT = 'strict';
const FAIR = 'fair';
const BAD = 'bad';
const LIMITED = 'limited';
const POOR = 'poor';
const GOOD = 'good';
const SOLDOUT = 'soldout';
const AVAILABLE = 'available';
const VERYGOOD = 'very good';

const FUNCTION_ACCOUNTSTATUS = 'accountStatus';
const FUNCTION_CREDITSTATUS = 'creditStatus';
const FUNCTION_PRODUCTSTATUS = 'productStatus'

describe('orderHandling Testing', function() {
    /**
     * Decision table tests will test the functions using different arrangements of variables
     */
  describe('Decision Table tests', () => {
      
    this.beforeEach(() => {
        stubFunction = sinon.stub(purchaseOrder.AccountStatus, FUNCTION_ACCOUNTSTATUS);
        stubFunction1 = sinon.stub(purchaseOrder.creditStatus, FUNCTION_CREDITSTATUS);
        stubFunction2 = sinon.stub(purchaseOrder.productStatus, FUNCTION_PRODUCTSTATUS);

    });
    this.afterEach(() => {
        stubFunction.restore();
        stubFunction1.restore();
        stubFunction2.restore();
    });

    it(`Decision Test 1: return ${STATUS_REJECTED}`, () =>  {
        stubFunction.onCall(0).returns(STATUS_INVALID);
        stubFunction1.onCall(0).returns(STATUS_INVALID);
        stubFunction2.onCall(0).returns(STATUS_INVALID);
        let customer = {
            age: 2,
            balance: 500,
            creditScore: -1
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: -1   
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_REJECTED);
    });

    it(`Decision Test 2: return ${STATUS_REJECTED}`, () =>  {
        stubFunction.onCall(0).returns(FAIR);
        stubFunction1.onCall(0).returns(BAD);
        stubFunction2.onCall(0).returns(LIMITED);
        let customer = {
            age: 60,
            balance: 80,
            creditScore: 20
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 20
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_REJECTED);
    });

    it(`Decision Test 3: return ${STATUS_REJECTED}`, () =>  {
        stubFunction.onCall(0).returns(POOR);
        stubFunction1.onCall(0).returns(GOOD);
        stubFunction2.onCall(0).returns(SOLDOUT);
        let customer = {
            age: 9,
            balance: 90,
            creditScore: 60
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 0
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_REJECTED);
    });

    it(`Decision Test 4: return ${STATUS_REJECTED}`, () =>  {
        stubFunction.onCall(0).returns(POOR);
        stubFunction1.onCall(0).returns(BAD);
        stubFunction2.onCall(0).returns(AVAILABLE);
        let customer = {
            age: 9,
            balance: 90,
            creditScore: 20
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 60
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_REJECTED);
    });

    it(`Decision Test 5: return ${STATUS_ACCEPTED}`, () =>  {
        stubFunction.onCall(0).returns(VERYGOOD);
        stubFunction1.onCall(0).returns(BAD);
        stubFunction2.onCall(0).returns(AVAILABLE);
        let customer = {
            age: 20,
            balance: 10000,
            creditScore: 20
        };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 60
        });
        let inventoryThreshold = 50;
        let creditCheckMode = "strict";
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, creditCheckMode), STATUS_ACCEPTED);
    });

    it(`Decision Test 6: return ${STATUS_ACCEPTED}`, () =>  {
        stubFunction.onCall(0).returns(GOOD);
        stubFunction1.onCall(0).returns(GOOD);
        stubFunction2.onCall(0).returns(AVAILABLE);
        let customer = {
            age: 50,
            balance: 500,
            creditScore: 50
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 60
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_ACCEPTED);
    });

    it(`Decision Test 7: return ${STATUS_ACCEPTED}`, () =>  {
        stubFunction.onCall(0).returns(POOR);
        stubFunction1.onCall(0).returns(GOOD);
        stubFunction2.onCall(0).returns(AVAILABLE);
        let customer = {
            age: 15,
            balance: 90,
            creditScore: 60
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 60
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_ACCEPTED);
    });

    it(`Decision Test 8: return ${STATUS_ACCEPTED}`, () =>  {
        stubFunction.onCall(0).returns(FAIR);
        stubFunction1.onCall(0).returns(GOOD);
        stubFunction2.onCall(0).returns(AVAILABLE);
        let customer = {
            age: 60,
            balance: 80,
            creditScore: 60
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 60
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_ACCEPTED);
    });

    it(`Decision Test 9: return ${STATUS_UNDERREVIEW}`, () =>  {
        stubFunction.onCall(0).returns(GOOD);
        stubFunction1.onCall(0).returns(BAD);
        stubFunction2.onCall(0).returns(AVAILABLE);
        let customer = {
            age: 60,
            balance: 900,
            creditScore: 20
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 60
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_UNDERREVIEW);
    });

    it(`Decision Test 10: return ${STATUS_UNDERREVIEW}`, () =>  {
        stubFunction.onCall(0).returns(FAIR);
        stubFunction1.onCall(0).returns(BAD);
        stubFunction2.onCall(0).returns(AVAILABLE);
        let customer = {
            age: 60,
            balance: 80,
            creditScore: 20
        };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 80
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_UNDERREVIEW);
    });

    it(`Decision Test 11: return ${STATUS_PENDING}`, () =>  {
        stubFunction.onCall(0).returns(FAIR);
        stubFunction1.onCall(0).returns(GOOD);
        stubFunction2.onCall(0).returns(SOLDOUT);
        let customer = {
            age: 60,
            balance: 80,
            creditScore: 60
        };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 0
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_PENDING);
    });

    it(`Decision Test 12: return ${STATUS_PENDING}`, () =>  {
        stubFunction.onCall(0).returns(POOR);
        stubFunction1.onCall(0).returns(GOOD);
        stubFunction2.onCall(0).returns(LIMITED);
        let customer = {
            age: 15,
            balance: 90,
            creditScore: 60
          };
        let inventory = [];
        inventory.push({
            name: PRODUCTNAME,
            q: 20
        });
        let inventoryThreshold = 50;
        assert.equal(purchaseOrder.orderHandling(customer, PRODUCTNAME, inventory, inventoryThreshold, CREDIT_STRICT), STATUS_PENDING);
    });
  });
});