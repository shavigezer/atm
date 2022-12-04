import { DB } from './db.js'

export function withdrawal(req, res) {
    // const {amount} = req.params;
    let amount = 806.41;
    let current = amount;

  let billsArr = []
  let coinsArr = []

  const moneyUnits = DB.filter(u => u.amount > 0);
  // order by

  for (let index = 0; index < moneyUnits.length; index++) {
    const mu = moneyUnits[index];
    const val = mu.value;
    const fit = Math.floor(current / val);
    // 
    if(fit > 0){
      let possible = Math.min(fit, mu.amount);

      if(mu.type === "BILL"){
        billsArr.push({[val]: possible});
      } else if(mu.type === "COIN") {
        coinsArr.push({[val]: possible});
      }
      
    //   console.log(parseFloat(amount - (val * possible)));
      current -= (val * possible);
      // todo: update db data => subtract fit from moneyUnits[i].amount
    }
  }

  if(current > 0){
    res.status(409).send({ "max amount available for withdrawal:": amount - current });
  }

  if(coinsArr.reduce((sum, curr) => sum + curr.fit, 0) > 50){
    throw new TooMuchCoinsException;
  }

  return res.status(200).send({ "result": { "bills": billsArr, "coins": coinsArr }})
}

// console.log(withdrawal(837.44));
  