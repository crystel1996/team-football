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

    const handleCancelConfirmSell = () => {
        setOpenConfirmDelete({
            id: '',
            open: false
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

    const handleCancelSell = (event: MouseEvent<HTMLElement>, id: string) => {
        event.stopPropagation();
        props.onCancelSell && props.onCancelSell(id);
        window.location.reload();
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

    const handleBuy = (event: MouseEvent<HTMLElement>, id: string) => {
        event.stopPropagation();
        props.onBuy && props.onBuy(id);
        window.location.reload();
    };

    return <>
        <ul role="list" className="flex flex-wrap">
            {(props.items || []).map((item) => {
                return  <li key={item.name} className="flex justify-center gap-x-6 py-5 px-2 mx-2 my-2 min-w-40 cursor-pointer border border-sky-500 rounded">
                            <div className="flex items-center min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto items-start ">
                                    <div>
                                        {item.link && (
                                            <a href={item.link} className="text-sm font-semibold leading-6 text-gray-900 hover:underline">{item.name}</a>
                                        )}
                                        {!item.link && (
                                            <p className="text-sm font-semibold leading-6 text-gray-900 ">{item.name}</p>
                                        )}
                                    </div>
                                    {item.subtitle && (
                                        <div>
                                            
                                            <p  className="text-sm text-gray-600">{item.subtitle}</p>
                                            
                                        </div>
                                    )}
                                    {props.withAction && (
                                        <div className="py-1">
                                            {props.withTransaction && !item.isAwaitingBuyer && !props.withBuy && (
                                                <span onClick={(event) => handleSell(event, item.id)} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white">Vendre</span> 
                                            )}
                                            {props.withTransaction && item.isAwaitingBuyer && !props.withBuy && (
                                                <span onClick={(event) => handleCancelSell(event, item.id)} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white">Annuler la vente</span> 
                                            )}
                                            {props.withTransaction && props.withBuy && (
                                                <span onClick={(event) => handleBuy(event, item.id)} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white">Acheter</span> 
                                            )}
                                            {props.withUpdate && (
                                                <>
                                                    <a href={`${props.path}/${item.id}`} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white ">Modifier</a>
                                                    <span onClick={(event) => handleDelete(event, item.id)} className="px-1 underline text-sm font-semibold leading-6 text-gray-900 hover:text-white">Supprimer</span>
                                                </> 
                                            )}   
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
                title={props.deleteTitle ?? ''}
                content={props.deleteSubtitle ?? ''}
                message={error}
            />
        )}
        {openConfirmSell.id && openConfirmSell.open && (
            <Modal
                textConfirm="Vendre"
                textCancel="Annuler"
                onCancel={handleCancelConfirmSell}
                onConfirm={handleConfirmSell}
                title={props.sellOptions?.sellTitle || ''}
                content={props.sellOptions?.sellSubtitle || ''}
                message={error}
            />
        )}
    </>
}