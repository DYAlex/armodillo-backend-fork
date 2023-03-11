import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { Main } from './pages/MainPage/MainPage';
import { Signup } from './pages/SignupPage/Signup';
import { Signin } from './pages/SigninPage/Signin';
import { NewSurveyCreating } from './pages/NewSurveyCreatingPage/NewSurveyCreating';
import { Profile } from './pages/ProfilePage/ProfilePage';
import { MySurveys } from './pages/MySurveysPage/MySurveysPage';

const Router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'signin',
          element: <Signin />,
        },
        {
          path: 'creating',
          element: <NewSurveyCreating />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'mysurveys',
          element: <MySurveys />,
        },
      ],
    },
  ],
  { basename: '/armodillo' },
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={Router} />);
