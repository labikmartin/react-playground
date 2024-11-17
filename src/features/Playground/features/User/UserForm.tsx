import { useUserForm } from './UserForm.hook';

export function UserForm() {
  const { formState, handleChange, handleSubmit, registerField } =
    useUserForm();

  function onSubmit(data) {
    console.log('yolo', data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        {...registerField('firstName', function validateLength(fieldValue) {
          return fieldValue?.length < 3 && 'Minimum 2 characters';
        })}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={formState.lastName}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}
