import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import ComprarPasaje from '@/Components/ComprarPasaje';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100  sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            Dashboard.
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center pt-8 sm:justify-center sm:pt-0">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-700" />
                    </div>

                    <div className="mt-8 bg-white dark:bg-gray-300 overflow-hidden shadow sm:rounded-lg">
                            <div className="p-6">
                                <div className="mx-12">
                                    <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <ComprarPasaje />
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
