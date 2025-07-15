import Image from "next/image";
import styles from "@/app/welcome/welcome.module.css";

export default function GridItem({img,title,text}){
    return(
        <div className={styles.gridItem}>
            <div className={styles.text}>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <div className={styles.image}>
                <Image
                src={img}
                alt="image"
                width={700}
                height={300}
            />
            </div>            
        </div>
    )
}