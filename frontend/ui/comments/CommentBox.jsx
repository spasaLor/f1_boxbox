'use client';
import { useRouter } from "next/navigation";
import { useRef } from "react";

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
        <>
            <textarea name="comment" rows={5} cols={20} ref={textRef}></textarea>
            <button type="button" onClick={sendComment}>POST</button>
        </>
    )
}