import RaceContent from "@/ui/races/RaceContent";
import { cookies } from "next/headers";

export async function generateMetadata({params}){
    const {season,name}= await params;
    const res = await fetch(process.env.BACKEND_URL+"/races/"+season+"/"+name);
    const race = await res.json();
    return{
        title:race.denomination+" "+season,
        description: "Page of with all the infos for the "+season+" "+race.denomination
    }
}

export default async function RacePage({params}){
    const {season,name}= await params;
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    
    const res = await fetch(process.env.BACKEND_URL+"/races/"+season+"/"+name,{cache:'no-store'});
    const race = await res.json();
    let likedReviews=[];

    if(auth?.value){
        const res = await fetch(process.env.BACKEND_URL+"/reviews/liked",{
            headers:{'Cookie':'connect.sid='+auth.value},
        });
        const json=await res.json();
        likedReviews=json.likes;
    }
    return(
        <RaceContent data={race} logged={!!auth} season={season} name={name} likedReviews={likedReviews}/>    
    )   
}