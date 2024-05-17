"use client";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export function BtnLogin() {
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleSubmit = ()=>{
    localStorage.setItem("token",token);
    router.push('/droppiapp')
    setOpenModal(false);
    alert("Token cargado")
    
  
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Comenzar</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Comenzar a usar la APP</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Token" />
              </div>
              <TextInput
                id="token"
                placeholder="Tu token de Droppi"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                required
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Recordarme</Label>
              </div>
              <a href="/#faq" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Donde encuentro mi token?
              </a>
            </div>
            <div className="w-full">
              <Button
              onClick={handleSubmit}

              >Comenzar</Button>
            </div>
           
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}