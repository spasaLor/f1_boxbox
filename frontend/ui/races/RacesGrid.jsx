import { Rating } from "@mui/material";
import { AlignLeft, Heart, Star} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RacesGrid({races,username}){
    return(
        races.map(item =>(
            <div className="race-item" key={item.id}>
                <div className="img">
                    <Link href={"/races/"+item.season+"/"+item.url}>
                        <Image src={item.cover} alt="race_cover" width={150} height={200}/>
                    </Link>
                </div>
                <div className="icons">
                    {item.ratings ? <Rating name="read-only" value={item.ratings} readOnly precision={0.5} sx={{color:'var(--color-text-secondary)'}} size="small" emptyIcon={<Star color="gray" strokeWidth={0.5} size={18}/>}/> :null}
                    {item.race_liked ? <Heart fill="var(--color-text-secondary)" size={10}/> :null}
                    {item.reviews ? <Link href={"/"+username+"/race/"+item.url+"-"+item.season}><AlignLeft fill="var(--color-text-secondary)" size={14}/></Link> :null}
                </div>
            </div>
        ))
        
    )
}