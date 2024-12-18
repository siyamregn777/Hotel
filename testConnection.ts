import { MongoClient } from 'mongodb';

const uri = 'mongodb://admin:Siyamr42553335$@cluster0-shard-00-00.mongodb.net:27017,cluster0-shard-00-01.mongodb.net:27017,cluster0-shard-00-02.mongodb.net:27017/myDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to MongoDB Atlas');
    
    const database = client.db('myDatabase'); // Adjust as needed
    const collection = database.collection('users'); // Adjust as needed

    // Optionally, try to find a document
    const user = await collection.findOne();
    console.log('Example user document:', user);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

testConnection();