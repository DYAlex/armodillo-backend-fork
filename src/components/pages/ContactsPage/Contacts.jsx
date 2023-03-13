import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../../atoms/ArrowLeft/ArrowLeft';
import styles from './contacts.module.css';

export function Contacts() {
  const navigate = useNavigate();

  const clickBackHandler = () => {
    navigate(-1);
  };

  return (
    <main className={styles.whiteBackground}>
      <article>
        <ArrowLeft clickBackHandler={clickBackHandler} />
        <h3>Наши контакты</h3>
        <section>
          <Link to="https://github.com/lev33" target="_blank">
            https://github.com/lev33
          </Link>
          <hr />
          <Link to="https://github.com/DYAlex" target="_blank">
            https://github.com/DYAlex
          </Link>
          <hr />
          <Link to="https://github.com/AnnaArmodillo" target="_blank">
            https://github.com/AnnaArmodillo
          </Link>
          <hr />
          <Link to="https://github.com/KatlinBulycheva" target="_blank">
            https://github.com/KatlinBulycheva
          </Link>
        </section>
      </article>
    </main>
  );
}
