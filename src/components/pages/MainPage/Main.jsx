import { ButtonPurple } from '../../atoms/ButtonPurple/ButtonPurple';
import styles from './main.module.css';
import surveyLayout from './survey_main.gif';

export function Main() {
  return (
    <main>
      <section className={styles.containerHome}>
        <div className={styles.containerLeft}>
          <h1>Создайте опрос в один клик</h1>
          <div className={styles.button}>
            <ButtonPurple type="button">Новый опрос</ButtonPurple>
          </div>
        </div>
        <div className={styles.containerRight}>
          <img src={surveyLayout} alt="пример опроса" />
        </div>
      </section>
    </main>
  );
}
