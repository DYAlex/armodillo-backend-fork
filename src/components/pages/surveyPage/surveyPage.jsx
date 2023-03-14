import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { getAccessTokenSelector } from '../../../redux/slices/userSlice';
import styles from './surveyPage.module.css';

export function SurveyPage() {
  const { surveyId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessTokenSelector);

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin', {
        state: {
          from: pathname,
        },
      });
    }
  });
  const {
    data: survey,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['survey', surveyId],
    queryFn: () => teamProjectApi.getSurveyById(surveyId, accessToken),
  });

  if (isError) {
    console.log('Произошла ошибка при загрузке опроса', error);
  }
  if (isLoading) {
    return (
      <div className={styles.signupPage}>
        <p>Идет загрузка...</p>
      </div>
    );
  }
  // console.log({ survey });
  if (survey) {
    return (
      <div className={styles.surveysPage}>
        <h1>{ survey?.title }</h1>
        { survey?.options.map((option) => (
          <p key={option.optionId}>{JSON.stringify(option)}</p>
        ))}
        <div>{JSON.stringify(survey)}</div>
      </div>
    );
  }
}
