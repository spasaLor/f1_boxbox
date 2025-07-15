import Races from "@/ui/races/Races";
import { cookies } from "next/headers";

export default async function Page(){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    const year = "2024";
    const racesRes = await fetch(process.env.BACKEND_URL+"/races/"+year);
    const races = await racesRes.json();
    let liked='';
    let viewed='';
    let logged=false;

    if(auth){
        const likedPromise = fetch(process.env.BACKEND_URL+"/races/liked",{headers:{
            'Cookie':'connect.sid='+auth.value
        },
        cache:'no-cache'});
        const viewedPromise = fetch(process.env.BACKEND_URL+"/races/viewed",{headers:{
            'Cookie':'connect.sid='+auth.value
        },
        cache:'no-cache'});
        const [likedRes,viewedRes]= await Promise.all([likedPromise,viewedPromise]);
        liked = await likedRes.json();
        viewed = await viewedRes.json();
        logged=true;
    } 

    return(
        <main>
            <Races logged={logged} initialRaces={races.races} initialYear={year} initialLiked={logged ? liked.map(item=>item.race_id) : []} initialViewed={logged ? viewed.map(item=>item.race_id):[]}/>
        </main>
    )
}