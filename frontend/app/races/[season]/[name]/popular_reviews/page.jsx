import AllPopularReviews from "@/ui/races/AllPopularReviews";
import { cookies } from "next/headers";
import styles from "@/app/races/[season]/[name]/race.module.css";
import Image from "next/image";

export async function generateMetadata({params}){
    const {season,name} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/races/"+season+"/"+name);
    const race = await res.json();
    return{
        title:race.denomination+" | Popular Reviews",
        description:"Popular reviews of the "+season+" "+race.denomination
    }
}

export default async function PopPage({params}){
    const {season,name} = await params;
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');

    const isLogged = !!auth?.value;
    let likedReviews=[];

    if(auth?.value){
        const res = await fetch(process.env.BACKEND_URL+"/reviews/liked",{
            headers:{'Cookie':'connect.sid='+auth.value},
        });
        const json=await res.json();
        likedReviews=json.likes;
    }

    const res = await fetch(process.env.BACKEND_URL+"/races/"+season+"/"+name);
    const race = await res.json();

    return(
        <main className={styles.main}>
            <div className={styles.left}>
                <div className={styles.header}>
                    <p>Popular reviews of the <h2>{race.denomination} </h2> <i>{season}</i></p>
                </div>
                <div className={styles["reviews-container"]}>
                    <AllPopularReviews name={name} season={season} likedReviews={likedReviews} logged={isLogged}/>
                </div>
            </div>
            <div className={styles.right}>
                <Image src={race.cover} alt="race_cover" width={200} height={320}/>
            </div>
            
        </main>
    )

}