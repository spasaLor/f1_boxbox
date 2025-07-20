import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req,{params}){
    const {id} = params;
    const data = await req.json();
    const cookieStore = await cookies();
    const auth = cookieStore.get("connect.sid");
    if(!auth)
        return NextResponse.json("Error",{status:500});
    const res = await fetch(process.env.BACKEND_URL+"/reviews/"+id,{
        method:'PUT',
        headers:{
            'Cookie':'connect.sid='+auth.value,
            'Content-type':'application/json'
        },
        body: JSON.stringify({content:data.review})
    });
    const json = await res.json();
    if(res.ok){
        return NextResponse.json("Ok",{status:200});
    }
    return NextResponse.json(json.message,{status:500});
}