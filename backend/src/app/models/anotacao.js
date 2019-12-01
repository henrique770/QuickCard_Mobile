const mongoose = require('../../database');

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const AnotacaoSchema = new mongoose.Schema({
    id_estudante: {
        type: ObjectId,
        require: true,
    },
    id_bloco_anotacao: {
        type: ObjectId,
        require: true,
    },
    nome: {
        type: String,
        required: true,
    },
    conteudo: {
        type: String,
        required: true,
    }
});

const Anotacao = mongoose.model('Anotacao', AnotacaoSchema);

module.exports = Anotacao;