import Image from "next/image";
import Link from "next/link";
import styles from "./lists.module.css";

export default function ListView({list}){
    return(
        <div className={styles["list-grid"]}>
            {list.races.map((item,i)=>(
                <div className={styles.item} key={item.id}>
                    <Link href={"/races/"+item.season+"/"+item.url}>
                        <Image
                        src={item.cover}
                        alt="cover_image"
                        width={150}
                        height={100}
                        />
                    </Link>
                    {list.ranked && <p>{i+1}</p> }
                </div>
            ))}
        </div>
    )
}