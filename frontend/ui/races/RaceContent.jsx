import Image from 'next/image';
import styles from '@/app/races/[season]/[name]/race.module.css';
import RatingComponent from './RatingComponent';
import WatchedLiked from './WatchedLiked';
import Link from 'next/link';
import { Eye, Heart } from 'lucide-react';
import ReviewRace from './ReviewComponent';
import { cookies } from 'next/headers';
import AddToList from './AddToList';

export default async function RaceContent({data,logged}){
    const formatted = new Date(data.date).toLocaleDateString();
    const cookieStore=await cookies();
    const auth = cookieStore.get('connect.sid');
    let review={};
    let lists=[];

    if(auth){
        const reviewsPromise = fetch(process.env.BACKEND_URL+"/reviews/race/"+data.id,{
            method:'GET',
            headers:{
                'Cookie':'connect.sid='+auth.value
            }
        });
        const listsPromise = fetch(process.env.BACKEND_URL+"/lists/user",{
            method:'GET',
            headers:{
                'Cookie':'connect.sid='+auth.value
            }
        });
        const[reviewsRes, listsRes] = await Promise.all([reviewsPromise, listsPromise]);
        const json = await reviewsRes.json();
        review = json.review;
        const other = await listsRes.json();
        lists = other.lists;
    }   
    

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
                <div className={styles.info}>
                    <h2>{data.denomination}</h2>
                    <div>
                        <p>Season: {data.season}</p> <i>Date: {formatted}</i>
                    </div>                    
                </div>
                <div className={styles["other-data"]}>
                    <div className={styles.cover}>
                    <Image
                    src={data.cover}
                    alt='race_cover'
                    width={200}
                    height={250}
                    />
                    <div className={styles["numbers"]}>
                        <div className={styles["views"]}>
                            <Eye style={{color:'green'}} />
                            { <p>{data._count.viewed}</p> }
                            
                        </div>
                        <div className={styles["likes"]}>
                            <Heart style={{fill:'orange'}} strokeWidth={1}/>
                            {data._count.race_liked}
                        </div>
                    </div>
                </div>
                <p className={styles.notes}>{data.notes}</p>
                <div className={styles.interaction}>
                        {!logged && <div className={styles["not-logged"]}>
                            <p>Sign in to log, rate or review</p>
                            <div className={styles["share"]}>
                                    <Link href={"#"}>Share...</Link>
                            </div>
                            </div>}
                        {logged &&
                            <div className={styles["activity-buttons"]}>
                                <div className={styles["watch-like"]}>
                                    <WatchedLiked raceId={data.id}/>
                                </div>
                                <div className={styles["rating"]}>
                                    <p>Rate</p>
                                    <RatingComponent id={data.id}/>
                                </div>
                                <div className={styles["review"]}>
                                    <ReviewRace item={data} review={review}/>
                                </div>
                                <div className={styles["lists"]}>
                                    <AddToList lists={lists} item={data}/>
                                </div>
                                <div className={styles["share"]}>
                                    <Link href={"#"}>Share...</Link>
                                </div>
                            </div>
                          }
                   
                        <div className="ratings">
                            <p>Ratings N</p>
                        </div>
                        </div>
                    </div>
                </div>
                
                
        </>
        
    )
}