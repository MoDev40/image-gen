import mongoose , { Mongoose} from "mongoose";

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

const databaseUrl : string = process.env.DATABASE_URL!

let cachedConnection : MongooseConnection = (global as any).mongoose;

if(!cachedConnection) {
    cachedConnection = (global as any).mongoose = { 
      conn: null, promise: null 
    }
}

async function connectToDatabase () {
    if(cachedConnection.conn){
        return cachedConnection.conn;
    }

    if(!databaseUrl){
        throw new Error("No database url provided");
    }

    cachedConnection.promise = cachedConnection.promise || mongoose.connect(databaseUrl,{dbName:"ImageGen",bufferCommands: false})
    cachedConnection.conn = await cachedConnection.promise;
    return cachedConnection.conn;
}

export default connectToDatabase;
