import Link from "next/link";
import CommentBox from "./CommentBox";
import { formatDistanceToNow } from 'date-fns';
import styles from "@/app/[username]/lists/list.module.css";

export default function Comments({comments,isLogged,targetType,targetId}){
    return(
        <>
            {comments.map(item=>(
                <div className={styles["comment-item"]} key={item.id}>
                    <div className={styles.left}>
                        <Link href={"/"+item.users.username}>{item.users.username}</Link>
                        <p>{formatDistanceToNow(new Date(item.published_at), {addSuffix:true})}</p>
                    </div>
                    <p>{item.content}</p>
                </div>
            ))}
            <div className={styles["comment-box"]}>
                {!isLogged && <p>Please sign in to reply.</p> }
                {isLogged && <CommentBox itemId={targetId} targetType={targetType}/>}
            </div>
        </>
        
    )
}