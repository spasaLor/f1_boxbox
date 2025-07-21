import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(req,{params}){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    const {listId} = await params;

    const res = await fetch(process.env.BACKEND_URL+"/lists/"+listId,{
        method:'DELETE',
        headers:{
            'Cookie':'connect.sid='+auth.value
        }
    });

    if(res.ok)
        return NextResponse.json({message:"ok"},{status:200});
    const json = await res.json();
    return NextResponse.json(json,{status:500});
}