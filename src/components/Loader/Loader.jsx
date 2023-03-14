import LoaderStyles from './Loader.module.css';

export function Loader() {
  return (
    <div>
      <div className={LoaderStyles['lds-ripple']}>
        <div />
        <div />
      </div>
    </div>
  );
}
