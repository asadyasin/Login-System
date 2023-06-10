import mongoose, { get } from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){
    const mongod = await MongoMemoryServer.create();
    // const getUri ='mongodb://127.0.0.1:27017/system';

    mongoose.set('strictQuery', true);
    const db= await mongoose.connect(mongod);
    console.log(`Databse connected at ${mongod}`);

    return db;
}

export default connect;