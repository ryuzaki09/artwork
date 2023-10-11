import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App';
import reportWebVitals from './reportWebVitals';
import {ArtworkDetail} from './main/artwork/details'
import {store} from './store'

const router = createBrowserRouter([
  {
    path: '/artwork/:id',
    element: <ArtworkDetail />
  },
  {
    path: '/',
    element: <App />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();