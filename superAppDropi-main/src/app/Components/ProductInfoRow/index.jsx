import React from 'react';

const ProductInfoRow = ({id, dropiId, name, stock, price, nuevoStock}) => {
    return (
     
               <tr key={id} className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4 font-bold">{id}</td>
                  <td className="whitespace-nowrap  px-6 py-4 font-bold">{dropiId}</td>
                  <td className="whitespace-nowrap  px-6 py-4 font-bold">{name}</td>
                  <td className="whitespace-nowrap  px-6 py-4 font-bold">{stock}</td>
                  <td className={nuevoStock != "No hay" ? " whitespace-nowrap  px-6 py-4 font-bold text-green-500" : " whitespace-nowrap  px-6 py-4 font-bold "}>{nuevoStock}</td>
                  <td className={isNaN(stock - nuevoStock) ? " whitespace-nowrap  px-6 py-4 font-bold " : "text-green-500 whitespace-nowrap  px-6 py-4 font-bold "}>{isNaN(stock - nuevoStock) ? 0 : stock - nuevoStock }</td>

                  <td className="whitespace-nowrap  px-6 py-4 font-bold">{price}</td>

                </tr>
        
    );
}

export default ProductInfoRow;
