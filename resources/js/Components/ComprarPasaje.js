import React from 'react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';

import { useForm } from '@inertiajs/inertia-react';


export default function ComprarPasaje() {

    const { data, setData, post, processing, errors, reset } = useForm({
        origen: '',
        destino: '',
        fecha_partida: '',
        fecha_regreso: '',
        pasaje_adulto: 1,
        pasaje_menor: ''

    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandlerSelectChange = (event) => {

        if (event.target.name == 'card_expire_month' &&
            data.card_expire_year == date.getFullYear() &&
            parseInt(event.target.value) < (date.getMonth() + 1)
        ) {
            return;
        }

        setData(event.target.name, event.target.value)
    }

    const onHandleNumber = (event) => {
        // result = event.target.value.replace(/\D/g, '');
        // setData(event.target.name, result)
    };

    const submit = (e) => {
        e.preventDefault();
        //post(route('login'));
    };
    return (
        <div className=''>
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>
                <div className="">
                    <Label forInput="origen" value="Origen" />

                    <select
                        onChange={onHandlerSelectChange}
                        required
                        type="text"
                        name="origen"
                        value={data.origen}
                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full">
                        <option>Buenos Aires</option>
                        <option>Tigre</option>
                    </select>
                </div>

                <div className="mt-4">
                    <Label forInput="destino" value="Destino" />

                    <select
                        onChange={onHandlerSelectChange}
                        required
                        type="text"
                        name="destino"
                        value={data.destino}
                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full">
                        <option>Buenos Aires</option>
                        <option>Tigre</option>
                    </select>
                </div>

                <div className="mt-4">
                    <Label forInput="fecha_ida" value="Fecha de partida" />

                    <Input
                        type="date"
                        name="birthday"
                        value={data.fecha_partida}
                        className="mt-1 block w-full"
                        autoComplete="fecha_partida"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="fecha_regreso" value="Fecha de regreso" />

                    <Input
                        type="date"
                        name="birthday"
                        value={data.fecha_regreso}
                        className="mt-1 block w-full"
                        autoComplete="fecha_regreso"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="pasaje_adulto" value="Pasajeros adultos" />

                    <Input
                        type="number"
                        name="pasajero_adulto"
                        value={data.pasaje_adulto}
                        className="mt-1 block w-full"
                        autoComplete="pasajero_adulto"
                        isFocused={true}
                        handleChange={onHandleNumber}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="pasaje_menor" value="Pasajeros menores" />

                    <Input
                        type="number"
                        name="pasajero_menor"
                        value={data.pasaje_menor}
                        className="mt-1 block w-full"
                        autoComplete="pasajero_menor"
                        isFocused={true}
                        handleChange={onHandleNumber}
                    />
                </div>
                <div className=' flex items-center justify-end mt-4'>
                    <Button processing={processing}>
                        Buscar
                    </Button></div>
            </form>
        </div>

    );
}

