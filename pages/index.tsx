
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
  const [newProduct, setNewProduct] = useState({
    product_id: '',
    product_name: '',
    effective_date: '',
    termination_date: '',
    benefits_summary: '',
    claim_system_config: ''
  });

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetch('/api/createTable')
      .then(fetchProducts)
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        setNewProduct({
          product_id: '',
          product_name: '',
          effective_date: '',
          termination_date: '',
          benefits_summary: '',
          claim_system_config: ''
        });
        fetchProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Insurance Products</title>
        <meta name="description" content="Insurance Products List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Insurance Products</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Product ID"
            value={newProduct.product_id}
            onChange={(e) => setNewProduct({...newProduct, product_id: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.product_name}
            onChange={(e) => setNewProduct({...newProduct, product_name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Effective Date"
            value={newProduct.effective_date}
            onChange={(e) => setNewProduct({...newProduct, effective_date: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Termination Date"
            value={newProduct.termination_date}
            onChange={(e) => setNewProduct({...newProduct, termination_date: e.target.value})}
            required
          />
          <textarea
            placeholder="Benefits Summary"
            value={newProduct.benefits_summary}
            onChange={(e) => setNewProduct({...newProduct, benefits_summary: e.target.value})}
            required
          />
          <textarea
            placeholder="Claim System Config"
            value={newProduct.claim_system_config}
            onChange={(e) => setNewProduct({...newProduct, claim_system_config: e.target.value})}
            required
          />
          <button type="submit">Add Product</button>
        </form>

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
