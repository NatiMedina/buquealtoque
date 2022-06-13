import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {

    const date = new Date();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        last_name: '',
        address: '',
        dni: '',
        birthday: '',
        email: '',
        password: '',
        password_confirmation: '',
        card_type: '',
        card_number: '',
        card_expire_year: '2022',
        card_expire_month: '06',
        card_pin: '',
        cbu: '',
        cvu: '',
        pais: 'Arg'
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const onHandleNumber = (event) => {
        const result = event.target.value.replace(/\D/g, '');
        setData(event.target.name, result)
    };

    const onHandlerSelectChange = (event) => {

        if (event.target.name == 'card_expire_month' &&
            data.card_expire_year == date.getFullYear() &&
            parseInt(event.target.value) < (date.getMonth() + 1)
        ) {
            return;
        }

        setData(event.target.name, event.target.value)

    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <Guest>
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="name" value="Nombre" />

                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="last_name" value="Apellido" />

                    <Input
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="address" value="Domicilio" />

                    <Input
                        type="text"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="address"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="dni" value="DNI" />

                    <Input
                        type="text"
                        name="dni"
                        value={data.dni}
                        className="mt-1 block w-full"
                        autoComplete="dni"
                        isFocused={true}
                        handleChange={onHandleNumber}
                        required
                        maxlength="8"
                        min="7"
                    />
                </div>

                <div className="mt-4 block font-medium text-sm text-gray-700">
                    <Label forInput="birthday" value="Fecha de nacimiento" />

                    <Input
                        type="date"
                        name="birthday"
                        value={data.birthday}
                        className="mt-1 block w-full"
                        autoComplete="birthday"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="card_number" value="Nro de tarjeta" />

                    <Input
                        type="text"
                        name="card_number"
                        value={data.card_number}
                        className="mt-1 block w-full"
                        autoComplete="card_number"
                        isFocused={true}
                        handleChange={onHandleNumber}
                    />
                </div>

                <div className="mt-4">
                    {/* <Label forInput="card_details" value="Fecha de vencimiento" /> */}
                    <div className="mb-3 -mx-2 flex items-end">
                        <div className="px-2 w-1/3 block font-medium text-sm text-gray-700">
                            <Label forInput="card_details" value="Vencimiento" />
                            <select
                                onChange={onHandlerSelectChange}
                                name="card_expire_month"
                                value={data.card_expire_month}
                                className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full ">
                                <option  value="01">01 - Ene</option>
                                <option  value="02">02 - Feb</option>
                                <option  value="03">03 - Mar</option>
                                <option  value="04">04 - Abr</option>
                                <option  value="05">05 - May</option>
                                <option  value="06">06 - Jun</option>
                                <option  value="07">07 - Jul</option>
                                <option  value="08">08 - Ago</option>
                                <option  value="09">09 - Sep</option>
                                <option  value="10">10 - Oct</option>
                                <option  value="11">11 - Nov</option>
                                <option  value="12">12 - Dic</option>
                            </select>
                        </div>
                        <div className="px-2 w-1/3 block font-medium text-sm text-gray-700">
                            {/* <Label forInput="card_details" value="Año" /> */}
                            <select
                                onChange={onHandlerSelectChange}
                                name="card_expire_year"
                                value={data.card_expire_year}
                                className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                            >
                                <option  value="2022">2022</option>
                                <option  value="2023">2023</option>
                                <option  value="2024">2024</option>
                                <option  value="2025">2025</option>
                                <option  value="2026">2026</option>
                                <option  value="2027">2027</option>
                                <option  value="2028">2028</option>
                                <option  value="2029">2029</option>
                                <option  value="2030">2030</option>
                                <option  value="2031">2031</option>
                            </select>
                        </div>
                        <div className="px-2 w-1/3">
                            <Label forInput="card_pin" value="CVV" />

                            <Input
                                type="text"
                                name="card_pin"
                                value={data.card_pin}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                handleChange={onHandleNumber}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <Label forInput="cbu" value="CBU" />

                    <Input
                        type="text"
                        name="cbu"
                        value={data.cbu}
                        className="mt-1 block w-full"
                        autoComplete="cbu"
                        isFocused={true}
                        handleChange={onHandleNumber}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="cvu" value="CVU (Mercado Pago)" />

                    <Input
                        type="text"
                        name="cvu"
                        value={data.cvu}
                        className="mt-1 block w-full"
                        autoComplete="cvu"
                        isFocused={true}
                        handleChange={onHandleNumber}
                    />
                </div>

                <div className="mt-4 block font-medium text-sm text-gray-700">
                    <Label forInput="pais" value="País de operación" />
                    <select
                        onChange={onHandlerSelectChange}
                        name="pais"
                        value={data.pais}
                        className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    >
                        <option value="Arg">Argentina</option>
                        <option value="Uru">Uruguay</option>
                    </select>
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password_confirmation" value="Confirm Password" />

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Ya estás registrado?
                    </Link>

                    <Button className="ml-4" processing={processing}>
                        Registrarse
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
