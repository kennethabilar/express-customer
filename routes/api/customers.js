const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const customers = require('../../Customers');

router.get('/', (req, res) => res.json(customers));

router.get('/:id', (req, res) => {
    const exists = customers.some(customer => customer.id === parseInt(req.params.id));

    if(exists) {
        res.json(customers.filter(customer => customer.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ error: `Customer id ${req.params.id} not found`});
    }
});

router.post('/', (req, res) => {
    if(!req.body.name || !req.body.email) {
        res.status(400).json({ error: 'Customer name and email required'});
    } else {
        const newCustomer = {
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            is_active: false
        }

        customers.push(newCustomer);
        res.json(customers);
        // res.redirect('/');
    }
});

router.delete('/:id', (req, res) => {
    const exists = customers.some(customer => customer.id === parseInt(req.params.id));

    if(exists) {
        res.json(customers.filter(customer => customer.id !== parseInt(req.params.id)));
    } else {
        res.status(400).json({ error: `Customer ${req.params.id} not found`});
    }
});

router.put('/:id', (req, res) => {
    const exists = customers.some(customer => customer.id === parseInt(req.params.id));

    if(exists) {
        customers.forEach(customer => {
            if(customer.id === parseInt(req.params.id)) {
                customer.name = req.body.name ? req.body.name : customer.name;
                customer.email = req.body.email ? req.body.email : customer.email;
                customer.is_active = req.body.is_active ? true : false;
            }
        });

        res.json(customers);
    } else {
        res.status(400).json({ error: `Customer ${req.params.id} not found`});
    }
});

module.exports = router;
