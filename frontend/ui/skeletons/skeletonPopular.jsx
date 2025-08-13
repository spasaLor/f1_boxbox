import styles from '@/app/[username]/lists/list.module.css'

export default function SkeletonPopular() {
  return (
    <>
      <div className={styles.sectionTitle}>
        <h2 className={`${styles.title} skeleton`} style={{ width: '200px', height: '24px' }}></h2>
        <h2 className={`${styles.title} skeleton`} style={{ width: '50px', height: '24px' }}></h2>
      </div>

      <div className={styles["pop-container"]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div className={styles["pop-item"]} key={i}>
            <div className={styles["lists-left"]}>
              {Array.from({ length: 5 }).map((_, j) => (
                <div className={styles.cover} key={j}>
                  <div className={`${styles["blank-cover"]} skeleton`}></div>
                </div>
              ))}
            </div>

            <div
              className={`skeleton ${styles["list-name"]}`}
              style={{ height: '18px', width: '70%', marginTop: '8px', marginBottom: '8px' }}
            ></div>

            <div className={styles.bottom}>
              <div className={styles.skeleton} style={{ width: '60px', height: '14px' }}></div>
              <div className={styles.skeleton} style={{ width: '40px', height: '14px' }}></div>
              <div className={styles.skeleton} style={{ width: '30px', height: '14px' }}></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
