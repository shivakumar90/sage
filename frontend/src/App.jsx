import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route 
} from 'react-router-dom';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} />
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    },
    basename: '/'
  }
);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </React.StrictMode>
  );
}

export default App; 