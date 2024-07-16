export interface AddPlayerInputInterface {
    id?: string;
    firstName: string;
    lastName: string;
    balance: number;
    idTeam: string;
    position: string;
}

export interface AddPlayerSubmitInterface {
    accessToken: string;
}