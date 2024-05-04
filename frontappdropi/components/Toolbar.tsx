import { useRouter } from "next/navigation";
import React from "react";
import { TERipple } from "tw-elements-react";

export default function Toolbar({ page, setPage }) {
  const router = useRouter();
  return (
    <div
      className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      role="toolbar"
    >
      <TERipple rippleColor="light">
        <button
          onClick={() => {
            if (page <= 1) {
              router.push(`/?page=${1}`);
              setPage(1)

            } else {
                setPage(page - 1)
                router.push(`/?page=${page - 1 }`);
            }
          
          }}
          type="button"
          className="inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
        >
          ⬅️
        </button>
      </TERipple>
      <TERipple rippleColor="light">
        <button
          onClick={() => {
            router.push(`/?page=${page + 1}`)
            setPage(page + 1)
        }}
          type="button"
          className="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
        >
          {page + 1}
        </button>
      </TERipple>
      <TERipple rippleColor="light">
        <button
          onClick={() => {
            router.push(`/?page=${page + 2}`)
            setPage(page + 2)
        }}
          type="button"
          className="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
        >
          {page + 2}
        </button>
      </TERipple>
      <TERipple rippleColor="light">
        <button
          onClick={() => {
            router.push(`/?page=${page + 3}`)
            setPage(page + 3)
        }}
          type="button"
          className="inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
        >
          {page + 3}
        </button>
      </TERipple>
      <TERipple rippleColor="light">
        <button
             onClick={() => {

                if(page >= 1000){
                    router.push(`/?page=${1000}`)
                    setPage(1000)
                }else{
                    setPage(page+1)
                    router.push(`/?page=${page + 1}`)

                }
                
            }}
          type="button"
          className="inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
        >
          ➡️
        </button>
      </TERipple>
    </div>
  );
}
