import styles from "./review.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className="" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '80px', height: '18px', backgroundColor: 'var(--color-bg)', borderRadius: '4px' }}></div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ width: '60px', height: '18px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
          ))}
        </div>
        <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles["review-item"]} style={{ display: 'flex', gap: '1rem' }}>
            
            <div className={styles.left}>
              <div style={{ width: '100px', height: '150px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
            </div>
            
            <div className={styles.right} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              
              <div className={styles.top} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ width: '200px', height: '20px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
                <div style={{ width: '50px', height: '14px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
              </div>

              <div className={styles.mid} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
                ))}
                <div style={{ width: '14px', height: '14px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
                <div style={{ width: '80px', height: '14px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
                <div style={{ width: '30px', height: '14px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
              </div>

              <div className={styles.content}>
                <div style={{ width: '100%', height: '40px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
              </div>

              <div className={styles.likes} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
                <div style={{ width: '60px', height: '14px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}
