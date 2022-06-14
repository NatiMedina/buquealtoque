import React, { useEffect, useRef } from 'react';
import { ErrorMessage, useField } from 'formik';
import Label from './Label';

export default function InputTextFormik({
    label,
    divClassName,
    className,
    type = 'text',
    handleChange,
    ...props
}) {

    const [field, meta] = useField(props)

    return (
        <div className={divClassName}>
            <Label forInput={field.name} value={label} className={(meta.touched && meta.error ? 'text-rose-500': '')} ></Label>
            
            <input
                type={type}
                className={
                    `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                    className +
                    (meta.touched && meta.error ? ' border-2 border-rose-500': '')
                }
                onChange={(e) => { handleChange(e)}}
                {...field}
                {...props}
            />
            <ErrorMessage component="div" name={field.name} className="font-medium text-sm text-rose-500" />
        </div>
    );
}
