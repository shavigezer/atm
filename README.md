# atm

ATM Service

**Run locally:**

`npm i`

`npm start`

**Routes:**

`/withdrawal`:

Withdraw money by givern amount (Max amount for a single withdrawal is 2000)

Example:
```curl --location --request POST 'http://localhost:3000/atm/withdrawal' \
--header 'Content-Type: application/json' \
--data-raw '{
    "amount": 806.41
}'```
