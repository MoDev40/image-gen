import connectToDatabase from "@/lib/database/connectionDatabase";
import User from "@/lib/database/models/userModal";
import {NextRequest,NextResponse} from "next/server"

type Params = {
    id:string;
} 
export async function GET(req:NextRequest,{params}:{params:Params}){
    try {
        await connectToDatabase()
        const { id } = params;
        const user = await User.findOne({clerkId:id});
        return NextResponse.json({user},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Unexpected error while fetching data"},{status:500})
    }
}