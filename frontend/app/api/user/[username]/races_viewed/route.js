import { NextResponse } from "next/server";

export async function GET(req,{params}){
    const {username}= await params;
    const res=await fetch(process.env.BACKEND_URL+"/races/viewed/user/"+username);
    const json=await res.json();

    if(res.ok)
        return NextResponse.json(json,{status:200});
    else
        return NextResponse.json({message:json.message},{status:500})

}