'use client';
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { LoginComponentInterface, LoginInputInterface } from "./interface";

const DEFAULT_VALUE: LoginInputInterface = {
    email: "",
    password: ''
}

export const Login: FC<LoginComponentInterface> = () => {

    const [input, setInput] = useState<LoginInputInterface>(DEFAULT_VALUE);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

    };

    return  <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Team Football</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Adresse email</label>
                            <input name="email" value={input.email} onChange={handleChange} type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mot de passe</label>
                            <input name="password" value={input.password} onChange={handleChange} type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Entrer votre mot de passe" required />
                        </div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Se connecter</button>
                    </form>
                </div>
            </div>

}