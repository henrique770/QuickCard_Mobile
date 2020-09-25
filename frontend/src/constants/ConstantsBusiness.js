
const __DEV_MODE__ = true

// disabled console.error
console.reportErrorsAsExceptions = false;

const ConstantsBusiness = {

  IsDev : __DEV_MODE__ ,

  Url : __DEV_MODE__ ? 'http://192.168.1.8:3000/api/v1/' : 'https://quickcard-io.herokuapp.com/api/v1/' ,

  Hub : __DEV_MODE__ ? Object.freeze({
    host : '192.168.1.8' ,
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

}



export default ConstantsBusiness;
