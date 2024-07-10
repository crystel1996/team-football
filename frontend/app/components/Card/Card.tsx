'use client';
import { FC, MouseEvent, useEffect, useState } from "react";
import { CardComponentInterface } from "./interface";
import { Modal } from "../Modal";

export const Card: FC<CardComponentInterface> = (props) => {
    const [openConfirmDelete, setOpenConfirmDelete] = useState<{
        id: string;
        open: boolean;
    }>({
        id: '',
        open: false
    });
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        if(!openConfirmDelete.open) {
            setError(undefined);
        }
    }, [openConfirmDelete.open]);

    const handleDelete = (event: MouseEvent<HTMLElement>, id: string) => {
        event.stopPropagation();
        setOpenConfirmDelete({
            id,
            open: true
        });
    };

    const handleCancel = () => {
        setOpenConfirmDelete({
            id: '',
            open: false
        });
    };

    const handleConfirm = async () => {
        if(openConfirmDelete.id && openConfirmDelete.open) {
            if (props.onDelete) {
                const result = await props.onDelete(openConfirmDelete.id);
                if(result.success) {
                    setOpenConfirmDelete({
                        id: '',
                        open: false
                    });
                    window.location.href = props.link ?? '/';
                }
                if(!result.success) {
                    setError(result.message);
                }
            }
        }
    };

    return  <>
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                <img className="w-full md:w-1/3 h-48 md:h-auto object-cover" src={props.image} alt={props.title} />
                <div className="w-full md:w-2/3 p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>
                    <p className="text-gray-600 mt-2">{props.description}</p>
                    {props.withAction && (
                        <div className="mt-4">
                            <a href={`${props.link}/update/${props.id}`} className="text-blue-500 hover:text-blue-700">Modifier</a>
                            <span onClick={(event) => handleDelete(event, props.id)} className="px-1 underline text-blue-500 hover:text-blue-700">Supprimer</span>
                        </div>
                    )}
                </div>
            </div>
            {openConfirmDelete.id && openConfirmDelete.open && (
                <Modal
                    textConfirm="Supprimer"
                    textCancel="Annuler"
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                    title="Supprimer l'équipe"
                    content="Voulez-vous supprimer cette équipe?"
                    message={error}
                />
            )}
    </>
}