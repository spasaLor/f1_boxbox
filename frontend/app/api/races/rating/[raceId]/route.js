import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    const {raceId} = await params;
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    if(!auth)
        return NextResponse.json({message:"Unauthorized",status:401});
    const res = await fetch(process.env.BACKEND_URL+"/ratings/"+raceId,{
        headers:{
            'Cookie':'connect.sid='+auth.value
        }
    });
    const json=await res.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
    return NextResponse.json(json,{status:500});
}

export async function DELETE(req,{params}){
    const {raceId} = await params;
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    if(!auth)
        return NextResponse.json({message:"Unauthorized",status:401});
    const res = await fetch(process.env.BACKEND_URL+"/ratings/"+raceId,{
        method:'DELETE',
        headers:{
            'Cookie':'connect.sid='+auth.value
        }
    });
    const json=await res.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
    return NextResponse.json(json,{status:500});
}