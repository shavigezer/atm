import { DB } from './db.js'

export function withdrawal(req, res, next) {
  const {amount} = req.body;
  let current = amount;

  let billsArr = []
  let coinsArr = []

  // todo: order by bills first and by amount 
  const moneyUnits = DB.filter(u => u.amount > 0);

  for (let index = 0; index < moneyUnits.length; index++) {
    const mu = moneyUnits[index];
    const val = mu.value;
    const fit = Math.floor(current / val);
    
    if(fit > 0){
      let possible = Math.min(fit, mu.amount);

      if(mu.type === "BILL"){
        billsArr.push({[val]: possible});
      } else if(mu.type === "COIN") {
        coinsArr.push({[val]: possible});
      }
      
      current = parseFloat((current - (val * possible)).toFixed(2));
      // todo: update db data => subtract fit from mu.amount
    }
  }

  if(current > 0){
    res.status(409).send({ "max amount available for withdrawal:": (amount - current).toFixed(2) });
    next();
  }

  if(coinsArr.reduce((sum, curr) => sum + curr.fit, 0) > 50){
    // todo: define expections
    throw new Error("TooMuchCoinsException");
  }

  res.status(200).send({ "result": { "bills": billsArr, "coins": coinsArr }})
  next();
}
  