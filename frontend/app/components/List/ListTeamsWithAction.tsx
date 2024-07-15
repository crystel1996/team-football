'use client';
import { FC } from "react";
import { ListWithActionInterface } from "./interface";
import { List } from "./List";
import { DeleteService } from "@team-football/services/Teams/Delete";

export const ListTeamsWithAction: FC<ListWithActionInterface> = (props) => {

    const handleDelete = async (id: string) => {
        const teams = new DeleteService();
        const result = await teams.deleteTeam(id, props.accessToken);
        return result;
    };

    return <List {...props} onDelete={handleDelete}/>
}