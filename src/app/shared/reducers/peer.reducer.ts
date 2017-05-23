import {ActionReducer, Action} from "@ngrx/store";
/**
 * Created by Housseini  Maiga on 6/7/2017.
 */

export interface IPeer {
  peer : any;
  call: any;
  callRing : any;
  isCallOngoing : boolean;
}

export const SET_PEER = 'SET_PEER';
export const SET_CALL = 'SET_CALL';
export const SET_CALL_RING = 'SET_CALL_RING';
export const SET_CALL_ONGOING = 'SET_CALL_ONGOING';

export const PeerReducer : ActionReducer<IPeer> = (state : IPeer = {peer : null, call : null, callRing : null, isCallOngoing : true}, action : Action) =>  {
  console.info(action);
  switch(action.type) {
    case SET_PEER:
      state.peer = action.payload;
      console.log('SET_PEER STATE > ', state, Object.assign({}, state) );
      return Object.assign({}, state);
    case SET_CALL:
      state.callRing = action.payload;
      console.log('SET_CALL STATE > ', state, Object.assign({}, state) );
      return Object.assign({}, state);
    case SET_CALL_RING:
      state.callRing = action.payload;
      console.log('SET_CALL_RING STATE > ', state, Object.assign({}, state) );
      return Object.assign({}, state);
    case SET_CALL_ONGOING:
      state.isCallOngoing = action.payload;
      console.log('SET_CALL_RING STATE > ', state, Object.assign({}, state) );
      return Object.assign({}, state);
    default :
      return state;
  }
};

