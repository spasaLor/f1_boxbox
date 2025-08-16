import styles from "@/app/[username]/user.module.css";

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

      <div style={{
        width: '80px',
        height: '20px',
        marginTop: '1rem',
        marginBottom: '1rem',
        borderRadius: '4px',
        backgroundColor: 'var(--color-surface)',
      }} />

      <div className={styles["liked-container"]}>
        {Array(8).fill(0).map((_, i) => (
          <div className={styles["race-item"]} key={i}>
            <div className={styles.img}>
              <div style={{
                width: '150px',
                height: '100px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-surface)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
