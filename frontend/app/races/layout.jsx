import { RacesProvider } from "@/lib/RacesContext";
import { cookies } from "next/headers";

export default async function RacesLayout({children}){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    
    let liked=[];
    let viewed=[];
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
        <RacesProvider
        logged={logged}
        viewed={logged ? viewed.map(i=>i.race_id): []}
        liked={logged ? liked.map(i=>i.race_id):[]}
        >
            {children}
        </RacesProvider>
    )
}