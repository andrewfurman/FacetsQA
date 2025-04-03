
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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS insurance_products (
        product_id TEXT PRIMARY KEY,
        product_name TEXT,
        effective_date TEXT,
        termination_date TEXT,
        benefits_summary TEXT,
        claim_system_config TEXT
      )
    `);
    res.status(200).json({ message: 'Table created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create table' });
  }
}
