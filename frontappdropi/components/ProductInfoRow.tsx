import React from "react";
import { Table } from "flowbite-react";

const ProductInfoRow = ({ id, dropiId, name, stock, price, nuevoStock }) => {
  const diferenciaStock = isNaN(nuevoStock) ? 0 : stock - nuevoStock;

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{dropiId}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {name}
      </Table.Cell>
      <Table.Cell>{stock}</Table.Cell>
      <Table.Cell>{nuevoStock}</Table.Cell>
      <Table.Cell>{diferenciaStock}</Table.Cell>
    </Table.Row>
  );
};

export default ProductInfoRow;