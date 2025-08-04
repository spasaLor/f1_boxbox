import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    if(!auth)
        return NextResponse.json({message:"Unauthorized"},{status:401});
    const {toFollow} = await req.json();

    const res = await fetch(process.env.BACKEND_URL+"/user/follow",{
        method:'POST',
        headers:{'content-type':'application/json', 'Cookie':'connect.sid='+auth.value},
        body: JSON.stringify({toFollow})
    });
    if(res.ok)
        return NextResponse.json({message:'Ok'},{status:200});
    const json = await res.json();
    return NextResponse.json({message:json.message},{status:500});
}

export async function DELETE(req){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    if(!auth)
        return NextResponse.json({message:"Unauthorized"},{status:401});
    const {toFollow} = await req.json();

    const res = await fetch(process.env.BACKEND_URL+"/user/follow",{
        method:'DELETE',
        headers:{'content-type':'application/json','Cookie':'connect.sid='+auth.value},
        body: JSON.stringify({toFollow})
    });
    if(res.ok)
        return NextResponse.json({message:'Ok'},{status:200});
    const json = await res.json();
    return NextResponse.json({message:json.message},{status:500});
}