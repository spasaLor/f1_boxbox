import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req,{params}){
    const {raceId} = await params;
    const {review} = await req.json();
    const cookieStore = await cookies();
    const auth = cookieStore.get("connect.sid");

    const res = await fetch(process.env.BACKEND_URL+"/reviews/new",{
        method:'POST',
        headers:{
            'Content-type':"application/json",
            'Cookie':'connect.sid='+auth.value
        },
        body: JSON.stringify({content:review,raceId:raceId})
    });
    if(res.ok)
        return NextResponse.json({message:"Success"},{status:200});
    const json =await res.json();
    return NextResponse.json(json,{status:500});
}