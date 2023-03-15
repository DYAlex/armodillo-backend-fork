import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../../api/TeamProjectApi';
import { withQuery } from '../../HOCs/withQuery';
import styles from './profile.module.css';

function ProfileInner({ data }) {
  const {
    name, email, id,
  } = data;

  return (
    <div className={styles.profilePage}>
      <h1>Profile page</h1>
      <p>{name}</p>
      <p>{email}</p>
      <p>{id}</p>
    </div>
  );
}

const ProfileInnerWithQuery = withQuery(ProfileInner);

export function Profile() {
  const navigate = useNavigate();
  const userId = '09bf6c36-9c93-4ba9-b5ae-aa353e082825';

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['UserFetch', userId],
    queryFn: () => teamProjectApi.getUserById(userId),
  });
  console.log({ data });

  useEffect(() => {
    console.log('UserPage', { userId });
    if (!userId) navigate('/signin');
  }, [userId]);

  return (userId
    && (
      <ProfileInnerWithQuery
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        refetch={refetch}
      />
    )
  );
}
