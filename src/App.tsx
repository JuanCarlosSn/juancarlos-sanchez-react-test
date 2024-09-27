import React from 'react';
import { Provider } from 'react-redux';
import AllRoutes from './routes';
import { store } from './store';
import LoadUsers from './components/LoadUsers';
import './assets/scss/app.scss';

const App = () => {
  return (
    <Provider store={store}>
      <LoadUsers />
      <AllRoutes />
    </Provider>
  );
};

export default App;

