import styles from '@/app/races/[season]/[name]/race.module.css';

export default function Loading() {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.image}>
          <div
            style={{
              width: "1300px",
              height: "500px",
              backgroundColor: "var(--color-surface)",
              animation: "pulse 1.5s infinite ease-in-out",
              borderRadius: "8px"
            }}
          />
          <p
            style={{
              backgroundColor: "var(--color-surface)",
              width: "120px",
              height: "14px",
              borderRadius: "4px",
              animation: "pulse 1.5s infinite ease-in-out",
              marginTop: "4px"
            }}
          />
        </div>
      </div>

      <section className={styles["info-section"]}>
        <div className={styles.info}>
          <div>
            <div
              style={{
                width: "300px",
                height: "32px",
                backgroundColor: "var(--color-surface)",
                borderRadius: "4px",
                animation: "pulse 1.5s infinite ease-in-out",
              }}
            />
            <div
              style={{
                width: "80px",
                height: "20px",
                marginTop: "8px",
                backgroundColor: "var(--color-surface)",
                borderRadius: "4px",
                animation: "pulse 1.5s infinite ease-in-out",
              }}
            />
          </div>
          <div
            style={{
              width: "200px",
              height: "18px",
              backgroundColor: "var(--color-surface)",
              borderRadius: "4px",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          />
        </div>

        <div className={styles["other-data"]}>
          <div className={styles.cover}>
            <div
              style={{
                width: "200px",
                height: "250px",
                backgroundColor: "var(--color-surface)",
                borderRadius: "8px",
                animation: "pulse 1.5s infinite ease-in-out",
              }}
            />
            <div className={styles.numbers}>
              <div className={styles.views}>
                <div
                  style={{
                    width: "40px",
                    height: "20px",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "4px",
                    animation: "pulse 1.5s infinite ease-in-out",
                  }}
                />
              </div>
              <div className={styles.likes}>
                <div
                  style={{
                    width: "40px",
                    height: "20px",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "4px",
                    animation: "pulse 1.5s infinite ease-in-out",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "var(--color-surface)",
              borderRadius: "4px",
              animation: "pulse 1.5s infinite ease-in-out",
              marginTop: "12px"
            }}
          />

          <div className={styles.interaction}>
            <div className={styles["not-logged"]}>
              <div
                style={{
                  width: "180px",
                  height: "20px",
                  backgroundColor: "var(--color-surface)",
                  borderRadius: "4px",
                  animation: "pulse 1.5s infinite ease-in-out",
                }}
              />
              <div className={styles.share}>
                <div
                  style={{
                    width: "80px",
                    height: "18px",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "4px",
                    animation: "pulse 1.5s infinite ease-in-out",
                    marginTop: "4px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
