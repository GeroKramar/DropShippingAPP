import React from 'react';
import ProductInfoRow from './ProductInfoRow';
import { Table } from 'flowbite-react';

export default function ProductsInfoTable({ products = [] }) { // Valor inicial predeterminado
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <Table className="min-w-full text-center text-sm font-light">
              <Table.Head className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <Table.HeadCell>Id</Table.HeadCell>
                <Table.HeadCell>DropiId</Table.HeadCell>
                <Table.HeadCell>Nombre</Table.HeadCell>
                <Table.HeadCell>Stock</Table.HeadCell>
                <Table.HeadCell>Nuevo Stock</Table.HeadCell>
                <Table.HeadCell>Diferencia de Stock</Table.HeadCell>
                <Table.HeadCell>Precio</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {products.map((product) => (
                  <ProductInfoRow
                    key={product.dropiId}
                    id={product.id}
                    dropiId={product.dropiId}
                    name={product.name}
                    stock={product.stock}
                    nuevoStock={product.nuevoStock || "No hay"}
                    price={product.price}
                  />
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}