import Image from "next/image";
import styles from "@/app/[username]/lists/list.module.css";

export default function SelectedRaceItem({data, removeRace}){
    return(
            <>
                <div className={styles["race-left"]}>
                    <div className={styles.image}>
                        <Image
                        src={data.cover}
                        width={70}
                        height={110}
                        alt={data.denomination}
                        />
                    </div>
                    <h3>{data.denomination}</h3> <i>{data.season}</i>
                </div>               
            </>            
    )
}