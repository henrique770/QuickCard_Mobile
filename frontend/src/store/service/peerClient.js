import Peer from './react-native-peerjs';
import axios from 'axios';
import * as ConstantsBusiness from '~/constants/ConstantsBusiness'
import NetInfo from "@react-native-community/netinfo";

import { getInstanceNetInfoObserver , notificationsType } from '~/store/service/netInfoObserverService'
const netInfoObserver = getInstanceNetInfoObserver()

class PeerClient {

  constructor() {

    this._api  = axios.create({
      baseURL: `http://${this.Host}:${this.Port}${this.Path}`
    })
  }

  get Host() { return ConstantsBusiness.Hub.host }
  get Port() { return ConstantsBusiness.Hub.port }
  get Path() { return ConstantsBusiness.Hub.pathPeer }

  get Api() { return this._api }

  get IdClient() { return this._idClient }
  set IdClient(value) { this._idClient = value }

  get IdHub() {return this._idHub }
  set IdHub(value) { this._idHub = value }

  get IsHubConnect() {
    if(this.peer != null) {
      return this.peer.open
    }
    return false
  }

  get _Events() { return Array.isArray(this._events) ? this._events : [] }
  set _Events(value) { this._events = value}

  /**
   * @param point {string}
   * @param callEvent {function}
   */
  addEvent(point , callEvent) {
    let events = this._Events
      , index = this._Events.find( e => e.point === point)
    if(index > -1) {
      events[index] = {
        point : point
        , fb : callEvent
      }
    }
    else {
      events.push({
        point : point
        , fb : callEvent
      })
    }

    this._Events = events
  }

  _resolveEventHb(dataReceive) {

    let point = dataReceive.point
      , event = this._Events.find( e => e.point === point)

    if(event != null && typeof event.fb === 'function' ) {
      event.fb(dataReceive)
    }
  }

  //#region VALIDADE STATUS CONNECT TO HUB INTERNET

  _validadeConnectInternet(profile) {
    let self = this

    NetInfo.fetch().then( stateNet => {

      if(stateNet.isConnected && !self.IsHubConnect) {
        self._createConnect(profile)
      }
    })

    netInfoObserver.subscribe(notificationsType.IS_CONNECTED, () => {
      if(!self.IsHubConnect) {

        self._createConnect(profile)
      }
    })


    /*
    let self = this
      , isListen = false
      , validate = async function () {

      setTimeout(async function() {
        let isConnected = await NetInfo.fetch().then( stateNet => stateNet.isConnected)

        //console.log('perr is connect to hub : ' + self.IsHubConnect)

        if(isConnected && isListen) {

          if(self.IsHubConnect) {
            self._createConnect(profile)
          }

          isListen = false
        }

        else if(isConnected && !self.IsHubConnect) {

          self._createConnect(profile)
        }

        else {

          isListen = !isConnected
        }

        validate()
      } , 6000)
    }

   validate()

     */
  }

  //#endregion

  get Peer() {
    if(this.peer == null) {
      this.peer = new Peer({
        host : this.Host,
        port : this.Port,
        path : this.Path,
        debug : 3,
        secure : false
      })
    }

    return this.peer
  }

  _resetPeer() {
    if(this.peer != null) {
      this.peer.destroy()
      this.peer = null
    }
  }

  _createConnect(profile) {

    let self = this

    this.IdClient = (profile.Id != null ? profile.Id : profile._id)
    this._resetPeer()

    this.Peer.on('error', console.log)
    this.Peer.on('open', function(id) {
      if(id === undefined) {
        return
      }

      self.IdHub = id
      self.Api.get(`registreConnect/${self.IdHub}/${self.IdClient}/1`)
        console.log('record peer is ID: ' + id)
        //self._validadeConnectInternet(profile)
      })

    this.Peer.on('data', function(data) {
      console.log('Received', data)
      self._resolveEventHb(data)
    })
  }

  connect(profile) {

    let self = this




    netInfoObserver.subscribe(notificationsType.IS_CONNECTED, () => {
      //if(self.IsHubConnect) {
      self._createConnect(profile)
      //}
    })
    //this._createConnect(profile)
  }
}

//#region SINGLETON

let peerClient = null

const getInstancia = () =>  {

    if(peerClient == null) {
      peerClient = new PeerClient()
    }

    return peerClient
}

//#endregion


export { getInstancia }
