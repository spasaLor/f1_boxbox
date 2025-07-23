'use client';
import Cookies from "js-cookie";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoggedSidebar({likes,initialLiked,list}){
    const [isLiked,setIsLiked]=useState(initialLiked);
    const [viewed,setViewed] = useState([]);
    const cookieStore = Cookies;
    const auth = cookieStore.get('connect.sid');

    useEffect(()=>{
        const getViewed = async()=>{
            const res = await fetch(process.env.BACKEND_URL+"/races/viewed",{headers:{
            'Cookie':'connect.sid='+auth
            }});
            const json = await res.json();
            setViewed(json);
        }
        getViewed();
    },[])


    const percentage = ()=>{
        let count=0;
        viewed.forEach(element => {
            if(list.races.contains(element))
                count++;
        });
        return count / list.races.length *100;
    }
    
    const toggleLike = async()=>{
        if(isLiked){
            const res = await fetch("/api/lists/like",{
                method:'DELETE',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({listId:list.id})
            });
            if(res.ok)
                setIsLiked(false);

        }else{
            const res = await fetch("/api/lists/like",{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({listId:list.id})
            });
            if(res.ok)
                setIsLiked(true);
        }        
    }

    return(
        <div className="sidebar">
            <div className="top">
                <p onClick={toggleLike}><Heart/> Like this list?</p> <i>{likes}</i>
            </div>
            <div className="share">
                <p>share</p>
            </div>
            <div className="percentage">
                <p>You've watched</p>
                <h2>{percentage()} %</h2>
                <p>{viewed.length} of {list.races.length}</p>
            </div>
        </div>
    )
}