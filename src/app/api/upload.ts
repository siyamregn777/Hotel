import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body;

      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: 'destinations',
      });

      res.status(200).json({ success: true, url: uploadResponse.secure_url });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      res.status(500).json({ success: false, error: 'Upload failed' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
