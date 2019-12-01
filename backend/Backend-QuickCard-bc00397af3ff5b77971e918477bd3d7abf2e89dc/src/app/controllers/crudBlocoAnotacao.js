const express = require('express');

const BlocoAnotacao = require('../models/blocoAnotacao.js');

const router = express.Router();

router.post('/blocoAnotacao', async(req, res) => {
    const { nome_bloco_anotacao } = req.body;

    try { 
        if(await BlocoAnotacao.findOne({ nome_bloco_anotacao }))
            return res.status(400).send({ error: 'BlocoAnotacao já existe'});

        const blocoAnotacao = await BlocoAnotacao.create(req.body);

        return res.send({ blocoAnotacao });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

module.exports = app => app.use('/aut', router);
