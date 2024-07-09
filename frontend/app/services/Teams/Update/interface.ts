export interface UpdateTeamsInputInterface {
    id: string;
    name: string;
    country: string;
    balance: number;
    image?: File;
}

export interface UpdateTeamsSubmitInterface {
    accessToken: string
}