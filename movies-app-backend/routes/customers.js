const express = require('express');
const router = express.Router();
router.use(express.json());
const {Customer , validateCustomer} = require('../models/customer');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');


router.get('/' , asyncMiddleware(async(req , res) => {
    const customers = await Customer.find(); 
    res.send(customers);
}));

router.get('/:id' , asyncMiddleware(async (req , res) => {
const customer = await Customer.findById(req.params.id);
if(!customer) return res.status(404).send('your customer not found!');
res.send(customer);
}));

router.post('/', auth , asyncMiddleware(async (req , res) => {
const {error} = validateCustomer(req.body);

if(error) return res.status(400).send(error.details[0].message);
    
let customer = new Customer({name: req.body.name , isGold: req.body.isGold , phone: req.body.phone});

customer =  await customer.save();
res.send(customer);
}));

router.put('/:id' , [auth , admin] , asyncMiddleware(async (req , res) =>{
const {error} = validateCustomer(req.body);
if(error) return res.status(400).send(error.details[0].message);

const customer = await Customer.findByIdAndUpdate(req.params.id , {name: req.body.name})

if(!customer) return res.status(404).send('The customer with a given id not found!');
res.send(customer);
}));

router.delete('/:id' , [auth , admin] , asyncMiddleware(async (req , res) =>{
const customer = await Customer.findByIdAndRemove(req.params.id);
if(!customer) res.status(404).send('The customer with a given id not found!');
res.send(customer);
}));

module.exports = router;