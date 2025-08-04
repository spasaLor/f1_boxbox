import styles from "@/app/[username]/user.module.css";
import NavigationBar from "@/ui/profile/NavigationBar";
import Image from "next/image";
import Link from "next/link";

export default async function Likes({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/likes?username="+username);
    const races = await res.json();
    return(
        <main className={styles.main}>
            <NavigationBar main={false} username={username}/>
            <p className={styles.name}>Races</p>
            <div className={styles["liked-container"]}>
                {races.map(item =>(
                    <div className={styles["race-item"]} key={item.races.id}>
                        <div className={styles.img}>
                            <Link href={"/races/"+item.races.season+"/"+item.races.url}>
                                <Image src={item.races.cover} alt="race_cover" width={150} height={100}/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
           
        </main>
    )
}