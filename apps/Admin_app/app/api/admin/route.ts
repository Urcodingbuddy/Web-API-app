import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () =>{
    const session = await getServerSession(authOptions);
    if(session.admin){
        return NextResponse.json({
            user: session.admin
        })
    }
    return NextResponse.json({
        message: "User not Logged in"
    },{
        status:403
    })
}

