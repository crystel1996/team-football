'use client';
import { FC } from "react";
import { AddTeamsInterface } from "./interface";
import { AddTeamForm } from "./AddTeamForm";
import { AddTeamService } from "@team-football/services/Teams/Add";

export const AddTeam: FC<AddTeamsInterface> =(props)=> {

    const handleSubmit = async (input: string) => {
        
        const inputAsObject = JSON.parse(input);
        
        const addTeamService = new AddTeamService(inputAsObject);
        
        const result = await addTeamService.submit({
          accessToken: props.accessToken
        });
        if (result?.success) {
          //window.location.href = `/teams/${result.data?.id}`;
        }
        return result;
    };

    return <AddTeamForm {...props} onSubmit={handleSubmit} />
}