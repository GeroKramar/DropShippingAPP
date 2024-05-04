"use client";
import React from "react";
import {Navbar } from "flowbite-react";
import { BtnLogin } from "./BtnLogin";

function NavbarAPP() {
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Droppi APP
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          
          <span className="mr-2"><BtnLogin/></span>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" >
            Home
          </Navbar.Link>
          <Navbar.Link href="/droppiapp">App</Navbar.Link>
          <Navbar.Link href="/productos">Productos</Navbar.Link>
          <Navbar.Link href="/pedidos">Pedidos</Navbar.Link>
          <Navbar.Link href="/serch">Buscador de Productos</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavbarAPP;
