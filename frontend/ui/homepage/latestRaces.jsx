import Link from "next/link";
import styles from "./latest.module.css";
import Image from "next/image";

export const revalidate = 300;
export default async function LatestRaces(){
    const res = await fetch(process.env.BACKEND_URL+"/races/latest");
    const races=await res.json();
    return(
        <div className={styles["races-cards"]}>
            {races.map(item=>(
                <div className={styles.card} key={item.id}>
                    <Link href={"/races/"+item.season+"/"+item.round}>
                        <Image src={item.cover} alt="race_cover" width={200} height={300}></Image>
                    </Link>
                </div>
            ))}
        </div>
    );
}