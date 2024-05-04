import React from 'react';
import ProductInfoRow from './ProductInfoRow';

export default function ProductsInfoTable({products}) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead
                className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr >
                <th scope="col" className=" px-6 py-4">Id</th>
                  <th scope="col" className=" px-6 py-4">DropiId</th>
                  <th scope="col" className=" px-6 py-4">Nombre</th>
                  <th scope="col" className=" px-6 py-4">Stock</th>
                  <th scope="col" className=" px-6 py-4">Nuevo Stock</th>
                  <th scope="col" className=" px-6 py-4">Diferencia de Stock</th>
                  <th scope="col" className=" px-6 py-4">Precio</th>

                </tr>
              </thead>
              <tbody >
             
                {products?.map(product => <ProductInfoRow key={product.dropiId} id={product.id} dropiId={product.dropiId} name={product.name} stock={product?.stock} price={product.price} nuevoStock={product.nuevoStock ? product.nuevoStock : "No hay"} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Table } from "flowbite-react";

export function Component() {
  return (
    <div className="overflow-x-auto">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Id</Table.HeadCell>
          <Table.HeadCell>DropiId</Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Stock</Table.HeadCell>
          <Table.HeadCell>Nuevo Stock</Table.HeadCell>
          <Table.HeadCell>Diferencia de Stock</Table.HeadCell>
          <Table.HeadCell>Precio</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">

        </Table.Body>
      </Table>
    </div>
  );
}