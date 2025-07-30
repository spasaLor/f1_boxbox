import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req){
    const cookieStore = await cookies();
    const auth = cookieStore.get("connect.sid");
    const data = await req.json();

    if(!auth)
        return NextResponse.json({message:"Unauthorized"},{status:401});

    const res = await fetch(process.env.BACKEND_URL+"/user/edit",{
        method:'PUT',
        headers:{'Content-type': 'application/json','Cookie':'connect.sid='+auth.value},
        body:JSON.stringify(data)
    })
    if(res.ok)
        return NextResponse.json({message:"Ok"},{status:200})
    const json = await res.json();
    return NextResponse.json({message:json.message},{status:500})

}