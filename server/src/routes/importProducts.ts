import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import Product from '../models/Product';
import { authMiddleware } from '../middleware/auth';
import { requireAuth } from '../middleware/requireAuth';
import { requireAdmin } from '../middleware/requireAdmin';

const router = Router();

const upload = multer({ dest: 'tmp/'});

router.post(
  '/csv',
  authMiddleware,
  requireAuth,
  requireAdmin,
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No CSV file uploaded' });
    }

    const filePath = path.join(req.file.path);
    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          title: data.title,
          description: data.description,
          category: data.category,
          ingredients: data.ingredients?.split(';') || [],
          price: Number(data.price),
          imageUrl: data.imageUrl,
          holidayType: data.holidayType?.split(';') || [],
          region: data.region,
          tags: data.tags?.split(';') || [],
        });
      })
      .on('end', async () => {
        try {
          await Product.insertMany(results);
          fs.unlinkSync(filePath); // видаляємо тимчасовий файл
          res.json({ message: 'Products imported!', count: results.length });
        } catch (error) {
          res.status(500).json({ message: 'Import error', error });
        }
      });
});

export default router;