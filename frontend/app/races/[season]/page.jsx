import Races from "@/ui/races/Races";

export async function generateMetadata({params}){
    const {season}= await params;
    return{
        title:season+" Season",
        description: "This page shows all the races of a certain season"
    }

}
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