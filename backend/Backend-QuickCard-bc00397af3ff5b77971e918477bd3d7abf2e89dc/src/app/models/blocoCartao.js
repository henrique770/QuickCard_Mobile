const mongoose = require('../../database');

const BlocoCartaoSchema = new mongoose.Schema({
    nome_bloco_cartao: {
        type: String,
        required: true,
    }
});

const BlocoCartao = mongoose.model('BlocoCartao', BlocoCartaoSchema);

module.exports = BlocoCartao;