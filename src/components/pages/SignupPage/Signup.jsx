import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { signUpFormValidationSchema } from '../../../utils/validators';
import styles from './signup.module.css';

const initialValues = {
  email: '',
  name: '',
  password: '',
};

export function Signup() {
  console.log('Render Signup component');
  const navigate = useNavigate();
  const {
    mutateAsync,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.addNewUser(values).then(),
  });

  if (isError) console.log('Произошла ошибка при создании пользователя', error);
  if (isLoading) {
    return (
      <div className={styles.signupPage}>
        <p>Идет загрузка...</p>
      </div>
    );
  }

  const submitHandler = async (values) => {
    console.log({ values });
    await mutateAsync(values);
    navigate('/signin');
  };

  return (
    <>
      <h1>Создание учетной записи</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpFormValidationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <div className={styles.Form_Group}>
            <p className={styles.Form_Label}>Электронная почта</p>
            <Field
              id="email"
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
            <p className={styles.Form_Label}>Имя</p>
            <Field
              name="name"
              type="text"
              placeholder="Введите ваше имя"
              className={styles.Form_Field}
            />
            <ErrorMessage
              component="p"
              className="error"
              name="name"
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
            // disabled={isLoading}
          >
            Зарегистрироваться
          </button>
        </Form>
      </Formik>
    </>
  );
}
