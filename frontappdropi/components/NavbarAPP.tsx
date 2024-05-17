"use client"
import React, { useEffect, useState } from "react";
import {Navbar } from "flowbite-react";
import { BtnLogin } from "./BtnLogin";
import { usePathname, useRouter } from 'next/navigation';

function NavbarAPP() {
const pathname = usePathname()
const router = useRouter();
const [login, setLogin] = useState(true) 

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    
    if (typeof window !== "undefined") {
      if (userToken) {
       setLogin(false)
      }
    }
    
  }, [pathname]);

  const handlesesion = ()=>{
    setLogin(true)
    localStorage.setItem("token","")
    alert("se cerro la sesion")
    router.push("/")
  }

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Droppi APP
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {login ? ( <span className="mr-2"><BtnLogin/></span>) : (( <span className="mr-2 text-white">
            <button
            onClick={handlesesion}
            >Cerrar sesion</button></span>))}
         
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" >
            Home
          </Navbar.Link>
          {login ? ("") : <Navbar.Link href="/droppiapp">App</Navbar.Link> }
          <Navbar.Link href="/productos">Productos</Navbar.Link>
          <Navbar.Link href="/pedidos">Pedidos</Navbar.Link>
          <Navbar.Link href="/serch">Buscador de Productos</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavbarAPP;
