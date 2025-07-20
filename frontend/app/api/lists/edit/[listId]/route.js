import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req,{params}){
    const {listId} = await params;
    const data = await req.json();
    const cookieStore = await cookies();
    const auth = cookieStore.get("connect.sid");

    const res = await fetch(process.env.BACKEND_URL+"/lists/"+listId,{
        method:'PUT',
        headers:{
            'Cookie':'connect.sid='+auth.value,
            'Content-type':'application/json'
        },
        body: JSON.stringify(data)
    });
    if(res.ok)
        return NextResponse.json({message:"ok"},{status:200});
    const json=await res.json();
    return NextResponse.json({message:json.message},{status:500});
    
}