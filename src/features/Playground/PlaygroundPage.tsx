import { useEffect, useLayoutEffect, useState } from 'react';
import { UserForm } from './features/User/UserForm';

export default function PlaygroundPage() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {}, []);

  useLayoutEffect(() => {}, []);

  return (
    <div>
      <h1>Playground</h1>
      <p>This is the Playground page.</p>
      <button onClick={() => setCounter((state) => state + 1)}>
        Clicked {counter} times
      </button>
      <UserForm />
    </div>
  );
}
