import Image from 'next/image';
import styles from '@/app/races/[season]/[name]/race.module.css';
import RatingComponent from './RatingComponent';
import WatchedLiked from './WatchedLiked';

export default function RaceContent({data,logged}){
    const formatted = new Date(data.date).toLocaleDateString();

    return(
        <>
            <div className={styles.hero}>
                <div className={styles.image}>
                    <Image
                    src={"https://media.formula1.com/image/upload/t_16by9North/c_lfill,w_3392/q_auto/v1740000000/trackside-images/2025/F1_Grand_Prix_Of_China___Previews/2205973441.webp"}
                    alt="Alonso and Bortoleto"
                    width={1300}
                    height={500}
                    />
                    <p>2025 Chinese GP Press Conference</p>
                </div>
            </div>  
            <div className={styles["info-section"]}>
                <div className={styles.cover}>
                    <Image
                    src={data.cover}
                    alt='race_cover'
                    width={200}
                    height={250}
                    />
                </div>
                <div className={styles.info}>
                    <h2>{data.denomination}</h2>
                    <div className="">
                        <p>Season: {data.season}</p> <i>Date: {formatted}</i> </div>
                        <p className={styles.notes}>{data.notes}</p>
                </div>
                <div className="interaction">
                    <div className="activity-buttons">
                        {!logged && <p>Sign in to log, rate or review</p> }
                        {logged &&
                        <>
                            <div className="watch-like">
                                <WatchedLiked raceId={data.id}/>
                            </div>
                            <div className="rating">
                                <p>Rate</p>
                                <RatingComponent id={data.id}/>
                            </div>
                            <div className="review">
                                <button type='button'>Review or log...</button>
                            </div>
                            <div className="lists">
                                <button type='button'>Add to lists...</button>
                            </div>
                            <div className="share">
                                <button type='button'>Share...</button>
                            </div>
                        </>
                          }
                    </div>
                    <button type="button">Share</button>
                    <div className="ratings">
                        <p>Ratings N</p>
                    </div>
                </div>
            </div>
        </>
        
    )
}