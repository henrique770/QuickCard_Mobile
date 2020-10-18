
const __DEV_MODE__ = true
  , URL_HOST_DEV = '192.168.1.2'
  , PORT_HOST_DEV = 3000

// disabled console.error
console.reportErrorsAsExceptions = false;

const Url = __DEV_MODE__ ? `http://${URL_HOST_DEV}:${PORT_HOST_DEV}/api/v1/` : 'https://quickcard-io.herokuapp.com/api/v1/' 

export { Url }

const path = {
  pending : '/pending'
}

export { path }

const Hub = __DEV_MODE__ ? {
  host : URL_HOST_DEV ,
  port : PORT_HOST_DEV,
  pathPeer : '/webrtc',
  api: 'api/v1/',
} : {
  host : 'quickcard-io.herokuapp.com' ,
  port : '80',
  pathPeer : '/webrtc/peerjs',
  api: 'api/v1/',
}

export { Hub }

const DataBase = {
  databaseName : 'QuickCard',
  databasePath : '~QuickCard.db',
  debug : false
}

export { DataBase }

const Card = {
  //hits
  hitEasyTime : 24 * 3 , // hours * day -- value in hours
  hitGoodTime : 24 * 1 , // hours * day -- value in hours
  hitDifficultTime : 10, // minutes

  //enum hit
  codDefault : 0,
  codEasy : 1,
  codGood : 2,
  codDifficult : 3,

  dateLimit : 24 * 30 * 3// 1 day * 30 day * COUNT month -- value in hours
}

export { Card }


const Note = { 

  maxLengthTitle : 25
  , defaultTitle : 'Título'
}

export { Note }


const NotePad = {
  defaultNotePadName : 'bloco padrão'
}

export { NotePad }

const Validators = {

  _minimumPasswordCharacters : 6

  , email : email => /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email) 

  , password : password => password.length >= Validators._minimumPasswordCharacters
} 

export { Validators }

const Messenger = {
  MSG000 : /****/ '' 
  , MSG001 : /**/ 'O nome é obrigatório.'
  , MSG002 : /**/ 'Insira um e-mail válido.'
  , MSG003 : /**/ 'O e-mail é obrigatório.'
  , MSG001 : /**/ 'O nome é obrigatório.'
  , MSG002 : /**/ 'Insira um e-mail válido.'
  , MSG003 : /**/ 'O e-mail é obrigatório.'
  , MSG004 : /**/ 'A senha precisa ter no mínimo 6 caracteres.'
  , MSG005 : /**/ 'A senha é obrigatória.'
  , MSG006 : /**/ 'Ops! No momento não temos dados para mostrar.'
  , MSG007 : /**/ 'Criado! Criado com sucesso.'
  , MSG008 : /**/ 'Alterado! Alterado com sucesso.'
  , MSG009 : /**/ 'E-mail inválido.'
  , MSG010 : /**/ 'As senhas não conferem.'
  , MSG011 : /**/ 'Falhou! Falha na criação.'
  , MSG012 : /**/ 'Falhou! Falha na atualização'
  , MSG013 : /**/ 'Falha na remoção!'
  , MSG014 : /**/ 'Parabéns! Você terminou de responder o baralho!'
  , MSG015 : /**/ 'Senha inválida.'
  , MSG016 : /**/ 'Erro no servidor.'
  , MSG017 : /**/ 'Alerta: Você tem certeza que quer excluir?'
  , MSG018 : /**/ 'Alerta: Selecione um baralho.'
  , MSG019 : /**/ 'Falha na conexão.'
  , MSG020 : /**/ 'Verifique sua conexão com a internet.'
  /**
   * TODO: ATUALIZAR DOCUMENTO - MSG021
   */
  , MSG021 : /**/ 'Falha na autenticação.' 
  , MSG022 : /**/ 'Falha no cadastro.'
  , MSG023 : /**/ 'Pefil atualizado com sucesso.'
  , MSG024 : /**/ 'Falha no processo de autenticação'
  , MSG025 : /**/ 'Falha ao se comunicar com o servidor'
  , MSG026 : /**/ 'Sim'
  , MSG027 : /**/ 'Não'
  , MSG028 : /**/ 'A anotação não pode esta vazia'
  , MSG029 : /**/ 'Anotação adicionada com sucesso'
}

export { Messenger }

/*
const ConstantsBusiness = {

  IsDev : __DEV_MODE__ ,

  Url : __DEV_MODE__ ? 'http://192.168.1.2:3000/api/v1/' : 'https://quickcard-io.herokuapp.com/api/v1/' ,

  Path : Object.freeze({
    pending : '/pending'
  }) ,

  Hub : __DEV_MODE__ ? Object.freeze({
    host : '192.168.1.2' ,
    port : '3000',
    pathPeer : '/webrtc',
    api: 'api/v1/',
  }) : Object.freeze({
    host : 'quickcard-io.herokuapp.com' ,
    port : '80',
    pathPeer : '/webrtc/peerjs',
    api: 'api/v1/',
  }),

  DataBase : Object.freeze({
    databaseName : 'QuickCard',
    databasePath : '~QuickCard.db',
    debug : false
  }),

  Card : Object.freeze({
    //hits
    hitEasyTime : 24 * 3 , // hours * day -- value in hours
    hitGoodTime : 24 * 1 , // hours * day -- value in hours
    hitDifficultTime : 10 , // minutes

    //enum hit
    codDefault : 0,
    codEasy : 1,
    codGood : 2,
    codDifficult : 3,

    dateLimit : 24 * 30 * 3// 1 day * 30 day * COUNT month -- value in hours
  })

  , MENSAGEIRO : {
    MSG_001_ALERTA : 'alerta'
  }
}



export default ConstantsBusiness;
*/
