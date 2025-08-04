import styles from '@/app/[username]/lists/list.module.css'
import getMetadata from '@/lib/getMetadata'
import { Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

export default async function PopularLists({data}){
    const metadata = await Promise.all(data.map(item=>getMetadata(item.id,'list')));    

    return(
        <>
            <div className={styles.sectionTitle}>
                <h2 className={styles.title}>Popular this week</h2>
                <h2 className={styles.title}> <Link href={"/lists/popular"}>More</Link> </h2> 
            </div>
            <div className={styles["pop-container"]}>
                {data.map((item,i)=>(
                    <div className={styles["pop-item"]} key={i}>
                        <div className={styles["lists-left"]}>
                            {item.races.slice(0,5).map(race => (
                                <div className={styles.cover} key={race.id}>
                                    <Image
                                        src={race.cover}
                                        alt="race_cover"
                                        width={120}
                                        height={150}
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
                            <b><Link href={"/"+item.user}>{item.user}</Link></b>
                            <p>{item.races.length} {item.races.length ===1 ? 'race':'races'}</p>                            
                            {metadata[i].likes._count.user_id > 0 ? <div className={styles.data}><Heart size={16} fill='var(--color-text-secondary)'/> <p>{metadata[i].likes._count.user_id}</p></div> : ''} 
                            {metadata[i].comments.length >0 ? <div className={styles.data}><MessageSquare size={16} fill='var(--color-text-secondary)' color='var(--color-text-secondary)'/> <p>{metadata[i].comments.length}</p> </div> : ''}                                        
                        </div>
                    </div>
                ))}
            </div>
        </>
        
    )
}