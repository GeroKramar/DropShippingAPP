"use client"
import Navegacion from "@/layouts/navegacion"
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import ProductsInfoTable from "./Components/ProductsInfoTable";
import { useSearchParams } from "next/navigation";
import Toolbar from "./Components/Toolbar";

export default function Home() {

  let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLmRyb3BpLmNvIiwiaWF0IjoxNzExNTEzNDUyLCJleHAiOjE3MTE1OTk4NTIsIm5iZiI6MTcxMTUxMzQ1MiwianRpIjoiamExU1RxQ1BjTkhlOHJaeSIsInN1YiI6ODIxOTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJhdWQiOiJEUk9QSSIsInRva2VuX3R5cGUiOiJEUk9QSSJ9.qcBtHcTgN2APhz63q_vkJWjtyx7gb1sbhWsD5NEDkfk"
  let dropiIdRef = useRef(null)
  const searchParams = useSearchParams()
  
  const [firstLoad, setFirstLoad] = useState(true);
  const [products, setProducts] = useState([{dropiId: "cargando",name: "cargando",stock: "cargando",price: "cargando", nuevoStock: "cargando"}]);
  const [productsById, setProductsById] = useState([])
  function dividirEnMatriz(arrayOriginal, longitudSubarrays) {
    let matriz = [];
    for (let i = 0; i < arrayOriginal.length; i += longitudSubarrays) {
      matriz.push(arrayOriginal.slice(i, i + longitudSubarrays));
    }
    return matriz;
  }


  const saveDayStockProducts = ()=>{
    localStorage.setItem("Products", JSON.stringify(products))
  }

  const loadProducts = async () => {
    axios.post("https://api.dropi.co/api/products/index",{
      "privated_product": false,
      "bod": null,
      "stockmayor": 200,
      "no_count": true,
      "pageSize": 1000,
      "startData": 0,
      "userVerified": true
  }, {headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}})
  .then(res => {
    console.log(res.data);
    let products = res.data.objects.map(product => {
      let newProduct = {dropiId: product.id, name: product.name, stock: product?.stock, price: product.sale_price}

      return newProduct
    });
    console.log(products);
 

    axios.post("http://localhost:8080/api/products", products)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

  });
  }

  const searchById = async (dropiId)=>{
   let res = await axios.post("https://api.dropi.co/api/products/index",{
      "privated_product": false,
      "bod": null,
      "no_count": true,
      "pageSize": 1000,
      "startData": 0,
      "userVerified": true,
      "keywords" : dropiId
  }, {headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}})
  .then(res => {
    return res.data.objects[0];
  })
  // console.log(res);
  // setProductsById([...productsById, res])
  return res
  }






  const reLoadProducts = async (productosArray, setProductsBoolean = true)=>{
    let productsAux = await Promise.all( productosArray.map( async product => {
     
       let prod = await searchById(product.dropiId).then(res => { return res})
 
       return prod
      

    }))

    productsAux = productsAux.filter(product => product != undefined)
    productsAux = productsAux.map(prodAux => {
     let productVerified = productosArray.find(prod => prod.dropiId == prodAux.id)
      if(prodAux?.stock < productVerified?.stock){
        return {dropiId: prodAux.id, stockViejo: productVerified?.stock, stockNuevo: prodAux?.stock}
      }

    })
    
    productsAux = productsAux.filter(product => product != undefined)
    

    console.log("Se econtraron "+productsAux.length +" cambios",);
    productsAux = productosArray.map(product => {
      let productExists = productsAux.find(prod => prod.dropiId == product.dropiId)
       if(productExists){
        product.nuevoStock = productExists.stockNuevo
        return product
       }else{
        return product
       }
    })

    const productsConCambios = productsAux.filter(product => product.nuevoStock && product.nuevoStock != "0.00")


    if(setProductsBoolean){
      setProducts(productsAux)
    }else{
      return productsConCambios
    }
  }

  async function iteracionConRetraso(i, max, retraso, matriz, newArrayProducts) {
    if (i < max) {
         const productsAux = await reLoadProducts(matriz[i], false)
      
        console.log(productsAux);
        



        if (productsAux.length > 0){
          newArrayProducts = newArrayProducts.sort((a, b) =>{
            if ( (parseInt(a.stock) - parseInt(a.nuevoStock)) > (parseInt(b.stock) - parseInt(b.nuevoStock)) ){
              return -1;
            }
            if ( (parseInt(a.stock) - parseInt(a.nuevoStock)) < (parseInt(b.stock) - parseInt(b.nuevoStock)) ){
              return 1;
            }
            return 0;
          })
          console.log(newArrayProducts)
          setProducts(newArrayProducts)
        }
        

      console.log('Iteración número: ' + i);
  
      // Llama a la función nuevamente con un retraso
      setTimeout(() => iteracionConRetraso(i + 1, max, retraso, matriz, [...newArrayProducts,...productsAux]), retraso);
    }
  }

  const filterWinningProducts = async (matriz) =>{
 
    iteracionConRetraso(0, matriz.length, 7000, matriz,[])


  }


  // const buscarOrdenes = () => {


  //   axios.get("https://api.dropi.co/api/orders/myorders?exportAs=orderByRow&orderBy=id&orderDirection=desc&result_number=1000&start=0&textToSearch=&status=null&supplier_id=false&user_id=82191&from=2023-03-21&until=2024-03-27&filter_product=undefined&haveIncidenceProcesamiento=false&tag_id=&warranty=false&seller=null&filter_date_by=null&invoiced=null", {
  //     headers:{
  //       "Authorization": "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLmRyb3BpLmNvIiwiaWF0IjoxNzExNDg0ODkyLCJleHAiOjE3MTE1NzEyOTIsIm5iZiI6MTcxMTQ4NDg5MiwianRpIjoiTVc1elNXbWJZMUhJN1M3cSIsInN1YiI6ODMyNzcsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJhdWQiOiJEUk9QSSIsInRva2VuX3R5cGUiOiJEUk9QSSJ9.kTE6nieBvbtTAJGwo_qD5MUzOkUfriBLy7S-RkJDMjo"
  //     }
  //   }).then(response => {
  //     console.log(response.data)

  //     const data =JSON.parse (localStorage.getItem('dataAgustinMoyano'))
  //     if(data == null) {
  //       console.log("No hay data");
  //       localStorage.setItem('dataAgustinMoyano', JSON.stringify(response.data.objects))
  //     }
  //   })
  // }


  const iniciar =  ()=>{


    axios.get("http://localhost:8080/api/products")
    .then(res => {
      let  matriz = dividirEnMatriz(res.data, 20)
      filterWinningProducts(matriz)
      // const pag = searchParams.get('page')
      // if(pag == null){
      //   setProducts(matriz[0])
      //   setMatrizPage(0) //
      // }
      //   else if(pag != 1){
      //     setProducts(matriz[pag-1])
      //     setMatrizPage(pag-1)
      //   }
      // else{
      //   setMatrizPage(page-1) //
      //   setProducts(matriz[page-1])
      // }
    })
  }


  const [page, setPage] = useState(1)



  useEffect(() => {
    // buscarOrdenes()

  },[])

  return (

    
  <>
  <Navegacion title={"Inicio"}>

  <Toolbar page={page} setPage={setPage}/>
  
    <label>
      Buscar por ID de dropi
      <input type="text" ref={dropiIdRef}></input>
    </label>
  <button onClick={()=> searchById(dropiIdRef.current.value)}>Buscar</button>


  <ProductsInfoTable products={products}/>
    <div className="btns-container">

    <button className="btn" onClick={()=> loadProducts()}>Cargar productos</button>
    <button className="btn" onClick={()=> saveDayStockProducts()}>Guardar productos en storage</button>
    <button className="btn" onClick={()=> localStorage.removeItem("Products")}>Borrar productos de storage</button>
    <button className="btn" onClick={()=> iniciar()}>Iniciar carga</button>

    </div>

  </Navegacion>
  </>
  )
}