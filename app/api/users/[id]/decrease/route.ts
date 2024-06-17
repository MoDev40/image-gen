import connectToDatabase from "@/lib/database/connectionDatabase";
import User from "@/lib/database/models/userModal";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest,{params}:{params:Params}){
    try {
        await connectToDatabase()
        const { id } = params;
        console.log(id);
        await User.findByIdAndUpdate(
            id,
            { $inc: { creditBalance: -5 } },
            { new: true }
          )        
        return NextResponse.json({message:"Reduced credit successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Unexpected error while fetching data"},{status:500})
    }
}