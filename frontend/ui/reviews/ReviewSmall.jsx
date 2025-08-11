import Link from "next/link";
import LikeCounter from "./LikeCounter";
import { Heart, Star } from "lucide-react";
import { Rating } from "@mui/material";

export default function ReviewSmall({item,name,season,likedReviews,isLogged}){
    return(
        <>
            <div className="">
                <Rating readOnly name="read-only" value={item.rating} precision={0.5} size="small" emptyIcon={<Star color="var(--color-text-secondary)" strokeWidth={0.5} size={18}/>}/>
                <Link href={"/"+item.users.username+"/race/"+name+"-"+season}>Review by <b>{item.users.username}</b></Link>
            </div>
            <p>{item.content}</p>
            {isLogged ? <LikeCounter init={likedReviews.includes(item.id)} itemId={item.id} initialLikes={item.likes.length}/> : <p style={{display:'flex',alignItems:'center',gap:'4px'}}><Heart size={16} fill="var(--color-text-secondary)" color="var(--color-text-secondary)" strokeWidth={1}/> {item.likes.length} likes</p> }
        </>
    )    
}