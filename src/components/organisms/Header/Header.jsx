import styles from './Header.module.css';
import { ButtonWhite } from '../../atoms/ButtonWhite/ButtonWhite';
import { Logo } from '../../atoms/Logo/Logo';

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.containerAdmission}>
        <ButtonWhite type="button">Войти</ButtonWhite>
      </div>
    </header>
  );
}
