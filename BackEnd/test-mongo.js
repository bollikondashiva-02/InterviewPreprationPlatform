const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI, {
    family: 4,
    serverSelectionTimeoutMS: 15000
});

async function testConnection() {
    try {
        console.log("Connecting to MongoDB...");

        await client.connect();

        console.log("MongoDB Connected ✅");

        const result = await client.db("prepconnect").command({
            ping: 1
        });

        console.log("MongoDB Ping Successful ✅");
        console.log(result);

    } catch (error) {
        console.error("MongoDB Connection Failed ❌");
        console.error(error);
    } finally {
        await client.close();
    }
}

testConnection();