import { useEffect, useState } from "react";
import "../app/globals.css"
import Navegacion from "@/layouts/Navegacion"
import axios from "axios";
import OrdersInfoTable from "@/app/Components/OrdersInfoTable";


function Pedidos(){
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLmRyb3BpLmNvIiwiaWF0IjoxNzExNTEzNDUyLCJleHAiOjE3MTE1OTk4NTIsIm5iZiI6MTcxMTUxMzQ1MiwianRpIjoiamExU1RxQ1BjTkhlOHJaeSIsInN1YiI6ODIxOTEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEiLCJhdWQiOiJEUk9QSSIsInRva2VuX3R5cGUiOiJEUk9QSSJ9.qcBtHcTgN2APhz63q_vkJWjtyx7gb1sbhWsD5NEDkfk"

    const [pedidos, setPedidos] = useState([])
    const [gananciaFinal, setGananciaFinal] = useState(0)

        
  const buscarOrdenes = () => {


    axios.get("https://api.dropi.co/api/orders/myorders?exportAs=orderByRow&orderBy=id&orderDirection=desc&result_number=1000&start=0&textToSearch=&status=null&supplier_id=false&user_id=82191&from=2024-03-27&until=2024-03-27&filter_product=undefined&haveIncidenceProcesamiento=false&tag_id=&warranty=false&seller=null&filter_date_by=null&invoiced=null", {
      headers:{
        "Authorization": "Bearer " + token
      }
    }).then(response => {
      const ganancias = response.data.objects.map(order => order.dropshipper_amount_to_win)
      const gananciaTotal = ganancias.reduce((state ,ganancia) => state + parseFloat(ganancia) , 0) * 0.70

      console.log(gananciaTotal)
      setPedidos(response.data.objects)
      setGananciaFinal(gananciaTotal)
    })
  }

  

    useEffect(()=>{
        buscarOrdenes()
    },[])


  return(
        
      <Navegacion title={"Pedidos"}>
      

        <p>Ganancia Bruta del dia: U$D {(gananciaFinal / 4000 - 30).toFixed(2) }</p>
      </Navegacion>
    );
  }


export default Pedidos;
