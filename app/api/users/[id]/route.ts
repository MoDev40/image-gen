import connectToDatabase from "@/lib/database/connectionDatabase";
import User from "@/lib/database/models/userModal";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,{params}:{params:Params}){
    try {
        await connectToDatabase()
        const { id } = params;
        const user = await User.findOne({clerkId:id});

        if(!user){
            return NextResponse.json({message:"Unexpected error while fetching data"},{status:500})
        }
        
        if(user.creditBalance < 0){
            await User.findByIdAndUpdate(user._id,{$set: {creditBalance:0}})
        }
        return NextResponse.json({user},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Unexpected error while fetching data"},{status:500})
    }
}