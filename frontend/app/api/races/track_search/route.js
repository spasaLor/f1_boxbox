import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    const res = await fetch(process.env.BACKEND_URL+"/races/track",{
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body:JSON.stringify({track:data.track})
    });
    const json = await res.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
    return NextResponse.json(json,{status:500});
}