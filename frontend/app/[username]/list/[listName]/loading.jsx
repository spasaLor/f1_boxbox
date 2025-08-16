
import styles from "@/app/[username]/lists/list.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <div style={{
          width: '180px',
          height: '16px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-surface)',
          marginBottom: '0.5rem'
        }} />

        <div style={{
          width: '240px',
          height: '24px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-surface)',
          marginBottom: '0.5rem'
        }} />

        <div style={{
          width: '100%',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-surface)',
          marginBottom: '1.5rem'
        }} />

        <div className={styles["list-grid"]}>
          {Array(8).fill(0).map((_, i) => (
            <div className={styles.item} key={i}>
              <div style={{
                width: '150px',
                height: '100px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-surface)'
              }} />
              <div style={{
                width: '20px',
                height: '14px',
                borderRadius: '4px',
                backgroundColor: 'var(--color-surface)',
                marginTop: '0.25rem'
              }} />
            </div>
          ))}
        </div>

        <div className={styles["comments-container"]} style={{ marginTop: '2rem' }}>
          <div style={{
            width: '140px',
            height: '16px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-surface)',
            marginBottom: '1rem'
          }} />
          {Array(3).fill(0).map((_, i) => (
            <div key={i} style={{
              width: '100%',
              height: '40px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-surface)',
              marginBottom: '0.5rem'
            }} />
          ))}
        </div>
      </div>

      <div className={styles["side-container"]}>
        <div className={styles.sidebar}>
          <div style={{
            width: '100%',
            height: '20px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-surface)',
            marginBottom: '1rem'
          }} />

          <div style={{
            width: '80px',
            height: '16px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-surface)',
            marginBottom: '1rem'
          }} />

          <div style={{
            width: '100%',
            height: '60px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-surface)',
            marginBottom: '1rem'
          }} />
        </div>
      </div>
    </main>
  );
}
