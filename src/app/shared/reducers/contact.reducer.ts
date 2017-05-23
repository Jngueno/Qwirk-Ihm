import {Action, ActionReducer} from "@ngrx/store";
/**
 * Created by Housseini  Maiga on 6/7/2017.
 */
export interface IContact {
  email : string;
  nickname: string;
}

export const ADD_CONTACT = 'ADD_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

export const ContactReducer : ActionReducer<IContact> = (state : IContact = {email : '', nickname : ''}, action : Action) =>  {
  console.info(action);
  switch(action.type) {
    case ADD_CONTACT:
      return;
    case UPDATE_CONTACT:
      return;
    case DELETE_CONTACT:
      // return state.filter(contact => {
      //   return contact.id !== action.payload.id;
      // });
    default:
      return state;

  }
};

