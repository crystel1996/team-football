'use client';
import { FC, MouseEvent, useEffect, useState } from "react";
import { ListComponentInterface } from "./interface";
import { Modal } from "../Modal";

export const List: FC<ListComponentInterface> = (props) => {
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
                }
                if(!result.success) {
                    setError(result.message);
                }
            }
        }
    };

    return <>
        <ul role="list" className="grid gap-4 grid-cols-3 max-[600px]:grid-cols-2 grid-rows-3 max-[600px]:grid-rows-2">
            {(props.items || []).map((item) => {
                return  <li key={item.name} className="group flex justify-center gap-x-6 py-5 cursor-pointer hover:bg-blue-600">
                            <div className="flex items-center min-w-0 gap-x-4">
                                {item.image && (<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.image} alt={item.image} />)}
                                <div className="min-w-0 flex-auto align-items">
                                    <div>
                                        {item.link && (
                                            <a href={item.link} className="text-sm font-semibold leading-6 text-gray-900 ">{item.name}</a>
                                        )}
                                        {!item.link && (
                                            <p className="text-sm font-semibold leading-6 text-gray-900 ">{item.name}</p>
                                        )}
                                    </div>
                                    {item.subtitle && (
                                        <div>
                                            
                                            <p  className="text-sm text-gray-600 group-hover:text-white">{item.subtitle}</p>
                                            
                                        </div>
                                    )}
                                    {props.withAction && (
                                        <div className="py-1"> 
                                            <a href={`${props.path}/update/${item.id}`} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white ">Modifier</a>
                                            <span onClick={(event) => handleDelete(event, item.id)} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white">Supprimer</span>    
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li> 
            })}
        </ul>
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