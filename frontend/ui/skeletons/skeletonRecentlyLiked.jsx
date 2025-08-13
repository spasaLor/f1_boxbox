import styles from '@/app/[username]/lists/list.module.css'

export default function SkeletonRecentlyLiked() {
  return (
    <>
      <div className={styles.sectionTitle}>
        <h2
          className={`${styles.title} skeleton`}
          style={{ width: '160px', height: '24px' }}
        ></h2>
      </div>

      <div className={styles["recent-container"]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div className={styles["recent-item"]} key={i}>
            <div className={styles["lists-left"]}>
              {Array.from({ length: 5 }).map((_, j) => (
                <div className={styles.cover} key={j}>
                  <div
                    className={`${styles["blank-cover"]} skeleton`}
                    style={{ width: '80px', height: '120px' }}
                  ></div>
                </div>
              ))}
            </div>

            <div className={styles["lists-right"]}>
              <div
                className={`skeleton ${styles["list-name"]}`}
                style={{ height: '18px', width: '70%', marginBottom: '8px' }}
              ></div>

              <div className={styles.bottom}>
                <div
                  className={styles.skeleton}
                  style={{ width: '60px', height: '14px' }}
                ></div>
                <div
                  className={styles.skeleton}
                  style={{ width: '40px', height: '14px' }}
                ></div>
                <div
                  className={styles.skeleton}
                  style={{ width: '30px', height: '14px' }}
                ></div>
              </div>

              <div className={styles.description}>
                <div
                  className={styles.skeleton}
                  style={{ width: '100%', height: '12px', marginBottom: '4px' }}
                ></div>
                <div
                  className={styles.skeleton}
                  style={{ width: '90%', height: '12px', marginBottom: '4px' }}
                ></div>
                <div
                  className={styles.skeleton}
                  style={{ width: '80%', height: '12px' }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
