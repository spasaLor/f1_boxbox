import styles from "@/app/[username]/user.module.css";
import Link from "next/link";

export default function Following({data,isOwner}){
    return(
        <div className={styles.inner}>

            {
                data.length ==0 ?
                isOwner ?
                <p>you are not following anyone</p>
                :
                <p>This user is not following anyone</p>
                :
                data.map(item=>(
                    <Link className={styles["following-item"]} key={item.id} href={"/"+item.username}>{item.username}</Link>
                ))
            }
        </div>
        
    )
}