import { AddTeamsInputInterface } from "@team-football/services/Teams/Add";

export interface AddTeamsComponentInterface {
    onSubmit: (input: string) => Promise<{
        message: string;
        success: boolean;
        data?: any;
    }>
}