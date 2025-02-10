import mongoose from 'mongoose';

const db1Connection = mongoose.createConnection(
  'mongodb+srv://siyamregn:root@cluster0.pfw35.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);

export default db1Connection;
