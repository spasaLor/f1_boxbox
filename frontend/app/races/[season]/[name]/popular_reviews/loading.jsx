import styles from "@/app/races/[season]/[name]/race.module.css";

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.textSkeleton} style={{ width: '60%', height: '20px', marginBottom: '8px' }}></div>
          <div className={styles.textSkeleton} style={{ width: '40%', height: '28px', marginBottom: '8px' }}></div>
        </div>

        <div className={styles['reviews-container']}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.reviewSkeleton}>
              <div className={styles.textSkeleton} style={{ width: '100%', height: '16px', marginBottom: '6px' }}></div>
              <div className={styles.textSkeleton} style={{ width: '80%', height: '14px' }}></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.imageSkeleton} style={{ width: '200px', height: '320px' }}></div>
      </div>
    </main>
  );
}
