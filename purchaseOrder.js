
var getAgeFactor=function(clientAccount ){ 
    var factor;

    if (clientAccount.age <15 || clientAccount.age > 110){
        factor = 0;
    }
    else  if (clientAccount.age <20){
        factor = 5;
    }
    else if (clientAccount.age <30){
        factor= 10;
    }
    else if (clientAccount.age <40){
        factor=20;
    }
    else if (clientAccount.age <65){
        factor =50;
    }
    else if (clientAccount.age <=110){
        factor =20;
    }
    return factor;
    
}

var getBalanceFactor=function (clientAccount ){    
    var factor;
    
    if (clientAccount.balance <= 0 || clientAccount.balance >= 5000){
        factor = 0; 
    }
    else if (clientAccount.balance < 100){
        factor = 6;
    }
    else if (clientAccount.balance < 500){
        factor = 16;
    }
    else if (clientAccount.balance < 1000){
        factor = 30;
    }
    else if (clientAccount.balance < 3000){
        factor = 70;
    }
    else if (clientAccount.balance < 5000){
        factor = 200;
    }
    return factor;

}

var accountStatus = function (clientAccount) {
    var factor1 = getAgeFactor(clientAccount);
    var factor2 = getBalanceFactor(clientAccount);
   
    var factor3 = factor1 * factor2;
    
    if (factor3 == 0){
        return "invalid"
    }
    else if (factor3 < 100){
        return "adverse";
    }
    else if (factor3 < 500){
        return "acceptable";
    }
    else if (factor3 < 1000){
        return "good"
    }
    else{
        return "excellent";
    }  
}

var creditStatus = function (clientAccount,creditCheckMode){
    var scoreThreshold;
    if (clientAccount.creditScore < 0 || clientAccount.creditScore > 100){
        return "invalid";
    }
    if (creditCheckMode ==="restricted"){ // dont know what strict is, changed it to restricted
        scoreThreshold=50;
    }else if (creditCheckMode ==="default"){
        scoreThreshold=75;
    }
    if (clientAccount.creditScore < scoreThreshold){ 
        // the sign before was >, when it should have been <
        return "adverse";
    }    
     else return "good";

}

// p1 --- thresh -- quantity

var productStatus=function (product,inventory,inventoryThreshold){ 
    var q;
   
    for (let i = 0; i < inventory.length; i++) { // changed <= to just < cause it was iterating too many times
        if (product == inventory[i].name) {
            q = inventory[i].q;
            if(0 <= inventoryThreshold && inventoryThreshold <= 1000){ // added this to make sure inventoryThreshold is between 0 and 1000
                if( q < 0 || q > 1000){ // added this because it never hit the return state below
                    return "invalid";
                }
                else if (q==0){
                    return "soldout";
                }else if (q < inventoryThreshold){ // changed > to < since the doc has it like that
                    return "limited"
                } else if (q >= inventoryThreshold){ // changed to >= because the doc has it like that.
                    return "available"
                }
            }
            
		}
    }
 return "invalid";
}


var orderHandling=function(clientAccount ,product,inventory,inventoryThreshold,creditCheckMode)

{

    var aStautus=accountStatus(clientAccount );

    var cStatus=creditStatus(clientAccount ,creditCheckMode);

    var pStatus=productStatus(product,inventory,inventoryThreshold);


   if ((aStautus==="invalid"||cStatus==="invalid"||pStatus!= "invalid")|| 
   (aStautus==="acceptable" &&  cStatus==="adverse" && pStatus!="available") ||     
   (aStautus==="adverse" && cStatus==="good" && pStatus==="soldout") || 
   (aStautus==="adverse" && cStatus==="adverse" ))
        return "rejected";

 else if ((aStautus==="excellent")|| (aStautus==="good" && cStatus==="good")||
(aStautus=== "acceptable" && cStatus==="good" && 	pStatus==="available"))
        return "accepted";


else if ((aStautus==="good" && cStatus ==="adverse")||(aStautus==="acceptable" && cStatus==="adverse"
 && pStatus==="available"))
        return "underReview";

else if ((aStautus ==="acceptable" && cStatus==="good" && pStatus!="available")
||(aStautus==="adverse" && cStatus==="good" && pStatus==="limited"))
        return "pending";





}

module.exports = {
    getAgeFactor:getAgeFactor,
    getBalanceFactor: getBalanceFactor,
    accountStatus: accountStatus,
    creditStatus: creditStatus,
    creditStatus: creditStatus,
    productStatus: productStatus,
    orderHandling:orderHandling
};