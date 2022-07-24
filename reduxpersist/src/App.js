import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './redux/store';
import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);