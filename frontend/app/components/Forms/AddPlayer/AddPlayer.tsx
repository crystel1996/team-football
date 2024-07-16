'use client';
import { FC } from "react";
import { AddPlayerForm } from "./AddPlayerForm";
import { AddPlayerInterface } from "./interface";
import { AddPlayerService } from "@team-football/services/Player/Add";
import { redirect } from "next/navigation";

export const AddPlayer: FC<AddPlayerInterface> =(props)=> {

    const handleSubmit = async (input: string) => {
        
        const inputAsObject = JSON.parse(input);
        
        const addPlayerService = new AddPlayerService({...inputAsObject, idTeam: props.idTeam});
        
        const result = await addPlayerService.submit({
          accessToken: props.accessToken
        });
        if (result?.success) {
          window.location.href = `/teams/${props.idTeam}`;
        }
        return result;
    };

    return <AddPlayerForm {...props} onSubmit={handleSubmit} />
}