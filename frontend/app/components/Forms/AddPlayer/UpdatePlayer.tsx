'use client';
import { FC } from "react";
import { AddPlayerForm } from "./AddPlayerForm";
import {  UpdatePlayerInterface } from "./interface";
import { UpdatePlayerService } from "@team-football/services/Player/Update";

export const UpdatePlayer: FC<UpdatePlayerInterface> =(props)=> {

    const handleSubmit = async (input: string) => {
        const inputAsObject = JSON.parse(input);
        
        const updatePlayerService = new UpdatePlayerService(inputAsObject);
        
        const result = await updatePlayerService.submit({
          accessToken: props.accessToken 
        });

        if(result.success) {
            console.log('[]', result.data);
            window.location.href = `/teams/${(result.data as any)?.id}`;
        }

        return result;
    }

    return <AddPlayerForm {...props} onSubmit={handleSubmit} />
}