import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerItem}>Контакты</div>
      <div className={styles.footerItem}>Отзывы</div>
      <div className={styles.footerItem}>Справка</div>
    </footer>
  );
}
