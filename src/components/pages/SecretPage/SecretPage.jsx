import { Link, useNavigate } from 'react-router-dom';
import styles from './contacts.module.css';

export function Secret() {
  const navigate = useNavigate();

  const clickBackHandler = () => {
    navigate(-1);
  };

  return (
    <main className={styles.whiteBackground}>
      <article>
        <div onClick={clickBackHandler}>
          <i className="fa-solid fa-arrow-left" />
        </div>
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
