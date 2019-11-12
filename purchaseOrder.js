var getAgeFactor = function(clientAccount) { 
    var factor;

    if (clientAccount.age < 5 || clientAccount.age > 120) {
        factor = 0;
    }
    else  if (clientAccount.age < 10) {
        factor = 5;
    }
    else if (clientAccount.age < 18) {
        factor = 10;
    }
    else if (clientAccount.age < 30) {
        factor = 20;
    }
    else if (clientAccount.age < 70) {
        factor = 50;
    }
    else if (clientAccount.age <= 120) {
        factor = 20;
    }
    return factor;
};

var getBalanceFactor = function (clientAccount) {
    var factor;
    //FIXED balance >= 50000 to include 50000
    if (clientAccount.balance <= 0 || clientAccount.balance >= 50000){
        factor = 0;
    }
    else if (clientAccount.balance < 100) {
        factor = 6;
    }
    else if (clientAccount.balance < 1000) {
        factor = 16;
    }
    else if (clientAccount.balance < 10000) {
        factor = 30;
    }
    else if (clientAccount.balance < 30000) {
        factor = 70;
    }
    else if ( clientAccount.balance < 50000) {
        factor = 200;
    }
    return factor;
};

var AccountStatus = {accountStatus : function (clientAccount) {

    var factor1 = getAgeFactor(clientAccount);

    var factor2 = getBalanceFactor(clientAccount);

    var factor3 = factor1 * factor2;
    
    if (factor3 == 0) {
        return "invalid";
    }
    else if (factor3 < 100) {
        return "poor";
    }
    else if (factor3 < 500) {
       return "fair";
    }
    else if (factor3 < 1000) {
        return "good"
    }
    else {
        return "very good";
    }
}};

var creditStatus = {creditStatus : function (clientAccount, creditCheckMode) {
    var scoreThreshold;

    if (clientAccount.creditScore < 0 || clientAccount.creditScore > 100)
       return "invalid";
    //FIXED changed to be restricted instead of strict as per docs provided
    if (creditCheckMode === "restricted") {
        scoreThreshold = 50;
    }
    else if (creditCheckMode === "default") {
        scoreThreshold = 75;
    }
    //FIXED changed to be < because the doc says so
    if (clientAccount.creditScore < scoreThreshold) {
        return "bad";
    }
    else {
        return "good";
    }

}};

var productStatus = {productStatus : function (product, inventory, inventoryThreshold) { 
    var q;

    for (let i = 0; i <= inventory.length; i++) {
        if (product == inventory[i].name) {
            q = inventory[i].q;
            if(q < 0) {
                return "invalid";
            }
          	if (q == 0) {
                return "soldout";
            }
            else if (q < inventoryThreshold) {
                return "limited"
            }
            else {
                return "available"
            }
		}
    }
    return "invalid";
}};


var orderHandling = function(clientAccount, product, inventory, inventoryThreshold, creditCheckMode) {

    var aStatus = AccountStatus.accountStatus(clientAccount);

    var cStatus = creditStatus.creditStatus(clientAccount, creditCheckMode);

    var pStatus = productStatus.productStatus(product, inventory, inventoryThreshold);

    if ((aStatus === "invalid" || cStatus === "invalid" || pStatus === "invalid") 
    || (aStatus === "fair" &&  cStatus === "bad" && pStatus != "available") 
    || (aStatus === "poor" && cStatus === "good" && pStatus === "soldout") 
    || (aStatus === "poor" && cStatus === "bad" )) {
        return "rejected";
    }

    else if ((aStatus === "very good") || (aStatus === "good" && cStatus === "good") 
    || (aStatus != "good" && cStatus === "good" && pStatus === "available")) {
        return "accepted";
    }

    else if ((aStatus === "good" && cStatus === "bad") || (aStatus === "fair" && cStatus === "bad" && pStatus === "available")) {
        return "underReview";
    }

    else if ((aStatus === "fair" && cStatus === "good" && pStatus != "available") 
    || (aStatus === "poor" && cStatus === "good" && pStatus === "limited")) {
        return "pending";
    }
};

//ADDED to be able to access all the functions from the test suites.
module.exports = {
    getAgeFactor:getAgeFactor,
    getBalanceFactor: getBalanceFactor,
    AccountStatus: AccountStatus,
    creditStatus: creditStatus,
    creditStatus: creditStatus,
    productStatus: productStatus,
    orderHandling:orderHandling
};