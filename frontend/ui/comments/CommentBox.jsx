'use client';
import { useRouter } from "next/navigation";
import { useRef } from "react";
import styles from "@/app/[username]/lists/list.module.css";

export default function CommentBox({targetType,itemId}){
    const textRef = useRef(null);
    const nav = useRouter();
    const sendComment = async()=>{
        const content = textRef.current.value;
        let res;
        if(targetType === 'list'){
            res = await fetch("/api/comments/lists/"+itemId,{
                method:'POST',
                headers:{'content-type':'application/json'},
                body: JSON.stringify({content})
            })
        }else{
            res = await fetch("/api/comments/reviews/"+itemId,{
                method:'POST',
                headers:{'content-type':'application/json'},
                body: JSON.stringify({content})
            })
        }
        if(res.ok){
            nav.refresh();
            textRef.current.value=null;
        }
    }

    return(
        <div className={styles.active}>
            <textarea name="comment" rows={6} cols={70} ref={textRef} placeholder="Leave a comment..."></textarea>
            <button type="button" onClick={sendComment}>POST</button>
        </div>
    )
}