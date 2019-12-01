const express = require('express');

const Cartao = require('../models/cartao.js');

const router = express.Router();

router.post('/cartao', async(req, res) => {
    const { frente } = req.body;

    try { 
        if(await Cartao.findOne({ frente }))
            return res.status(400).send({ error: 'Cartao já existe'});

        const cartao = await Cartao.create(req.body);

        return res.send({ cartao });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

module.exports = app => app.use('/aut', router);
