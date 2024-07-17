'use client';
import { FC } from "react";
import { ListWithActionInterface } from "./interface";
import { List } from "./List";
import { DeleteService } from "@team-football/services/Player/Delete";
import { usePathname } from 'next/navigation'
import { PlayerTransactionService } from "@team-football/services/PlayerTransaction";

export const ListPlayersWithAction: FC<ListWithActionInterface> = (props) => {
    
    const pathname = usePathname();

    const handleDelete = async (id: string) => {
        const teams = new DeleteService();
        const result = await teams.deletePlayer(id, props.accessToken);
        return result;
    };

    const handleSell = async (idPlayer: string) => {
        const playerTransaction = new PlayerTransactionService();
       
        const idTeam = (pathname || '').split('/')[2];
        const result = await playerTransaction.sellPlayer({
            idPlayer,
            idTeam,
            accessToken: props.accessToken
        });
        return result;
    };

    return <List {...props} onDelete={handleDelete} onSell={handleSell} />
}