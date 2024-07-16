import { TeamEntity } from "@team-football/domains/entities/Team";

export interface AddTeamsComponentInterface {
    onSubmit: (input: string) => Promise<{
        message: string;
        success: boolean;
        data?: any;
    }>;
    team?: TeamEntity;
}

export interface AddTeamsInterface {
    accessToken: string;
    team?: TeamEntity
}