import RaceContent from "@/ui/races/RaceContent";
import { cookies } from "next/headers";

export default async function RacePage({params}){
    const {season,name}= await params;
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    
    const res = await fetch(process.env.BACKEND_URL+"/races/"+season+"/"+name);
    const race = await res.json();
    return(
        <RaceContent data={race} logged={!!auth}/>
    )
}