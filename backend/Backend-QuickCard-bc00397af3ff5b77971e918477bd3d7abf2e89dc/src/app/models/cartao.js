const mongoose = require('../../database');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const CartaoSchema = new mongoose.Schema({
    id_estudante: {
        type: ObjectId,
        require: true,
    },
    id_bloco_cartao: {
        type: ObjectId,
        require: true,
    },
    frente: {
        type: String,
        required: true,
    },
    verso: {
        type: String,
        required: true,
    }
});

const Cartao = mongoose.model('Cartao', CartaoSchema);

module.exports = Cartao;