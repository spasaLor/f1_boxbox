import styles from "./race.module.css";
import sideStyles from '@/app/races/[season]/[name]/race.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
        <div className={styles.image}>
            <div style={{ width: '150px', height: '250px', backgroundColor: 'var(--color-surface)' }}></div>
        </div>

        <div className={styles["main-content"]}>
            <div className={styles.header}>
            <div style={{ width: '200px', height: '24px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
            </div>

            <div className={styles.name}>
            <div style={{ width: '300px', height: '32px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
            <div style={{ width: '100px', height: '20px', backgroundColor: 'var(--color-surface)', marginTop: '4px', borderRadius: '4px' }}></div>
            </div>

            <div className={styles.rating} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
            <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
            <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
            </div>

            <div style={{ width: '180px', height: '18px', backgroundColor: 'var(--color-surface)', marginTop: '12px', borderRadius: '4px' }}></div>
            <div style={{ width: '100%', height: '100px', backgroundColor: 'var(--color-surface)', marginTop: '8px', borderRadius: '4px' }}></div>
        </div>

        <div className={styles["side-bar"]}>
            <div className={sideStyles.interaction}>
            <div style={{ width: '100%', height: '300px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
            </div>
        </div>
    </main>
  );
}
