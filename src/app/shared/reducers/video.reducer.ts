import {ActionReducer, Action} from "@ngrx/store";
/**
 * Created by Housseini  Maiga on 6/5/2017.
 */
export interface IVideoContent {
  incomingStream : MediaStream;
  outcomingStream: MediaStream;
  isCallAccepted : boolean;
  isVideo : boolean;
}
export const INIT_VIDEO_CONTENT_STORE = 'INIT_VIDEO_CONTENT_STORE';
export const SET_INCOMING_STREAM = 'SET_INCOMING_STREAM';
export const SET_OUTCOMING_STREAM = 'SET_OUTCOMING_STREAM';
export const SET_VIDEO_COMP = 'SET_VIDEO_COMP';
export const SET_IS_CALL_ACCEPTED = 'SET_IS_CALL_ACCEPTED';
// export const UPDATE_VIDEO_CONTENT_STORE = 'UPDATE_VIDEO_CONTENT_STORE';

export const VideoContentReducer: ActionReducer<IVideoContent> = (state : IVideoContent = {incomingStream : null, outcomingStream : null, isVideo : false, isCallAccepted : false}, action : Action) =>  {
  console.info(action);
  switch(action.type) {
      case INIT_VIDEO_CONTENT_STORE:
        return Object.assign(state, action.payload);
      case SET_INCOMING_STREAM:
         state.incomingStream = action.payload;
         state.isVideo = true;
        console.log('SET_INCOMING_STREAM STATE > ', state, Object.assign({}, state) );
        return Object.assign({}, state);
      case SET_OUTCOMING_STREAM:
        state.outcomingStream = action.payload;
        state.isVideo = true;
        console.log('SET_OUTCOMING_STREAM STATE > ', state, Object.assign({}, state) );
        return Object.assign({}, state);
    case SET_VIDEO_COMP:
      state.isVideo = action.payload;
      console.log('SET_VIDEO_COMP STATE > ', state, Object.assign({}, state) );
      return Object.assign({}, state);
      default :
        return state;
    }
}
