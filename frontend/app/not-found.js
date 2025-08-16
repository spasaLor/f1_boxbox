import styles from '@/ui/not-found.module.css';

export default function NotFound() {
  return (
            <main className={styles["notfound-container"]}>
                <div className={styles["checkered-flag"]}>
                    {Array.from({ length: 64 }).map((_, i) => (
                    <div
                        key={i}
                        className={`square ${(Math.floor(i / 8) + i) % 2 === 0 ? 'white' : 'black'}`}
                    ></div>
                    ))}
                </div>

                <h1 className={styles["notfound-title"]}>404</h1>
                <p className={styles["notfound-message"]}>You took a wrong turn on the track!</p>

                <div className={styles["race-line"]}></div>

                <a href="/" className={styles["pitstop-button"]}>
                    Back to the Starting Grid
                </a>
            </main>
        );
}