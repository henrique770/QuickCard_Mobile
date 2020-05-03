import { put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import NetInfo from "@react-native-community/netinfo";
import { OFFLINE, ONLINE } from "redux-offline-queue";

export function* startWatchingNetworkConnectivity(e) {
  
  console.log(e)

  return
  console.log('switch connect', NetInfo)

  let channel = {}

// Subscribe
const unsubscribe = NetInfo.addEventListener(state => {
 
  while(false) 
  {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  }

});


// Unsubscribe
unsubscribe();


  try {
    
    channel = eventChannel(emitter => {
      
      let r = NetInfo.addEventListener( (e) => {

        return e.isConnected
      })
      
      console.log(r())
      
      //return () =>
      //  NetInfo.removeEventListener("connectionChange", emitter);
      console.log('opne')
      return () => console.log('close')

    });

    return


    while(true) {

      console.log('switch connect ss')
      
      const isConnected = yield take(channel);

      if (isConnected) {
        console.log('CONNECT')
        yield put({ type: ONLINE });
      } else {
        console.log('DISCONECT')
        yield put({ type: OFFLINE });
      }
      
    }
  } 
  catch(e)
  {
    console.log(e)
  }
  finally {
    channel.close();
  }
}