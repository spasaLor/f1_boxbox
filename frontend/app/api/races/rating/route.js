import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    const {rating,raceId} = await req.json();
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');

    if(!auth)
        return NextResponse.json({message:"Unauthorized",status:500})

    const res = await fetch(process.env.BACKEND_URL+"/ratings/new",{
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'Cookie':"connect.sid="+auth.value
        },
        body: JSON.stringify({rating,raceId})
    })
    if(res.ok)
        return NextResponse.json({message:"Ok",status:200});
    const json=await res.json();
    return NextResponse.json({message:json.message,status:500});
}

export async function PUT(req){
    const {rating,raceId} = await req.json();
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');

    if(!auth)
        return NextResponse.json({message:"Unauthorized",status:500})

    const res = await fetch(process.env.BACKEND_URL+"/ratings/update",{
        method:'PUT',
        headers:{
            'Content-type':'application/json',
            'Cookie':"connect.sid="+auth.value
        },
        body: JSON.stringify({rating,raceId})
    })
    if(res.ok)
        return NextResponse.json({message:"Ok",status:200});
    const json=await res.json();
    return NextResponse.json({message:json.message,status:500});
}