import mongoose from "mongoose"

const dbUrl : string = process.env.DATABASE_URL!
async function connectToDatabase(){
    await mongoose.connect(dbUrl,{dbName:"ImageGen"}).then(()=>{
        console.log("connected");
    }).catch((err)=>{
        console.log("error connecting to database",err); 
    })
}

export default connectToDatabase;