import styles from '@/app/races/races.module.css';

export default function SkeletonRaceList() {
  return (
    <div className={styles.races}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div className={styles.raceItem} key={i}>
          <div
            className="skeleton"
            style={{ width: '190px', height: '200px', borderRadius: '4px' }}
          ></div>

          <div className={styles.icons}>
            <div
              className="skeleton"
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                marginRight: '8px'
              }}
            ></div>
            <div
              className="skeleton"
              style={{ width: '20px', height: '20px', borderRadius: '4px' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
