import Image from "next/image";
import Link from "next/link";
import styles from "@/app/[username]/user.module.css";

export default function FavRaces({races}){
    return(
        <div className={styles["fav-container"]}>
            {races.map(race =>(
                <div className={styles["fav-item"]} key={race.id}>
                    <div className={styles.image}>
                        <Link href={"/races/"+race.season+"/"+race.url}><Image src={race.cover} alt="race_cover" width={150} height={250}/></Link>
                    </div>
                </div>
            ))}
        </div>
    )
}