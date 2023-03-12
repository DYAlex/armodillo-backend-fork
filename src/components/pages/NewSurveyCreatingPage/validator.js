import * as Yup from 'yup';

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
