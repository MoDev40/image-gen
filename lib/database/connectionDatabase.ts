import mongoose from "mongoose"

const dbUrl : string = process.env.DATABASE_URL!
async function connectToDatabase(){
    mongoose.connect(dbUrl,{dbName:"ImageGen"}).then(()=>{
        console.log("connected");
    }).catch(()=>{
        console.log("error connecting to database"); 
    })
}

export default connectToDatabase;