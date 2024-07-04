'use client';
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { AddTeamsComponentInterface, AddTeamsInputInterface } from "./interface";

const DEFAULT_VALUE: AddTeamsInputInterface = {
    name: '',
    country: '',
    balance: 0,
    image: undefined
}

export const AddTeams: FC<AddTeamsComponentInterface> = () => {

    const [input, setInput] = useState<AddTeamsInputInterface>(DEFAULT_VALUE);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        setInput((prev) => {
            return {
                ...prev,
                image: e.target.files?.[0]
            }
        });
        
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        
    };

    return  <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Ajouter une équipe</h1>
                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom</label>
                            <input name="name" value={input.name} onChange={handleChange} type="text" id="name" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Nom" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pays</label>
                            <input name="country" value={input.country} onChange={handleChange} type="text" id="country" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Pays" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="balance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Solde financier</label>
                            <input name="balance" value={input.balance} onChange={handleChange} type="number" id="balance" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Solde" required />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
                            <input 
                                id="image"
                                type="file" 
                                name="image" 
                                onChange={handleFileChange} 
                                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required 
                            />
                        </div>
                        <button disabled={loading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{loading ? 'Chargement...' : 'Se connecter'}</button>
                    </form>
                </div>
            </div>
}