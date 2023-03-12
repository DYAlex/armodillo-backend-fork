import styles from './main.module.css';
import surveyLayout from './survey1.png';

export function Main() {
  return (
    <main>
      <section className={styles.containerHome}>
        <div className={styles.containerLeft}>
          <h1>Создайте опрос в один клик</h1>
          <button type="button" className={styles.button}>Новый опрос</button>
        </div>
        <div className={styles.containerRight}>
          <img src={surveyLayout} alt="пример опроса" />
        </div>
      </section>
    </main>
  );
}
