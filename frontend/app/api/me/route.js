import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookieStore= await cookies();
    const conn = cookieStore.get('connect.sid');
    if(!conn)
        return NextResponse.json({messaage:"no cookies",status:400});
    const res = await fetch(process.env.BACKEND_URL+"/me",{method:'GET',
        headers:{
            'Cookie':"connect.sid="+conn.value
        }
    });
    const json=await res.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
}