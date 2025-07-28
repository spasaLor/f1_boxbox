import { Heart, MessageSquare, Pencil } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import styles from "./list.module.css";
import Link from "next/link";
import getMetadata from "@/lib/getMetadata";

export default async function ListsPage({params}){
    const cookieStore = await cookies();
    const user = cookieStore.get('username');
    const {username} = await params;
    const isOwner = user?.value === username;

    const res = await fetch(process.env.BACKEND_URL+"/lists/user",{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({username})
    });
    const json = await res.json();
    const lists = json.lists;
    const metadata = await Promise.all(lists.map(async(item)=>await getMetadata(item.id,'list')));

    return(
        lists.length === 0 ?
            <div className={styles.top}>
                <p>Collect, curate, and share. Lists are the perfect way to group films.</p>
                <Link href={"/"+user.value+"/lists/new"}>
                    <button type="button">Start your own list</button>
                </Link>
                
            </div> :
            <>
                <div className={styles.header}>
                    {isOwner && <>
                        <h2>Your lists</h2>                        
                        <Link href={"/"+username+"/lists/new"}>
                            <button type="button">Start a new list...</button>
                        </Link>
                    </>}
                    {!isOwner && <h2>Lists</h2>}
                    
                </div>
                <div className={styles["list-container"]}>
                    {lists.map((item,i)=>(
                        <div className={styles["list-item"]} key={item.id}>
                            <div className={styles["lists-left"]}>
                                {item.covers.slice(0,5).map((race, index) => (
                                    <div className={styles.cover} key={index}>
                                        <Image
                                            src={race}
                                            alt="race_cover"
                                            width={80}
                                            height={120}
                                        />
                                    </div>
                                ))}
                                {Array.from({length: 5 - item.covers.length}).map((_, index) => (
                                    <div className={styles.cover} key={`blank-${index}`}>
                                        <div className={styles["blank-cover"]}></div>
                                    </div>
                                ))}
                            </div>
                            {isOwner && 
                                <div className={styles["lists-right"]}>
                                    <Link href={"/"+username+"/list/"+item.id+"-"+item.name} className={styles["list-name"]}>{item.name}</Link>
                                    <div >
                                        <p>{item.races.length} races</p>
                                        <Link href={"/"+username+"/lists/edit/"+item.name}> <Pencil size={14}/> </Link>
                                    </div>
                                </div>
                            }
                            {!isOwner && 
                                <div className={styles["lists-right"]}>
                                    <Link href={"/"+username+"/list/"+item.id+"-"+item.name} className={styles["list-name"]}>{item.name}</Link>
                                    <div className={styles.bottom}>
                                        <p>{item.races.length} races</p>
                                        {metadata[i].likes._count.user_id > 0 ? <div className={styles.data}><Heart/> <p>{metadata[i].likes._count.user_id}</p></div> : ''} 
                                        {metadata[i].comments.length >0 ? <div className={styles.data}><MessageSquare size={16}/> <p>{metadata[i].comments.length}</p> </div> : ''}                                        
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            }
                            
                        </div>
                        
                    ))}
                </div> 
            </>
                          
    )
}