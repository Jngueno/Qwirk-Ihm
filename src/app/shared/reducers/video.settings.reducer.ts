/**
 * Created by Housseini  Maiga on 6/6/2017.
 */
import {ActionReducer, Action} from "@ngrx/store";

export interface IVideoSetting {
  muted : Boolean;
  isAudioCall: Boolean;
}

export const SET_MUTE = 'SET_MUTE';
export const SET_IS_AUDIO_CALL = 'SET_IS_AUDIO_CALL';

export const VideoSettingReducer: ActionReducer<IVideoSetting> = (state : IVideoSetting = {muted : false, isAudioCall : true}, action : Action) =>  {
  console.info(action);
  switch(action.type) {
    case SET_MUTE:
      state.muted = action.payload;
      console.log('SET_MUTE STATE > ', state, Object.assign({}, state) );
      return Object.assign({}, state);
    case SET_IS_AUDIO_CALL:
      state.isAudioCall = action.payload;
      console.log('SET_IS_AUDIO_CALL STATE > ', state, Object.assign({}, state) );
      return Object.assign({}, state);
    default :
      return state;
  }
}

