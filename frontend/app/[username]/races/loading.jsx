import styles from "@/app/[username]/user.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
        <div className="" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '80px', height: '18px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ width: '60px', height: '18px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
        ))}
        </div>
        <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={styles["race-item"]} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className={styles.img}>
            <div style={{ width: '150px', height: '95px', backgroundColor: 'var(--color-surface)', borderRadius: '4px' }}></div>
            </div>

            <div className={styles.icons} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '14px', height: '14px', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}></div>
                <div style={{ width: '14px', height: '14px', backgroundColor: 'var(--color-surface)', borderRadius: '2px' }}></div>
            </div>
            </div>
        </div>
        ))}
    </div>

    </main>
  );
}
