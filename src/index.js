import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import App from './App';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import { Main } from './components/pages/MainPage/MainPage';
import { Signup } from './components/pages/SignupPage/Signup';
import { Signin } from './components/pages/SigninPage/Signin';
import { NewSurveyCreating } from './components/pages/NewSurveyCreatingPage/NewSurveyCreating';
import { Profile } from './components/pages/ProfilePage/ProfilePage';
import { MySurveys } from './components/pages/MySurveysPage/MySurveysPage';
// eslint-disable-next-line max-len
import { SingleChoiceSurvey } from './components/pages/SingleChoiceSurveyPage/SingleChoiceSurveyPage';
// eslint-disable-next-line max-len
import { MultipleChoiceSurvey } from './components/pages/MultipleChoiceSurveyPage/MultipleChoiceSurveyPage';
// eslint-disable-next-line max-len
import { UniqueChoiceSurvey } from './components/pages/UniqueChoiceSurveyPage/UniqueChoiceSurveyPage';
import { Contacts } from './components/pages/ContactsPage/Contacts';
import { Secret } from './components/pages/SecretPage/SecretPage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Router = createBrowserRouter([
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
      {
        path: 'secret',
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </QueryClientProvider>,
);
