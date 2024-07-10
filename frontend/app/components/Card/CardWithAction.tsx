'use client';
import { FC } from "react";
import { CardWithActionInterface } from "./interface";
import { Card } from "./Card";
import { DeleteService } from "@team-football/services/Teams/Delete";

export const CardWithAction: FC<CardWithActionInterface> = (props) => {

    const handleDelete = async (id: string) => {
        const teams = new DeleteService();
        const result = await teams.deleteTeam(id, props.accessToken);
        return result;
    };

    return <Card {...props} onDelete={handleDelete}/>
}