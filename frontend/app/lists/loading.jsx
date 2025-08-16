import styles from "./listsPage.module.css";
import SkeletonPopular from '@/ui/skeletons/skeletonPopular';
import SkeletonRecentlyLiked from '@/ui/skeletons/skeletonRecentlyLiked';

export default function Loading() {
  return (
    <main className={styles.main}>
        <div className={styles.header}>
            <p>Collect, curate, and share. Lists are the perfect way to group films.</p>
            <h2>Start your own list</h2>
        </div>
        <section className={styles.popular}>
            <SkeletonPopular/>
        </section>
        <section className={styles.recently}>
            <SkeletonRecentlyLiked />
        </section>
    </main>
  );
}
