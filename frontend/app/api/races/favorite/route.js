import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    if(!auth)
        return NextResponse.json({message:"Unauthorized",status:401});

    const res = await fetch(process.env.BACKEND_URL+"/races/favorites",{method:'POST',
            headers:{
                'Content-type':'application/json',
                'Cookie':'connect.sid='+auth.value
            },
            body:JSON.stringify(data)
        })
        const json=await res.json();
        if(res.ok){
            return NextResponse.json({json,status:200});
        }
        else
            return NextResponse.json({json,status:500})
}

export async function DELETE(req){
    const data = await req.json();
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    const username = cookieStore.get('username');
    if(!auth)
        return NextResponse.json({message:"Unauthorized",status:401});

    const res = await fetch(process.env.BACKEND_URL+"/races/favorites",{method:'DELETE',
            headers:{
                'Content-type':'application/json',
                'Cookie':'connect.sid='+auth.value
            },
            body:JSON.stringify(data)
        })
        const json=await res.json();
        if(res.ok){
            return NextResponse.json({json,status:200});
        }
        else
            return NextResponse.json({json,status:500})
}