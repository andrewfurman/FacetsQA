
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

interface InsuranceProduct {
  product_id: string;
  product_name: string;
  effective_date: string;
  termination_date: string;
  benefits_summary: string;
  claim_system_config: string;
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<InsuranceProduct[]>([]);

  useEffect(() => {
    fetch('/api/createTable')
      .then(() => fetch('/api/products'))
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Insurance Products</title>
        <meta name="description" content="Insurance Products List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Insurance Products</h1>

        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Effective Date</th>
                <th>Termination Date</th>
                <th>Benefits Summary</th>
                <th>Claim System Config</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.effective_date}</td>
                  <td>{product.termination_date}</td>
                  <td>{product.benefits_summary}</td>
                  <td>{product.claim_system_config}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Home;
