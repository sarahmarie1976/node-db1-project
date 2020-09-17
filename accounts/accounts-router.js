const express = require('express');
const { as } = require('../data/dbConfig.js');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: 'error getting accounts', error: err });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [account] = await db('accounts').where({ id });

        if (account) {
            res.json(account);
        } else {
            res.status(404).json({ message: 'bad id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'db error', error: err });
    }
});

router.post('/', async (req, res) => {

    const newAccount = req.body;

    try {
        const account = await db('accounts').insert(newAccount);
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({ message: 'error inserting', error: err });
    }
});

router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const changes = req.body;

    try {
        const count = await db('accounts').update(changes).where({ id });

        if (count) {
            res.json({ updated: count });
        } else {
            res.status(404).json({ message: 'invalid id' });
        }
    } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'error updating', error: err });
    }
});

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const count = await db('accounts').where({ id }).del();

        if (count) {
            res.json({ deleted: count });
        } else {
            res.status(404).json({ message: 'invalid id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'error deleting', error: err });
    }

});


module.exports = router;