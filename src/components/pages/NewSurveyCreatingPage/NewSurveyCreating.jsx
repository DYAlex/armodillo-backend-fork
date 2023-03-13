/* eslint-disable react/no-array-index-key */
import {
  Formik, Field, FieldArray, Form, ErrorMessage,
} from 'formik';
import { useRef, useState } from 'react';
import { validationScheme } from './validator';
import styles from './newSurveyCreating.module.css';

export function NewSurveyCreating() {
  const optionsGroup = {
    optionTitle: '',
    activeLink: '',
  };
  const [selectedFile, setSelectedFile] = useState('');
  const [imageContent, setImageContent] = useState(['']);
  const [imageLinkValues, setImageLinkValues] = useState(['']);
  const filePicker = useRef();
  const formData = new FormData();
  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  formData.append('image', selectedFile);
  formData.getAll('files');
  const getUploadedUrl = async (res, index) => {
    const imageLink = `http://localhost:3005/upload/${res}`;
    const resImg = await fetch(imageLink);
    const blob = await resImg.blob();
    const url = window.URL.createObjectURL(blob);
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    imageArray[index] = url;
    linksArray[index] = res;
    setImageContent([...imageArray, '']);
    setImageLinkValues([...linksArray, '']);
  };
  const uploadHandler = async (index) => {
    const res = await fetch('http://localhost:3005/upload', {
      method: 'POST',
      body: formData,
    }).then((result) => result.json());
    setSelectedFile('');
    if (res !== 'Не выбран файл для загрузки') {
      getUploadedUrl(res, index);
    }
  };
  const handlePick = (event) => {
    if (
      !event.target.closest('button')
      && !event.target.closest('i')
    ) {
      filePicker.current.click();
    }
  };
  function deleteImageHandler(index) {
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    imageArray[index] = '';
    linksArray[index] = '';
    setImageContent([...imageArray]);
    setImageLinkValues([...linksArray]);
  }
  function changeImageLinkHandler(event, index) {
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    imageArray[index] = event.target.value;
    linksArray[index] = event.target.value;
    setImageContent([...imageArray, '']);
    setImageLinkValues([...linksArray, '']);
  }
  function valuesPrepareHandler(values) {
    const preparedValues = {
      ...values,
      options: [...values.options].map((option, index) => ({
        ...option,
        image: imageContent[index] || '',
      })),
    };
    console.log(preparedValues);
  }
  function deleteWithOptionHandler(index) {
    const imageArray = [...imageContent];
    const linksArray = [...imageLinkValues];
    setImageContent([...imageArray.slice(0, index), ...imageArray.slice(index + 1)]);
    setImageLinkValues([...linksArray.slice(0, index), ...linksArray.slice(index + 1)]);
  }
  return (
    <div className={styles.newSurveyCreatingPage}>
      <h1>Создание нового опроса</h1>
      <Formik
        initialValues={{
          surveyTitle: '',
          surveyType: '',
          options: [optionsGroup],
          allowExtraOption: false,
        }}
        validationSchema={validationScheme}
        onSubmit={async (values) => {
          valuesPrepareHandler(values);
        }}
      >
        {({ values }) => (
          <Form className={styles.formWrapper}>
            <Field
              className={styles.surveyTitle}
              type="text"
              name="surveyTitle"
              placeholder="заголовок опроса"
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="surveyTitle"
              component="div"
            />
            <div id="surveyTypeGroup">
              <h4>Тип опроса</h4>
            </div>
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className={styles.typeWrapper}
            >
              <Field
                type="radio"
                name="surveyType"
                value="SC"
                id="SC"
              />
              <label
                htmlFor="SC"
                className={styles.typeCard}
              >
                <div className={styles.typeTitle}>Единственный выбор</div>
                <div className={styles.typeDescription}>
                  Выбор большинством голосов, где каждый участник может
                  проголосовать только за один вариант ответа
                </div>
              </label>
              <Field
                type="radio"
                name="surveyType"
                value="MC"
                id="MC"
              />
              <label
                htmlFor="MC"
                className={styles.typeCard}
              >
                <div className={styles.typeTitle}>Множественный выбор</div>
                <div className={styles.typeDescription}>
                  Выбор большинством голосов, где каждый участник может
                  проголосовать за несколько вариантов ответа
                </div>
              </label>
              <Field
                type="radio"
                name="surveyType"
                value="UC"
                id="UC"
              />
              <label
                htmlFor="UC"
                className={styles.typeCard}
              >
                <div className={styles.typeTitle}>Уникальный выбор</div>
                <div className={styles.typeDescription}>
                  Каждый из вариантов ответов может быть выбран не более, чем
                  одним участником
                </div>
              </label>
            </div>
            <ErrorMessage
              className={styles.errorMessage}
              name="surveyType"
              component="div"
            />
            <h4>Варианты ответов:</h4>
            <FieldArray name="options">
              {({ push, remove }) => (
                <div className={styles.optionWrapper}>
                  {values.options.map((_, index) => (
                    <div
                      className={styles.option}
                      key={index}
                    >
                      <div className={styles.optionInputWrapper}>
                        <Field
                          type="text"
                          name={`options.${index}.optionTitle`}
                          placeholder="вариант ответа"
                        />
                        <ErrorMessage
                          className={styles.errorMessage}
                          name={`options.${index}.optionTitle`}
                          component="div"
                        />
                        <Field
                          type="text"
                          name={`options.${index}.activeLink`}
                          placeholder="ссылка для просмотра"
                        />
                        <ErrorMessage
                          className={styles.errorMessage}
                          name={`options.${index}.activeLink`}
                          component="div"
                        />
                        <input
                          type="text"
                          placeholder="ссылка на изображение"
                          onChange={(event) => changeImageLinkHandler(event, index)}
                          value={imageLinkValues[index]}
                        />
                        <ErrorMessage
                          className={styles.errorMessage}
                          name={`options.${index}.linkurl`}
                          component="div"
                        />
                        <input
                          className={styles.hidden}
                          encType="multipart/form-data"
                          type="file"
                          ref={filePicker}
                          onChange={handleChange}
                        />
                        {selectedFile !== '' && (
                          <button
                            type="button"
                            onClick={() => uploadHandler(index)}
                          >
                            Загрузить файл
                          </button>
                        )}
                      </div>
                      <div className={styles.image} onClick={handlePick} title="загрузить файл">
                        {(imageContent[index]) && (
                          <button
                            type="button"
                            title="удалить файл"
                            className={styles.buttonImageDelete}
                            onClick={() => deleteImageHandler(index)}
                          >
                            <i className="fa-solid fa-xmark" />
                          </button>
                        )}
                        <img
                          src={imageContent[index]}
                          alt="изображение"
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          className={styles.buttonDelete}
                          onClick={() => {
                            deleteWithOptionHandler(index);
                            remove(index);
                          }}
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className={styles.buttonAddOption}
                    onClick={() => push(optionsGroup)}
                  >
                    Добавить вариант ответа
                  </button>
                </div>
              )}
            </FieldArray>
            <div className={styles.allowExtraOption}>
              <Field
                type="checkbox"
                name="allowExtraOption"
                id="allowExtraOption"
              />
              <label htmlFor="allowExtraOption">
                Разрешить участникам выбор своего варианта
              </label>
            </div>
            <button
              type="submit"
              className={styles.buttonSubmit}
            >
              Сформировать ссылку на опрос
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
