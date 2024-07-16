'use client';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { AddPlayerFormInterface } from "./interface";
import { AddPlayerInputInterface } from "@team-football/services/Player/Add";

const DEFAULT_VALUE: AddPlayerInputInterface = {
    lastName: '',
    firstName: '',
    idTeam: '',
    balance: 0,
    position: ''
}

export const AddPlayerForm: FC<AddPlayerFormInterface> = (props) => {

    const [input, setInput] = useState<AddPlayerInputInterface>(DEFAULT_VALUE);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     if(props.team) {
    //         setInput({
    //             id: props.team.id,
    //             name: props.team.name,
    //             country: props.team.country,
    //             balance: props.team.balance,
    //             image:{
    //                 name: props.team.image
    //             } as any
    //         });
    //     }
    // }, [props.team]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const inputStringify = JSON.stringify({...input});
        
        const result = await props.onSubmit(inputStringify);
        
        if(result?.success) {
            setLoading(false);
            setError(result?.message);
            setInput(DEFAULT_VALUE);
            return;
        }
        if(!result?.success) {
            setLoading(false);
            setError(result?.message);
        }
        
    };

    return  <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">{props.player ? "Modifier le joueur" : "Ajouter un joueur"}</h1>
                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prenom</label>
                            <input name="firstName" value={input.firstName} onChange={handleChange} type="text" id="name" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Nom" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom</label>
                            <input name="lastName" value={input.lastName} onChange={handleChange} type="text" id="name" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Prenom" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Poste</label>
                            <input name="position" value={input.position} onChange={handleChange} type="text" id="name" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Position" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="balance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prix</label>
                            <input name="balance" value={input.balance} onChange={handleChange} type="number" id="balance" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Prix" required />
                        </div>
                        <button disabled={loading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{loading ? 'Chargement...' : 'Sauvegarder'}</button>
                    </form>
                </div>
            </div>
}