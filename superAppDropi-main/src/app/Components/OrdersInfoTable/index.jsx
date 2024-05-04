import React from 'react';


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
             
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}