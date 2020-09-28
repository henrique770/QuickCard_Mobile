
import NetInfo from "@react-native-community/netinfo";

const notificationsType = {
  IS_CONNECTED : '@netInfo/IS_CONNECTED'
  , IS_DISCONNECTED : '@netInfo/IS_DISCONNECTED'
}

class NetInfoObserverService {

  constructor() {
    this.observers = []
    this._isStart = false
  }

  get Observers() { return this.observers }

  /**
   * Start observation
   */
  start() {
    if(!this._isStart) {
      this._isStart = true
      this._listenEventConnected()
    }
  }

  stop() {
    this._isStart = false
  }

  /**
   * add observer
   * @param type {string}
   * @param fb {Function|AsyncFunction}
   */
  subscribe(type, fb) {

    this.observers.push(this._creatSubscribe(type, fb))
  }

  /**
   * clean observers
   */
  cancelingSubscriptions() {
    this.observers = []
  }

  /**
   * trigger connection events
   * @private
   */
  _listenEventConnected() {

    let self = this
      , isListen = true
      , lastStateNetIsOnline = false
      , lastStateNetIsOffline = false
      , listen = async function() {
        setTimeout(async () => {

          if(!self._isStart) {
            return
          }

          let isConnected = await NetInfo.fetch().then( stateNet => stateNet.isConnected)

          // is connected
          if(isConnected && isListen) {

            console.log('notify is connected')
            self._notify(notificationsType.IS_CONNECTED)
            isListen = false
            lastStateNetIsOnline = true
            lastStateNetIsOffline = false

            // not connected
          } else if(!isConnected && isListen) {
            console.log('notify is disconnected')

            self._notify(notificationsType.IS_DISCONNECTED)
            isListen = false
            lastStateNetIsOnline = false
            lastStateNetIsOffline = true

          } else if((isConnected && lastStateNetIsOffline) || (!isConnected && lastStateNetIsOnline)) {

            isListen = true
          }

          await listen()
        } , 3000)
      }

    listen()
  }

  /**
   * trigger notification
   * @param type {string}
   * @return {Promise<void>}
   * @private
   */
  async _notify(type) {
    let observers = this.observers.filter( e => e.type === type)

    for(let i = 0; i < observers.length; i += 1) {

      let observer = observers[i]

      if(observer !== undefined && typeof observer.fb === 'function' ) {
        if(observer.isAsync) {
          await observers.fb()
        } else {
          observer.fb()
        }
      }
    }
  }

  /**
   * create signature for observation
   * @param type {string}
   * @param fb {Function|AsyncFunction}
   * @return {{isAsync: boolean, type: string, fb: Function|AsyncFunction}}
   * @private
   */
  _creatSubscribe(type, fb){
    return {
      type
      , fb
      , isAsync : fb.constructor.name === "AsyncFunction"
    }
  }
}

let _instance = null

const getInstanceNetInfoObserver = function () {

  if(_instance === null){
    _instance = new NetInfoObserverService()
  }

  return _instance
}



export {  getInstanceNetInfoObserver , notificationsType}
