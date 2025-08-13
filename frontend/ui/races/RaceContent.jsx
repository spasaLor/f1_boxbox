import Image from 'next/image';
import styles from '@/app/races/[season]/[name]/race.module.css';
import RatingComponent from './RatingComponent';
import WatchedLiked from './WatchedLiked';
import Link from 'next/link';
import { Eye, Heart } from 'lucide-react';
import ReviewRace from './ReviewComponent';
import { cookies } from 'next/headers';
import AddToList from './AddToList';
import PopularReviews from './PopularReviews';
import RaceRecentReviews from './RecentReviews';
import { format } from 'date-fns';

export default async function RaceContent({data,logged,season,name,likedReviews}){
    const formatted = format(new Date(data.date),"dd MMM yyyy");
    const cookieStore=await cookies();
    const auth = cookieStore.get('connect.sid');
    const user= cookieStore.get('username');
    
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
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({username: user.value})
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
                    src={data.hero}
                    alt="hero image"
                    width={1300}
                    height={500}
                    />
                    <p>&copy; Formula One</p>
                </div>
            </div>  
            <section className={styles["info-section"]}>
                <div className={styles.info}>                    
                    <div>
                        <h1>{data.denomination}</h1>
                        <Link href={"/races/"+data.season}>{data.season}</Link>
                    </div>                    
                    <i style={{color:"var(--color-text-secondary)"}}>{formatted}, {data.circuit_name}</i>
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
                                <p>{data._count.viewed}</p>                              
                            </div>
                            <div className={styles["likes"]}>
                                <Heart style={{fill:'orange'}} color='var(--color-bg)' strokeWidth={1}/>
                                <p>{data._count.race_liked}</p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.notes}>{data.notes}</p>
                    <div className={styles.interaction}>
                        {!logged && 
                            <div className={styles["not-logged"]}>
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
                    </div>
                </div>
            </section>
            <section className={styles.reviews}>
                <div className={styles["popular-reviews-container"]}>
                    <div className={styles.header}>
                        <p>Popular Reviews</p>
                        <Link href={"./"+name+"/popular_reviews"}>All</Link>
                    </div>
                    <PopularReviews raceId={data.id} season={season} name={name} likedReviews={likedReviews} isLogged={logged}/>
                </div>
                <div className={styles["recent-reviews-container"]}>
                    <div className={styles.header}>
                        <p>Recent Reviews</p>
                    </div>
                    <RaceRecentReviews raceId={data.id} season={season} name={name} likedReviews={likedReviews} isLogged={logged}/>
                </div>
            </section>
        </>
    )
}