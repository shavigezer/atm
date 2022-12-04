/* input: 
{
  "currency": "ILS",
  "amount": 837.44,
}
*/

/* output:
{
  "result": {
      "bills": [{"200": 4, "20": 1 }],
      "coins": [{"10": 1, "1": 7, "0.1": 4, "0.01": 4]
}
*/

/*
DB

Type | Value | Amount

------------------

BILL | 200   | 7

BILL | 100   | 4

COIN | 10    | 0

COIN | 5     | 1

COIN | 0.1   | 12

COIN | 0.01  | 21
*/

/*
amount in decimal
biggest bills & coins possible
BILLS over COINS
no money - 409 with max
50 coins - throw exception
*/

/*
overview steps:
extract param.amount
use the amount and check how many times an existing bill/coin can fit in, reduce it from the amount and continue
extract bill/coin from db > devide and reduce possible value from amount > continue to next bill/coin
reduce = save in object
return json obj
*/

/*
option2 use % to iterate over
*/

/*
example:
floor(840/200) if 7 >= 4 - take and reduce if 2 < 4 - move to next, take and reduce 2 > next value
*/

import express from 'express';
import { withdrawal } from './withdraw.js'

const app = express()
const port = 3000

// break into nested atm
app.get('/atm/withdrawal', (req, res) => {
    return withdrawal(req, res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
