import styles from './settings.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.textSkeleton} style={{ width: '200px', height: '28px', marginBottom: '20px' }}></div>

      <div className={styles.content}>
        <div className={styles.left}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className={styles.imageSkeleton} style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
            <div className={styles.textSkeleton} style={{ width: '120px', height: '18px' }}></div>
          </div>

          <div className={styles.textSkeleton} style={{ width: '100px', height: '14px', marginBottom: '20px' }}></div>

          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div className={styles.textSkeleton} style={{ width: '80px', height: '14px', marginBottom: '6px' }}></div>
              <div className={styles.textSkeleton} style={{ width: '100%', height: '36px' }}></div>
            </div>
          ))}

          <div style={{ marginBottom: '20px' }}>
            <div className={styles.textSkeleton} style={{ width: '50px', height: '14px', marginBottom: '6px' }}></div>
            <div className={styles.textSkeleton} style={{ width: '100%', height: '80px' }}></div>
          </div>

          <div className={styles.textSkeleton} style={{ width: '150px', height: '40px', borderRadius: '4px' }}></div>
        </div>

        <div className={styles.right}>
          <div className={styles.textSkeleton} style={{ width: '150px', height: '20px', marginBottom: '20px' }}></div>

          <div className={styles['fav-container']} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.imageSkeleton} style={{ width: '150px', height: '250px' }}></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
