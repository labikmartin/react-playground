import { useRef, type ChangeEvent, type FormEvent } from 'react';
import { UserFormActions, useUserFormReducer } from './UserForm.reducer';

export const initialState: Record<string, any> = {
  firstName: '',
  lastName: '',
};

export type UserFormState = typeof initialState;

export function useUserForm() {
  const [formState, dispatch] = useUserFormReducer({ initialState });
  const validatorsRef = useRef<Record<string, any>>({});

  function registerField(name: string, validationFn?) {
    validatorsRef.current[name] = {
      ref: null,
      validationFn,
    };

    return {
      name,
      onChange: handleChange,
      ref: (input: any) => {
        validatorsRef.current[name].ref = input;
      },
      value: formState[name],
    };
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const validate = validatorsRef.current[e.target.name]?.validationFn(
      e.target.value,
      formState
    );
    console.log({ validate });

    dispatch({
      type: UserFormActions.ChangeField,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  }

  function handleSubmit(
    callback: (data: any, event?: FormEvent<HTMLFormElement>) => void
  ) {
    return (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch({ type: UserFormActions.ResetForm });
      callback(formState, event);
      console.log({ formState, validatorsRef });
    };
  }

  return {
    formState,
    handleChange,
    handleSubmit,
    registerField,
  };
}
