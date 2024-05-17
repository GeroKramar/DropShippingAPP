"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProductsInfoTable from "@/components/ProductsInfoTable";
import Toolbar from "@/components/Toolbar";
import { Button } from "flowbite-react";

export default function Page() {
  const [tokendata, setTokendata] = useState<string>();
  const dropiIdRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        setTokendata(userToken);
      }
    }
  }, []);

  const [firstLoad, setFirstLoad] = useState(true);
  const [products, setProducts] = useState([
    {
      dropiId: "cargando",
      name: "cargando",
      stock: "cargando",
      price: "cargando",
      nuevoStock: "cargando",
    },
  ]);
  const [productsById, setProductsById] = useState([]);

  function dividirEnMatriz(arrayOriginal, longitudSubarrays) {
    let matriz = [];
    for (let i = 0; i < arrayOriginal.length; i += longitudSubarrays) {
      matriz.push(arrayOriginal.slice(i, i + longitudSubarrays));
    }
    return matriz;
  }

  const saveDayStockProducts = () => {
    localStorage.setItem("Products", JSON.stringify(products));
  };

  const loadProducts = async () => {
    try {
      const res = await axios.post(
        "https://api.dropi.co/api/products/index",
        {
          privated_product: false,
          bod: null,
          stockmayor: 200,
          no_count: true,
          pageSize: 1000,
          startData: 0,
          userVerified: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokendata}`,
          },
        }
      );
      const products = res.data.objects.map((product) => ({
        dropiId: product.id,
        name: product.name,
        stock: product.stock,
        price: product.sale_price,
      }));

      await axios.post("http://localhost:8080/api/products", products);
    } catch (error) {
      console.error(error);
    }
  };

  const searchById = async (dropiId) => {
    try {
      const res = await axios.post(
        "https://api.dropi.co/api/products/index",
        {
          privated_product: false,
          bod: null,
          no_count: true,
          pageSize: 1000,
          startData: 0,
          userVerified: true,
          keywords: dropiId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokendata}`,
          },
        }
      );
      return res.data.objects[0];
    } catch (error) {
      console.error(error);
    }
  };

  const reLoadProducts = async (productosArray, setProductsBoolean = true) => {
    let productsAux = await Promise.all(
      productosArray.map(async (product) => {
        let prod = await searchById(product.dropiId);
        return prod;
      })
    );

    productsAux = productsAux.filter((product) => product != undefined);
    productsAux = productsAux.map((prodAux) => {
      let productVerified = productosArray.find(
        (prod) => prod.dropiId === prodAux.id
      );
      if (prodAux?.stock < productVerified?.stock) {
        return {
          dropiId: prodAux.id,
          stockViejo: productVerified?.stock,
          stockNuevo: prodAux?.stock,
        };
      }
    });

    productsAux = productsAux.filter((product) => product != undefined);

    productsAux = productosArray.map((product) => {
      let productExists = productsAux.find(
        (prod) => prod.dropiId === product.dropiId
      );
      if (productExists) {
        product.nuevoStock = productExists.stockNuevo;
        return product;
      } else {
        return product;
      }
    });

    const productsConCambios = productsAux.filter(
      (product) => product.nuevoStock && product.nuevoStock !== "0.00"
    );

    if (setProductsBoolean) {
      setProducts(productsAux);
    } else {
      return productsConCambios;
    }
  };

  async function iteracionConRetraso(
    i,
    max,
    retraso,
    matriz,
    newArrayProducts
  ) {
    if (i < max) {
      const productsAux = await reLoadProducts(matriz[i], false);

      if (productsAux.length > 0) {
        newArrayProducts = newArrayProducts.sort((a, b) => {
          if (
            parseInt(a.stock) - parseInt(a.nuevoStock) >
            parseInt(b.stock) - parseInt(b.nuevoStock)
          ) {
            return -1;
          }
          if (
            parseInt(a.stock) - parseInt(a.nuevoStock) <
            parseInt(b.stock) - parseInt(b.nuevoStock)
          ) {
            return 1;
          }
          return 0;
        });
        setProducts(newArrayProducts);
      }

      setTimeout(
        () =>
          iteracionConRetraso(
            i + 1,
            max,
            retraso,
            matriz,
            [...newArrayProducts, ...productsAux]
          ),
        retraso
      );
    }
  }

  const filterWinningProducts = async (matriz) => {
    iteracionConRetraso(0, matriz.length, 7000, matriz, []);
  };

  const iniciar = () => {
    axios.get("http://localhost:8080/api/products").then((res) => {
      let matriz = dividirEnMatriz(res.data, 20);
      filterWinningProducts(matriz);
    });
  };

  const [page, setPage] = useState(1);

  const handleSearchById = async () => {
    const dropiId = dropiIdRef.current.value;
    if (dropiId) {
      const product = await searchById(dropiId);
      setProductsById([product]);
    }
  };

  return (
    <>
      <div className="mt-4 flex justify-evenly">
        <div className="flex items-center gap-2 text-center">
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
        <Button onClick={saveDayStockProducts} color="dark">
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

