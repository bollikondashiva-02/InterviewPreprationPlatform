require("dotenv").config();

const { MongoClient } = require("mongodb");

async function testConnection() {
    const client = new MongoClient(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    });

    try {
        console.log("Connecting with native MongoDB driver...");

        await client.connect();

        console.log("MongoDB Connected ✅");

        await client.db("admin").command({ ping: 1 });

        console.log("MongoDB Ping Successful ✅");

    } catch (error) {

        console.log("MongoDB Connection Failed ❌");
        console.error(error);

    } finally {

        await client.close();

    }
}

testConnection();
