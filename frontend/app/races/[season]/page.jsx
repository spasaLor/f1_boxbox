import Races from "@/ui/races/Races";

export default async function Page({params}){
    const {season}= await params;
    const racesRes = await fetch(process.env.BACKEND_URL+"/races/"+season);
    const races = await racesRes.json();
    return(
        <main>
            <Races initialRaces={races.races} initialYear={season}/>
        </main>
    )
}