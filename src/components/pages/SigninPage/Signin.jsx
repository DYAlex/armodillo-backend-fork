// import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { signInFormValidationSchema } from '../../../utils/validators';
import styles from './signin.module.css';

export function Signin() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const {
    mutateAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.signIn(values).then(),
  });

  if (isError) {
    console.log('Произошла ошибка при входе в приложение', error);
    return (
      <div className={styles.signupPage}>
        <h1>
          Произошла ошибка при входе в приложение
        </h1>
        <p>
          {error.message}
        </p>
        <Link to="/signup" className={styles.linkError}>Зарегистрироваться</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.signupPage}>
        <p>Идет загрузка...</p>
      </div>
    );
  }

  const submitHandler = async (values) => {
    console.log({ values });
    const { data } = await mutateAsync(values);
    console.log({ data });
    // dispatch(setUser(data));

    if (locationState?.from) {
      return navigate(locationState.from);
    }
    return navigate('/');
  };

  return (
    <div className={styles.signinPage}>
      <h1>Войти в приложение</h1>
      <p>
        Еще нет профиля?
        {' '}
        <Link to="/signup" className={styles.link}>Зарегистрироваться</Link>
      </p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={signInFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form className={styles.Form}>
          <div className={styles.Form_Group}>
            <p className={styles.Form_Label}>Электронная почта</p>
            <Field
              name="email"
              placeholder="Электронная почта"
              type="email"
              className={styles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="email"
            />
          </div>

          <div className={styles.Form_Group}>
            <p className={styles.Form_Label}>Пароль</p>
            <Field
              name="password"
              placeholder="Пароль"
              type="password"
              className={styles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
          >
            Войти
          </button>
        </Form>
      </Formik>
    </div>
  );
}
