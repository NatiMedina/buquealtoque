import React from 'react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Link, useForm } from '@inertiajs/inertia-react';
import { result } from 'lodash';
import { setToLocalStorage, getFromLocalStorage } from '../utils/store';

export default function ComprarPasaje(props) {

    const date = new Date();
    const today = date.toISOString().split('T')[0];


    const { data, setData, post, processing, errors, reset } = useForm(getFromLocalStorage());

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        const dataStorage = getFromLocalStorage();
        dataStorage[event.target.name] = event.target.value
        setToLocalStorage(dataStorage);
    };

    const onHandlerSelectChange = async (event) => {

        // if (event.target.name == 'card_expire_month' &&
        //     data.card_expire_year == date.getFullYear() &&
        //     parseInt(event.target.value) < (date.getMonth() + 1)
        // ) {
        //     return;
        // }
        
        setData(event.target.name, event.target.value)
        const dataStorage = getFromLocalStorage();
        dataStorage[event.target.name] = event.target.value
        setToLocalStorage(dataStorage);
    }

    const onHandleNumber = (event) => {
        result = event.target.value.replace(/\D/g, '');

        if (parseInt(result) <= parseInt(event.target.min)) {
            result = parseInt(event.target.min)
        }

        if (parseInt(result) > parseInt(event.target.max)) {
            result = parseInt(event.target.max)
        }

        if (!!result){
            setData(event.target.name, result)
            const dataStorage = getFromLocalStorage();
            dataStorage[event.target.name] = event.target.value
            setToLocalStorage(dataStorage);
        }
            
    };

    const submit = async (e) => {
        e.preventDefault();

        //post(route('login'));
    };
    return (
        <div className=''>
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>
                <div className="">
                    <Label forInput="origen" value="Elige el origen" />
                    <select
                        onChange={onHandlerSelectChange}
                        required
                        type="text"
                        name="origen"
                        value={data.origen}
                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full block font-medium text-sm text-gray-700">
                        <option value="Buenos Aires">Buenos Aires</option>
                        <option value="Tigre">Tigre</option>
                    </select>
                </div>

                <div className="mt-4">
                    <Label forInput="destino" value="Elige el destino" />

                    <select
                        onChange={onHandlerSelectChange}
                        required
                        type="text"
                        name="destino"
                        value={data.destino}
                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full block font-medium text-sm text-gray-700">
                        <option value="Colonia">Colonia</option>
                        <option value="Piriápolis" >Piriápolis</option>
                        <option value="Punta del Este" >Punta del Este</option>
                    </select>
                </div>

                <div className="mt-4">
                    <Label forInput="fecha_partida" value="Fecha de partida" />

                    <Input
                        type="date"
                        name="fecha_partida"
                        value={data.fecha_partida}
                        placeholder="dd-mm-yyyy"
                        className="mt-1 block w-full block font-medium text-sm text-gray-700"
                        autoComplete="fecha_partida"
                        isFocused={true}
                        handleChange={onHandleChange}
                        min={today}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="fecha_regreso" value="Fecha de regreso" />

                    <Input
                        type="date"
                        name="fecha_regreso"
                        value={data.fecha_regreso}
                        className="mt-1 block w-full block font-medium text-sm text-gray-700"
                        autoComplete="fecha_regreso"
                        isFocused={true}
                        handleChange={onHandleChange}
                        min={today}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="pasaje_adulto" value="Pasajeros adultos" />

                    <Input
                        type="number"
                        name="pasaje_adulto"
                        className="mt-1 block w-full block font-medium text-sm text-gray-700"
                        value={data.pasaje_adulto}
                        max="150"
                        min="1"
                        isFocused={true}
                        handleChange={onHandleNumber}
                    //handleBlur={onHandleBlurNumber}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="pasaje_menor" value="Pasajeros menores" />

                    <Input
                        type="number"
                        name="pasaje_menor"
                        className="mt-1 block w-full block font-medium text-sm text-gray-700"
                        value={data.pasaje_menor}
                        max="150"
                        min="0"
                        isFocused={true}
                        handleChange={onHandleNumber}
                    //handleBlur={onHandleBlurNumber}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="vehiculo" value="Vehículo en bodega" />

                    <Input
                        type="number"
                        name="vehiculo"
                        className="mt-1 block w-full block font-medium text-sm text-gray-700"
                        value={data.vehiculo}
                        max="150"
                        min="0"
                        isFocused={true}
                        handleChange={onHandleNumber}
                    // handleBlur={onHandleBlurNumber}
                    />
                </div>
                <div className=' flex items-center justify-end mt-4'>



                    {(!props.user) ?
                        <Link href={route('login')} as="button" type="button" className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'> Buscar </Link>
                        :
                        <Link href={route('buscar')} as="button" type="button" className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'> Buscar </Link>

                        // <Button processing={processing}>
                        //     Buscar
                        // </Button>
                    }


                </div>
            </form>
        </div>

    );
}

