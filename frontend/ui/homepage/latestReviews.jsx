import Image from "next/image";
import Link from "next/link";
import styles from "./latest.module.css";

export const revalidate=300;
export default async function LatestReviews(){
    const res=await fetch(process.env.BACKEND_URL+"/reviews/latest");
    const reviews = await res.json();

    return(
        <div className={styles["reviews-section"]}>
            <p>Just reviewed...</p>
            <div className={styles["latest-reviews"]}>
                {reviews.map(item=>(
                    <div className={styles.review} key={item.id}>
                        <Link href={"/"+item.users.username+"/race/"+item.races.url+"-"+item.races.season}>
                            <Image src={item.races.cover} alt="race_cover" width={80} height={105}></Image>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.text}>
                <h3>Write and share reviews. Compile your own lists. Share your life in racing.</h3>
                <i>Below are some popular reviews and lists from this week. Sign up to create your own.</i>
            </div>
        </div>
        
    );
}