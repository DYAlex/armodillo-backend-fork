import logo from './logo.png';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.containerLogo}>
        <img src={logo} alt="логотип" />
        <h2>ARMADILLO</h2>
      </div>
      <div className={styles.containerAdmission}>
        <button type="button">Войти</button>
      </div>
    </header>
  );
}
