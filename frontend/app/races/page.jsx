import Races from "@/ui/races/Races";

export default async function Page(){
    const year = "2024";
    const racesRes = await fetch(process.env.BACKEND_URL+"/races/"+year);
    const races = await racesRes.json();

    return(
        <main>
            <Races initialRaces={races.races} initialYear={year}/>
        </main>
    )
}