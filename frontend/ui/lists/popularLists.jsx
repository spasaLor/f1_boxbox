import styles from '@/app/[username]/lists/list.module.css'
import getMetadata from '@/lib/getMetadata'
import { Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

export default async function PopularLists({data}){
    const metadata = await Promise.all(data.map(item=>getMetadata(item.id,'list')));    

    return(
        <>
            <h2 className={styles.title}>Popular this week</h2>
            <div className={styles["pop-container"]}>
                {data.map((item,i)=>(
                    <div className={styles["pop-item"]} key={i}>
                        <div className={styles["lists-left"]}>
                            {item.races.slice(0,5).map(race => (
                                <div className={styles.cover} key={race.id}>
                                    <Image
                                        src={race.cover}
                                        alt="race_cover"
                                        width={80}
                                        height={120}
                                    />
                                </div>
                            ))}
                            {Array.from({length: 5 - item.races.length}).map((_, index) => (
                                <div className={styles.cover} key={`blank-${index}`}>
                                    <div className={styles["blank-cover"]}></div>
                                </div>
                            ))}
                        </div>
                        <Link href={"/"+item.user+"/list/"+item.id+"-"+item.name} className={styles["list-name"]}>{item.name}</Link>
                        <div className={styles.bottom}>
                            <Link href={"/"+item.user}>{item.user}</Link>
                            <p>{item.races.length} races</p>                            
                            {metadata[i].likes._count.user_id > 0 ? <div className={styles.data}><Heart/> <p>{metadata[i].likes._count.user_id}</p></div> : ''} 
                            {metadata[i].comments.length >0 ? <div className={styles.data}><MessageSquare size={16}/> <p>{metadata[i].comments.length}</p> </div> : ''}                                        
                        </div>
                    </div>
                ))}
            </div>
        </>
        
    )
}