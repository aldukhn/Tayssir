import React from 'react';
import { Admin, ListGuesser, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';

export const App = () => {
  return (
    <Admin
      title="Tayssir Admin"
      authProvider={authProvider}
      dataProvider={jsonServerProvider('http://localhost:3333/api')}
    >
      <Resource name="communes" list={ListGuesser}/>
    </Admin>
  );
};

export default App;
