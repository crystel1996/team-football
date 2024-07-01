export interface GetTeamsInterface {
    offset: number;
    take: number;
}

export interface GetOneTeamInterface {
    filter: {
        [key: string]: string
    }
}