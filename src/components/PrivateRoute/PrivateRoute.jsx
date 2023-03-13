import { useMutation } from '@tanstack/react-query';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { teamProjectApi } from '../../api/TeamProjectApi';
import {
  getAccessTokenSelector, getRefreshTokenSelector, refreshTokens, signOut,
} from '../../redux/slices/userSlice';

export const PrivateRoute = ({ children }) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>> PrivateRoute <<<<<<<<<<<<<<<<<<<<<');

  const accessToken = useSelector(getAccessTokenSelector);
  const refreshToken = useSelector(getRefreshTokenSelector);

  const dispatch = useDispatch();

  const {
    mutateAsync: refreshTokensMutation,
    isError,
    error,
  } = useMutation({
    mutationFn: (values) => teamProjectApi.refreshToken(values).then(),
  });
  if (isError) {
    console.log('Произошла ошибка при обновлении токенов', error);
  }

  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    let timoutId;
    let request;

    const noAuth = () => {
      dispatch(signOut());
      return navigate('/signin', {
        state: {
          from: pathname,
        },
      });
    };

    const func = async () => {
      if (accessToken && refreshToken) {
        let { exp: expAccess } = jwtDecode(accessToken);
        let { exp: expRefresh } = jwtDecode(refreshToken);

        expAccess *= 1e3;
        expRefresh *= 1e3;

        const now = Date.now();

        if (expAccess > now && expRefresh > now) {
          // console.log('start after:', expAccess - now);

          timoutId = window.setTimeout(async () => {
            request = refreshTokensMutation(refreshToken);
            const { data } = await request;
            if (data) return dispatch(refreshTokens(data));
            return noAuth();
          }, Math.max(expAccess - now, 0));

          return;
        }

        if (expAccess < now && expRefresh > now) {
          if (timoutId) window.clearTimeout(timoutId);

          request = refreshTokensMutation(refreshToken);
          const { data } = await request;
          // eslint-disable-next-line consistent-return
          if (data) return dispatch(refreshTokens(data));
          // eslint-disable-next-line consistent-return
          return noAuth();
        }
      }
      // eslint-disable-next-line consistent-return
      return noAuth();
    };

    func();

    return () => {
      if (timoutId !== undefined) {
        window.clearTimeout(timoutId);
      }

      if (request !== undefined) request.abort();
    };
  }, [
    accessToken,
    dispatch,
    navigate,
    pathname,
    refreshToken,
    refreshTokensMutation,
  ]);

  return children;
};
