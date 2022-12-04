import express from 'express';
import bodyParser from 'body-parser';
import { withdrawal } from './withdraw.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

var atmRouter = express.Router({mergeParams: true});

atmRouter.route('/withdrawal')
    .post(function (req, res, next) {
        return withdrawal(req, res, next);
    });

app.use('/atm', atmRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
