import styles from "@/app/[username]/activity/activity.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles["not-main"]}>
        <div style={{
          width: '100px',
          height: '16px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-surface)',
        }} />

        <div style={{ display: 'flex', gap: '1rem' }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={{
              width: '60px',
              height: '14px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-surface)',
            }} />
          ))}
        </div>

        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-surface)',
        }} />
      </div>

      <div className={styles.content}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          padding: '0.5rem 0',
          borderBottom: '1px solid var(--color-border)',
        }}>
          {Array(3).fill(0).map((_, i) => (
            <div key={i} style={{
              width: '100px',
              height: '14px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-surface)',
            }} />
          ))}
        </div>

        <div style={{ marginTop: '1rem', width: '100%' }}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              padding: '0.8rem 0',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <div style={{
                width: '80%',
                height: '14px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-surface)',
              }} />
              <div style={{
                width: '30%',
                height: '12px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-surface)',
              }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
