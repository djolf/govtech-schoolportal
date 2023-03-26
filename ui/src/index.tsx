import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import ClassesPage from './pages/classes';
import TeachersPage from './pages/teachers';
import { loader } from './common/loaders';
import { CreateClassPage } from './pages/classes/create';
import { CreateTeacherPage } from './pages/teachers/create';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    loader: loader,
    shouldRevalidate: () => false,
    id: "app",
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          {
            path: "/classes",
            element: <ClassesPage/>,
          },
          {
            path: "/classes/create",
            element: <CreateClassPage/>
          },
          {
            path: "/teachers",
            element: <TeachersPage/>,
          },
          {
            path: "/teachers/create",
            element: <CreateTeacherPage/>
          }
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
