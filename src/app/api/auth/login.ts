// import { NextApiRequest, NextApiResponse } from 'next';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import clientPromise from '../../../../lib/mongodb';
// const secretKey = 'yourSecretKey'; // Make sure to store this in environment variables
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//       const client = await clientPromise;
//       const db = client.db('Destination');
//       const usersCollection = db.collection('users');

//       const user = await usersCollection.findOne({ email });

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }

//       const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
//         expiresIn: '1h',
//       });

//       return res.status(200).json({ token });
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }
// }
