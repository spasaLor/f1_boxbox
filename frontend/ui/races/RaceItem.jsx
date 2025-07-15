'use client'
import { Eye,Heart } from "lucide-react";
import Image from "next/image";
import styles from "@/app/races/races.module.css";
import Link from "next/link";

export default function RaceItem({logged,item,isLiked,isViewed,toggleLike,toggleView}){
    return(
        <>
            <Link href={"/races/"+item.season+"/"+item.url}>
                <Image src={item.cover} alt="race_cover" width={200} height={200}/>
            </Link>
            <div className={styles.icons} style={logged ? {} : {visibility:'hidden'}}>
                <Eye style={isViewed ? {color:'orange'}:null} onClick={()=>toggleView(item.id)}/> <Heart style={isLiked ? {color:'green'}:null} onClick={()=>toggleLike(item.id)}/>
            </div>
        </>
    )
}