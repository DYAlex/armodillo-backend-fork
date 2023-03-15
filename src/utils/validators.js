import * as Yup from 'yup';

export const signUpFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя должно состоять минимум из двух символов')
    .max(20, 'Имя должно содержать не более 20 символов')
    .required('Имя является обязательным полем'),
  email: Yup.string()
    .email('Некорректный email')
    .required('Email является обязательным полем'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(20, 'Пароль должен содержать не более 20 символов')
    .test(
      'Пароль не должен содержать пробел',
      { spaces: 'Пароль не должен содержать пробел' },
      (value) => !/\s+/.test(value),
    )
    .required('Пароль является обязательным полем'),
});

export const signInFormValidationSchema = Yup.object({
  email: Yup.string()
    .email('Некорректный адрес электронной почты')
    .required('Не указан адрес электронной почты'),
  password: Yup.string()
    .min(6, 'Должно быть не менее 6 символов')
    .max(20, 'Должно быть не более 20-ти символов')
    .required('Не заполнено обязательное поле "Пароль"'),
});

export const validationScheme = Yup.object({
  surveyTitle: Yup.string()
    .min(2, 'Заголовок должен состоять минимум из двух символов')
    .max(100, 'Заголовок должен содержать не более 100 символов')
    .required('Заголовок опроса является обязательным полем'),
  surveyType: Yup.string()
    .required('Тип опроса является обязательным полем'),
  options: Yup.array(
    Yup.object({
      optionTitle: Yup.string().required(
        'Заголовок ответа является обязательным полем',
      )
        .test('not empty', (value) => value !== ''),
      linkurl: Yup.string().url(
        'Необходимо указать корректную ссылку на изображение',
      ),
      activeLink: Yup.string().url('Необходимо указать корректную ссылку для просмотра'),
    }),
  ),
});
