'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./network.module.css";
import Link from "next/link";

export default function Displayitem({username}){
    const path = usePathname();
    const p=path.split("/");
    const action=p.pop();
    const [times,setTimes]=useState(1);
    const [toShow,setToShow]=useState([]);
    const [loading,setLoading]=useState(true);
    const [show,setShow]=useState(false);

    useEffect(()=>{
        const getFollowing=async()=>{
            const res = await fetch("/api/user/following/"+username+"?limit=10&offset=0");
            const item=await res.json();
            setToShow(item);
            setLoading(false);
        }
        const getFollowers=async()=>{
            const res = await fetch("/api/user/followers/"+username+"?limit=10&offset=0");
            const item=await res.json();
            setToShow(item);
            setLoading(false);
        }
        if(action==='following')
            getFollowing();
        else
            getFollowers();
    },[]);

    const getFollowing = async()=>{
        setLoading(true);
        const res = await fetch("/api/user/following/"+username+"?limit=10&offset="+times);
        const json = await res.json();
        if(json.length < 10)
            setShow(false);
        setToShow(prev=>[...prev,...json]);
        setTimes(prev=>prev+1);
        setLoading(false);
    }
    const getFollowers = async()=>{
        setLoading(true);
        const res = await fetch("/api/user/followers/"+username+"?limit=10&offset="+times);
        const json = await res.json();
        if(json.length < 10)
            setShow(false);
        setToShow(prev=>[...prev,...json]);
        setTimes(prev=>prev+1);
        setLoading(false);
    }
    if(loading)
        return(
            <>
                <div className={styles.header}>
                    <p>name</p>
                    <p>Watched</p>
                    <p>lists</p>
                    <p>likes</p>
                </div>                
            </>
        )
    return(
        <>
            <div className={styles.header}>
                <p>name</p>
                <p>Watched</p>
                <p>lists</p>
                <p>likes</p>
            </div>
            {
            toShow.length == 0 ? 
            (action === 'following' ? <p>This user is not following anyone</p> : <p>This user has no followers</p> )
            :
            toShow.map(item=>(
                <div className={styles["user-item"]} key={item.id}>
                    <Link href={"/"+item.username}>{item.username}</Link>
                    <p>{item._count.viewed}</p>
                    <p>{item._count.lists}</p>
                    <p>{item._count.race_liked}</p>
                </div>
            ))}
            <div className={styles.bottom}>
                {show && <button type="button" onClick={action === 'following' ? getFollowing : getFollowers} disabled={loading}>Load More</button>}
            </div>
        </>
    )
}