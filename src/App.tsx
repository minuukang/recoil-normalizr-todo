import React from 'react';
import { useRecoilValue } from 'recoil';
import './App.css';

import Todo from './page/Todo';
import Auth from './page/Auth';
import { entitySelector } from './store/entitys/selectors';

function App() {
  const entities = useRecoilValue(entitySelector);
  return (
    <div className="App">
      <div>
        <h1>TO-DO</h1>
        <Todo />
        <hr />
        <h1>User</h1>
        <Auth />
      </div>
      <div>
        <h1>Development mode : Entitys</h1>
        <pre>{JSON.stringify(entities, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
