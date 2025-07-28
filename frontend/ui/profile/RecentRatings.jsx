import Image from "next/image";
import Link from "next/link";
import styles from "@/app/[username]/user.module.css";
import { Rating } from "@mui/material";
import { Heart, StarIcon } from "lucide-react";

export default function RecentRatings({races,username}){
    return(
        <div className={styles["recent-container"]}>
            {races.map(race =>(
                <div className={styles["recent-item"]} key={race.race_id}>
                    <div className={styles.image}>
                        <Link href={"/"+username+"/race/"+race.races.url+"-"+race.races.season}><Image src={race.races.cover} alt="race_cover" width={150} height={250}/></Link>
                    </div>
                    <div className="">
                        {race.rating>0 ? <Rating readOnly value={race.rating} size="small" sx={{color:'var(--color-text-secondary)'}} precision={0.5} emptyIcon={<StarIcon style={{opacity:1, color:'var(--color-text-secondary)',marginTop:'1.5px',marginLeft:'0.56px',}} size={16} strokeWidth={1}/>} />: null}
                        {race.isLiked && <Heart fill="var(--color-text-secondary)" strokeWidth={1} size={15} color="var(--color-text-secondary)"/>}
                    </div>
                </div>
            ))}
        </div>
    )
}