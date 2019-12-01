const express = require('express');

const Anotacao = require('../models/anotacao.js');

const router = express.Router();

router.post('/anotacao', async(req, res) => {
    const { nome } = req.body;

    try { 
        if(await Anotacao.findOne({ nome }))
            return res.status(400).send({ error: 'Anotacao já existe'});

        const anotacao = await Anotacao.create(req.body);

        return res.send({ anotacao });
    } catch (err) {
        return res.status(400).send({ error: 'Registro falhou'});
    }
});

module.exports = app => app.use('/aut', router);
