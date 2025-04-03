
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

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
    <div className="min-h-screen p-8">
      <Head>
        <title>Insurance Products</title>
        <meta name="description" content="Insurance Products List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Insurance Products</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product ID"
              value={newProduct.product_id}
              onChange={(e) => setNewProduct({...newProduct, product_id: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.product_name}
              onChange={(e) => setNewProduct({...newProduct, product_name: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={newProduct.effective_date}
              onChange={(e) => setNewProduct({...newProduct, effective_date: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={newProduct.termination_date}
              onChange={(e) => setNewProduct({...newProduct, termination_date: e.target.value})}
              className="p-2 border rounded"
            />
            <textarea
              placeholder="Benefits Summary"
              value={newProduct.benefits_summary}
              onChange={(e) => setNewProduct({...newProduct, benefits_summary: e.target.value})}
              className="p-2 border rounded col-span-2"
            />
            <textarea
              placeholder="Claim System Config"
              value={newProduct.claim_system_config}
              onChange={(e) => setNewProduct({...newProduct, claim_system_config: e.target.value})}
              className="p-2 border rounded col-span-2"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add Product
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Effective Date</th>
                <th className="border p-2">Termination Date</th>
                <th className="border p-2">Benefits</th>
                <th className="border p-2">Config</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id} className="hover:bg-gray-50">
                  <td className="border p-2">{product.product_id}</td>
                  <td className="border p-2">{product.product_name}</td>
                  <td className="border p-2">{product.effective_date}</td>
                  <td className="border p-2">{product.termination_date}</td>
                  <td className="border p-2">{product.benefits_summary}</td>
                  <td className="border p-2">{product.claim_system_config}</td>
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
