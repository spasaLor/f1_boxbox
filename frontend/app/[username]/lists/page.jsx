import { redirect } from "next/navigation";

export default function ListsPage(){
    return(
        <div className="top">
            <p>Collect, curate, and share. Lists are the perfect way to group films.</p>
            <button type="button" onClick={()=>redirect("/lists/new")}>Start your own list</button>
        </div>        
    )
}