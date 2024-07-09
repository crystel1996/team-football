export interface AddTeamsInputInterface {
    id?: string;
    name: string;
    country: string;
    balance: number;
    image?: File;
}

export interface AddTeamsSubmitInterface {
    accessToken: string
}