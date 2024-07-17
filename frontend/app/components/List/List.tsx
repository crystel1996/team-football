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
    const [openConfirmSell, setOpenConfirmSell] = useState<{
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
                    window.location.reload();
                }
                if(!result.success) {
                    setError(result.message);
                }
            }
        }
    };

    const handleSell = (event: MouseEvent<HTMLElement>, id: string) => {
        event.stopPropagation();
        setOpenConfirmSell({
            id,
            open: true
        });
    };

    const handleCancelSell = () => {
        setOpenConfirmSell({
            id: '',
            open: false
        });
    };

    const handleConfirmSell = async () => {
        if(openConfirmSell.id && openConfirmSell.open) {
            if (props.onSell) {
                const result = await props.onSell(openConfirmSell.id);
                if(result.success) {
                    setOpenConfirmSell({
                        id: '',
                        open: false
                    });
                    window.location.reload();
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
                console.log('[ITEMS]', item)
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
                                            {props.withTransaction && !item.isAwaitingBuyer && (
                                                <span onClick={(event) => handleSell(event, item.id)} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white">Vendre</span> 
                                            )}
                                            {props.withTransaction && item.isAwaitingBuyer && (
                                                <span onClick={(event) => handleSell(event, item.id)} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white">Annuler la vente</span> 
                                            )}
                                            <a href={`${props.path}/${item.id}`} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white ">Modifier</a>
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
                title={props.deleteTitle}
                content={props.deleteSubtitle}
                message={error}
            />
        )}
        {openConfirmSell.id && openConfirmSell.open && (
            <Modal
                textConfirm="Vendre"
                textCancel="Annuler"
                onCancel={handleCancelSell}
                onConfirm={handleConfirmSell}
                title={props.sellOptions?.sellTitle || ''}
                content={props.sellOptions?.sellSubtitle || ''}
                message={error}
            />
        )}
    </>
}