import { useReducer } from 'react';
import { initialState, type UserFormState } from './UserForm.hook';

export enum UserFormActions {
  ChangeField = 'CHANGE_FIELD',
  ResetForm = 'RESET_FORM',
}

export function userReducer(
  state: UserFormState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case UserFormActions.ChangeField:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case UserFormActions.ResetForm:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

export function useUserFormReducer({
  initialState,
}: {
  initialState: UserFormState;
}) {
  const reducerTuple = useReducer(userReducer, initialState);

  return reducerTuple;
}
