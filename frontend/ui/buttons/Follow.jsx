'use client';

import { useState } from "react";

export default function FollowButton({initial,toFollow}){
    const [follows,setFollows]=useState(initial);

    const toggleFollow = async()=>{
        if(follows){
            const res=await fetch("/api/user/follow",{
                method:'DELETE',
                headers:{'content-type':'application/json'},
                body: JSON.stringify({toFollow})                
            });
            if(res.ok)
                return setFollows(false);                    
        }

        const res=await fetch("/api/user/follow",{
            method:'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({toFollow})                
        });
        if(res.ok)
            return setFollows(true);                 
    }

    return(
        <button type="button" style={follows ? {backgroundColor:'var(--color-error)'}:{}} onClick={toggleFollow}>{follows ? 'following' : 'follow'}</button>
    )
}