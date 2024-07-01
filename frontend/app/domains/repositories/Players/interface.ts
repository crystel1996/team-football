export interface GetPlayersInterface {
    offset: number;
    take: number;
}

export interface GetOnePlayerInterface {
    filter: {
        [key: string]: string
    }
}