export interface UpdatePlayersInputInterface {
    id: string;
    lastName: string;
    firstName: string;
    balance: number;
    position: string;
    idTeam: string;
}

export interface UpdatePlayersSubmitInterface {
    accessToken: string;
}