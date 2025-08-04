import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    const data = await req.json();
    console.log(data);
    const res = await fetch(process.env.BACKEND_URL+"/user/upload_pic",{
        method:'POST',
        headers:{'Cookie':'connect.sid='+auth.value, 'Content-type':'apllication/json'},
        body: data
    });
    if(res.ok)
        return NextResponse.json({message:"Ok"},{status:200})
    else
        return NextResponse.json({message:"Error"},{status:500})

}