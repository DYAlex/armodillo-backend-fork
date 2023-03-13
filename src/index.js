import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import { Main } from './components/pages/MainPage/Main';
import { Signup } from './components/pages/SignupPage/Signup';
import { Signin } from './components/pages/SigninPage/Signin';
import { NewSurveyCreating } from './components/pages/NewSurveyCreatingPage/NewSurveyCreating';
import { Profile } from './components/pages/ProfilePage/ProfilePage';
import { MySurveys } from './components/pages/MySurveysPage/MySurveysPage';
import {
  SingleChoiceSurvey,
} from './components/pages/SingleChoiceSurveyPage/SingleChoiceSurveyPage';
import {
  MultipleChoiceSurvey,
} from './components/pages/MultipleChoiceSurveyPage/MultipleChoiceSurveyPage';
import {
  UniqueChoiceSurvey,
} from './components/pages/UniqueChoiceSurveyPage/UniqueChoiceSurveyPage';
import { Contacts } from './components/pages/ContactsPage/Contacts';

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
        {
          path: 'singlechoice/:id ',
          element: <SingleChoiceSurvey />,
        },
        {
          path: 'multiplechoice/:id ',
          element: <MultipleChoiceSurvey />,
        },
        {
          path: 'uniquechoice/:id ',
          element: <UniqueChoiceSurvey />,
        },
        {
          path: 'contacts',
          element: <Contacts />,
        },
      ],
    },
  ],
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={Router} />);
