import React, { useState } from 'react';
import Button from '@/Components/Button';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import { getFromLocalStorage } from '../../utils/store';
import SweetAlert2 from 'react-sweetalert2';

export default function Buscar(props, { status }) {

    const viajes = [getFromLocalStorage(), getFromLocalStorage()];
    const [swalProps, setSwalProps] = useState({});

    function handleClick(){
        setSwalProps({
            show: true,
            title: '',
            text: 'Reserva realizada con éxito',
            icon: 'success'
        }); 
    }

    return (
        <Authenticated auth={props.auth}>
            <Head title="Buscar pasajes" />

            <div className="mb-4 text-sm text-gray-500 leading-normal">

            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                                {viajes.map((elemento, index) =>

                                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                        <img className="w-full" src="https://media.istockphoto.com/photos/blurred-blue-sky-and-sea-with-bokeh-light-picture-id1253837586?k=20&m=1253837586&s=612x612&w=0&h=eVKpw2YJw2XYJpOB2njVAtGmxQvHiuA_FGjvAtWtO0E=" alt="Mountain" />
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">{elemento.origen + " - " + elemento.destino}</div>
                                            <p className="text-gray-700 text-base"> Salida: {elemento.fecha_partida} {(index + 1) * 3}:00 hs</p>

                                            <p className="text-gray-700 text-base"> Adultos:  {elemento.pasaje_adulto} </p>
                                            <p className="text-gray-700 text-base"> Menores:   {elemento.pasaje_menor}</p>
                                            <p className="text-gray-700 text-base"> Vehículo:  {elemento.vehiculo} </p>
                                            <div className="font-bold text-lg mb-2"> Total: $ {elemento.pasaje_adulto * 10000 + elemento.vehiculo * 20000 + elemento.pasaje_menor * 5000}</div>

                                        </div>
                                        <div className="px-6 pt-4 pb-2 flex items-center justify-end mt-4">
                                            <Button handlerOnClick={handleClick}>Reservar</Button>
                                            <SweetAlert2 {...swalProps} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>


        </Authenticated>
    );
}