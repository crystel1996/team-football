'use client';
import { FC } from "react";
import { ListWithActionInterface } from "./interface";
import { List } from "./List";
import { DeleteService } from "@team-football/services/Player/Delete";

export const ListPlayersWithAction: FC<ListWithActionInterface> = (props) => {

    const handleDelete = async (id: string) => {
        const teams = new DeleteService();
        const result = await teams.deletePlayer(id, props.accessToken);
        return result;
    };

    return <List {...props} onDelete={handleDelete}/>
}