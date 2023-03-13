import styles from './buttonPurple.module.css';

export function ButtonPurple({ children, type, onClick }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
