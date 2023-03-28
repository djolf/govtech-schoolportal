import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import ClassesPage from './pages/classes';
import TeachersPage from './pages/teachers';
import { CreateClassPage } from './pages/classes/create';
import { CreateTeacherPage } from './pages/teachers/create';
import { classesLoader, teachersLoader } from './common/loaders';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        errorElement: <ErrorPage/>,
        children: [
          {
            path: "/classes",
            element: <ClassesPage/>,
            loader: classesLoader,
          },
          {
            path: "/classes/create",
            element: <CreateClassPage/>,
            loader: teachersLoader,
          },
          {
            path: "/teachers",
            element: <TeachersPage/>,
            loader: teachersLoader,
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
