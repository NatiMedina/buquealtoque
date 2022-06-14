import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Formik, Form } from 'formik'
import InputTextFormik from '@/Components/InputTextFormik';
import * as Yup from 'yup'

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

    const regexDni = /^\d{7,8}?$/;
    const cardRegExp = /^[\d]{16}?$/;
    const cbuRegExp = /^[\d]{22}?$/;
    const pinRegExp = /^[\d]{3,4}?$/;
    const nameRegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+?$/;

    const validate = Yup.object({
        name: Yup.string().matches(nameRegExp, 'Debe ingresar sólo letras').min(3, 'Debe ser de al menos 3 caracteres').max(30, 'No debe superar los 30 caracteres').required('Obligatorio'),
        last_name: Yup.string().matches(nameRegExp, 'Debe ingresar sólo letras').min(3, 'Debe ser de al menos 3 caracteres').max(30, 'No debe superar los 30 caracteres').required('Obligatorio'),
        address: Yup.string().min(3, 'Debe ser de al menos 3 caracteres').max(50, 'No debe superar los 50 caracteres').required('Obligatorio'),
        dni: Yup.string().matches(regexDni, 'Ingrese un dni de entre 7 y 8 dígitos').required('Obligatorio'),
        //birthday: '',
        email: Yup.string().email('Ingrese un email válido').required('Obligatorio'),
        password: Yup.string().min(8, 'Debe ser de al menos 8 caracteres').max(50, 'No debe superar los 50 caracteres').required('Obligatorio'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], "Las contraseñas deben ser iguales").required('Obligatorio'),
        card_number: Yup.string().matches(cardRegExp, 'Debe ingresar 16 dígitos'),
        // card_expire_year: '2022',
        // card_expire_month: '06',
        card_pin: Yup.string().matches(pinRegExp, 'valor inválido'),
        cbu: Yup.string().matches(cbuRegExp, 'Debe ingresar 22 dígitos'),
        cvu: Yup.string().matches(cbuRegExp, 'Debe ingresar 22 dígitos'),

    })


    return (
        <Guest>
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <Formik
                initialValues={{
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
                }}

                validationSchema={validate}

                onSubmit={values => {

                    data.name = values.name;
                    data.last_name = values.last_name;
                    data.address = values.address;
                    data.dni = values.dni;
                    data.email = values.email;
                    data.password = values.password;
                    data.password_confirmation = values.password_confirmation;
                    data.card_number = values.card_number;
                    data.card_pin = values.card_pin;
                    data.cbu = values.cbu;
                    data.cvu = values.cvu;

                    post(route('register'));
                }}
            >


                <Form>

                    <InputTextFormik
                        divClassName="flex flex-col items-start"
                        label='Email'
                        name="email"
                        type='email'
                        className="mt-1 block w-full"
                        autoComplete="email"
                    />

                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        label='Nombre'
                        name="name"
                        className="mt-1 block w-full"
                        autoComplete="name"
                        maxLength="30"
                    />

                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        label='Apellido'
                        name="last_name"
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        maxLength="30"
                    />


                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        label='DNI'
                        name="dni"
                        className="mt-1 block w-full"
                        autoComplete="dni"
                        maxLength="8"
                    />


                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        label='Domicilio'
                        name="address"
                        className="mt-1 block w-full"
                        autoComplete="address"
                        maxLength="50"
                    />


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
                            max="2004-06-12"
                            required
                        />
                    </div>

                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        label='Nro tarjeta'
                        name="card_number"
                        className="mt-1 block w-full"
                        autoComplete="card_number"
                        maxLength="16"
                    />

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
                                    <option value="01">01 - Ene</option>
                                    <option value="02">02 - Feb</option>
                                    <option value="03">03 - Mar</option>
                                    <option value="04">04 - Abr</option>
                                    <option value="05">05 - May</option>
                                    <option value="06">06 - Jun</option>
                                    <option value="07">07 - Jul</option>
                                    <option value="08">08 - Ago</option>
                                    <option value="09">09 - Sep</option>
                                    <option value="10">10 - Oct</option>
                                    <option value="11">11 - Nov</option>
                                    <option value="12">12 - Dic</option>
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
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                </select>
                            </div>
                            <div className="px-2 w-1/3">
                                <InputTextFormik
                                    divClassName="mt-4 flex flex-col items-start"
                                    label='CVV'
                                    name="card_pin"
                                    className="mt-1 block w-full"
                                    maxLength="4"
                                />
                            </div>
                        </div>
                    </div>

                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        label='CBU'
                        name="cbu"
                        className="mt-1 block w-full"
                        autoComplete="cbu"
                        maxLength="22"
                    />

                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        label='CVU (Mercado pago)'
                        name="cvu"
                        className="mt-1 block w-full"
                        autoComplete="cvu"
                        maxLength="22"
                    />

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

                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        label='Contraseña'
                        type='password'
                        name="password"
                        className="mt-1 block w-full"
                        autoComplete="password"
                    />

                    <InputTextFormik
                        divClassName="mt-4 flex flex-col items-start"
                        type='password'
                        label='Confirme contraseña'
                        name="password_confirmation"
                        className="mt-1 block w-full"
                        autoComplete="cbu"
                    />

                    <div className="flex items-center justify-end mt-4">
                        <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                            Ya estás registrado?
                        </Link>

                        <Button className="ml-4" processing={processing} type="submit">
                            Registrarse
                        </Button>
                    </div>

                </Form>
            </Formik>

        </Guest>
    );
}
