'use client';
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Status({initialLiked,id,isLogged,isOwner}){
    const [isLiked, setIsLiked]=useState(initialLiked);
    const nav = useRouter();

    const toggleLike = async()=>{
        if(isLiked){
            const res = await fetch("/api/reviews/like",{
                method:'DELETE',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({reviewId:id})
            });
            if(res.ok){
                nav.refresh();
                setIsLiked(false);
            }                

        }else{
            const res = await fetch("/api/reviews/like",{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({reviewId:id})
            });
            if(res.ok){
                nav.refresh();
                setIsLiked(true);
            }
        }        
    }
    return(<>
        <Heart style={isLiked ? {fill:'orange'}:null}/>
        {isLogged && !isOwner ? isLiked ? <b onClick={toggleLike}>Liked</b> :  <b onClick={toggleLike}>Like review</b>:null}
    </>)
}