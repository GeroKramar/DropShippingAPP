"use client"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProductsInfoTable from "@/components/ProductsInfoTable";
import Toolbar from "@/components/Toolbar";
import { Button, Label } from "flowbite-react";

const API_ENDPOINT = "https://api.dropi.co/api/products/index";
const LOCAL_ENDPOINT = "http://localhost:8080/api/products";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const dropiIdRef = useRef(null);
  const [token, setToken] = useState<string>()

  // Helper function to chunk an array into smaller arrays of specified length
  const chunkArray = (array, chunkSize) => {
    return Array.from({ length: Math.ceil(array.length / chunkSize) }, (v, i) =>
      array.slice(i * chunkSize, i * chunkSize + chunkSize),
    );
  };

  // Function to load products from API and send them to a local server
  const loadProducts = async () => {
    try {
      const response = await axios.post(
        API_ENDPOINT,
        {
          privated_product: false,
          stockmayor: 200,
          no_count: true,
          pageSize: 1000,
          userVerified: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAuZHJvcGkuY286ODAiLCJpYXQiOjE3MTU5MTE2MTAsImV4cCI6MTcxNTk5ODAxMCwibmJmIjoxNzE1OTExNjEwLCJqdGkiOiI1VUlzQWxKVFY5cWFhd2hlIiwic3ViIjoxMDUzMTgsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJhdWQiOiJEUk9QSSIsInRva2VuX3R5cGUiOiJEUk9QSSJ9.T0mcAvB0xz--TveOE4XR1q-FV01CFdBqAx5xsst95b4"}`,
          },
        },
      );

      const products = response.data.objects.map(
        ({ id, name, stock, sale_price }) => ({
          dropiId: id,
          name,
          stock,
          price: sale_price,
        }),
      );

      await axios.post(LOCAL_ENDPOINT, products);
      setProducts(products);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  // Function to search for products by ID
  const searchById = async (dropiId) => {
    try {
      const { data } = await axios.post(
        API_ENDPOINT,
        {
          privated_product: false,
          no_count: true,
          pageSize: 1000,
          keywords: dropiId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data.objects[0];
    } catch (error) {
      console.error("Search failed:", error);
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
      <div className="mt-4 flex justify-evenly">
        <div className="flex items-center  gap-2 text-center">
          <input
            type="text"
            placeholder="Buscar por ID de dropi"
            ref={dropiIdRef}
          />
          <Button onClick={handleSearchById}>Buscar</Button>
        </div>

        <Toolbar page={page} setPage={setPage} />
      </div>

      <ProductsInfoTable products={products} />
      <div className="mb-6 mt-80 flex justify-around">
        <Button onClick={loadProducts} color="dark">
          Cargar productos
        </Button>
        <Button
          onClick={() =>
            localStorage.setItem("Products", JSON.stringify(products))
          }
          color="dark"
        >
          Guardar productos en storage
        </Button>
        <Button
          onClick={() => localStorage.removeItem("Products")}
          color="dark"
        >
          Borrar productos de storage
        </Button>
      </div>
    </>
  );
}
