import { Loader } from '../Loader/Loader';

// eslint-disable-next-line func-names
export const withQuery = (WrappedComponent) => function ({
  isLoading, isFetching, isError, error, refetch, ...rest
}) {
  if (isError) {
    return (
      <div>

        <p>
          Произошла ошибка:
          {' '}
          {error.message}
        </p>

        <button
          onClick={refetch}
          type="button"
        >
          Повторить
        </button>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  return (
    <>
      {isFetching && <Loader />}
      <WrappedComponent {...rest} />
    </>
  );
};
