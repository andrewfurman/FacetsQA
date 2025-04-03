
import { Pool } from 'pg';
import type { NextApiRequest, NextApiResponse } from 'next';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { product_id, product_name, effective_date, termination_date, benefits_summary, claim_system_config } = req.body;
    
    const result = await pool.query(
      `INSERT INTO insurance_products 
       (product_id, product_name, effective_date, termination_date, benefits_summary, claim_system_config)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [product_id, product_name, effective_date, termination_date, benefits_summary, claim_system_config]
    );
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
}
