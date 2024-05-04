"use client"
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import ProductsInfoTable from '@/components/ProductsInfoTable';
import Toolbar from '@/components/Toolbar';
import { Button, Label } from "flowbite-react";

const API_ENDPOINT = 'https://api.dropi.co/api/products/index';
const LOCAL_ENDPOINT = 'http://localhost:8080/api/products';
const token = 'your_token_here'; 

export default function Page() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const dropiIdRef = useRef(null);

  // Helper function to chunk an array into smaller arrays of specified length
  const chunkArray = (array, chunkSize) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, i) =>
      array.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  };

  // Function to load products from API and send them to a local server
  const loadProducts = async () => {
    try {
      const response = await axios.post(API_ENDPOINT, {
        privated_product: false,
        stockmayor: 200,
        no_count: true,
        pageSize: 1000,
        userVerified: true
      }, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });

      const products = response.data.objects.map(({ id, name, stock, sale_price }) => ({
        dropiId: id,
        name,
        stock,
        price: sale_price
      }));

      await axios.post(LOCAL_ENDPOINT, products);
      setProducts(products);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  // Function to search for products by ID
  const searchById = async (dropiId) => {
    try {
      const { data } = await axios.post(API_ENDPOINT, {
        privated_product: false,
        no_count: true,
        pageSize: 1000,
        keywords: dropiId
      }, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      return data.objects[0];
    } catch (error) {
      console.error('Search failed:', error);
      return undefined;
    }
  };

  const handleSearchById = async () => {
    const product = await searchById(dropiIdRef.current.value);
    setProducts(product ? [product] : []);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(LOCAL_ENDPOINT);
      const productChunks = chunkArray(data, 20);
      setProducts(productChunks[0]);
    };
    fetchProducts();
  }, []);

  return (
    <>
    <div className='flex justify-evenly m-4'>
      <div className='flex'>
      <Label>
        Buscar por ID de dropi
        <input type="text" ref={dropiIdRef} />
      </Label>
      <Button onClick={handleSearchById}>Buscar</Button>
      </div>

      <Toolbar page={page} setPage={setPage} />
    </div>
      <ProductsInfoTable products={products} />
      <div className="flex justify-around mt-80 mb-6">
        <Button onClick={loadProducts} color="dark">Cargar productos</Button>
        <Button onClick={() => localStorage.setItem('Products', JSON.stringify(products))} color="dark">Guardar productos en storage</Button>
        <Button onClick={() => localStorage.removeItem('Products')} color="dark">Borrar productos de storage</Button>
        
      </div>
    </>
  );
}