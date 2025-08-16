import Image from "next/image";
import styles from "@/app/[username]/lists/list.module.css";
import Link from "next/link";
import { EyeOff, Heart, MessageSquare, Pencil } from "lucide-react";
import { Tooltip } from "@mui/material";

export default function Lists({lists, username, isOwner, metadata}){
    return(
        lists.map((item,i)=>(
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
                        <div className={styles["top"]}>
                            <Link href={"/"+username+"/list/"+item.id+"-"+item.name} className={styles["list-name"]}>{item.name}</Link>
                            {item.privacy === 'private' ? <p title="Private list"> <Tooltip title="Private list" placement="bottom" arrow><EyeOff style={{cursor:'unset'}}/></Tooltip></p>:null}
                        </div>
                        <div>
                            <p>{item.races.length} races</p>
                            <Link href={"/"+username+"/lists/edit/"+item.name}> <Pencil size={14}/> </Link>
                        </div>
                    </div>
                }
                {!isOwner && 
                    <div className={styles["lists-right"]}>
                        <Link href={"/"+username+"/list/"+item.id+"-"+item.name} className={styles["list-name"]}>{item.name}</Link>
                        <div className={styles.bottom}>
                            <p>{item.races.length} {item.races.length ===1 ? 'race':'races'}</p>
                            {metadata[i].likes._count.user_id > 0 && <div className={styles.data}><Heart size={16} fill='var(--color-text-secondary)' color='var(--color-text-secondary)'/> <p>{metadata[i].likes._count.user_id}</p></div>} 
                            {metadata[i].comments.length >0 && <div className={styles.data}><MessageSquare size={16} fill='var(--color-text-secondary)' color='var(--color-text-secondary)'/> <p>{metadata[i].comments.length}</p> </div>}                                        
                        </div>
                        <div className={styles.description}>
                            <p>{item.description}</p>
                        </div>
                    </div>
                }
            </div>
        ))
    )
}