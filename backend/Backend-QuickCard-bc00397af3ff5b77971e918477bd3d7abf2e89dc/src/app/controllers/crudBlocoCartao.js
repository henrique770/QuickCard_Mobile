const express = require('express');

const BlocoCartao = require('../models/blocoCartao.js');

const router = express.Router();

router.post('/blocoCartao', async(req, res) => {
    const { nome_bloco_cartao } = req.body;

    try { 
        if(await BlocoCartao.findOne({ nome_bloco_cartao }))
            return res.status(400).send({ error: 'BlocoCartao já existe'});

        const blocoCartao = await BlocoCartao.create(req.body);

        return res.send({ blocoCartao });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

module.exports = app => app.use('/aut', router);
