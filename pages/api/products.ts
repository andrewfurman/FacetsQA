
import { Pool } from 'pg';
import type { NextApiRequest, NextApiResponse } from 'next';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await pool.query('SELECT * FROM insurance_products');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
