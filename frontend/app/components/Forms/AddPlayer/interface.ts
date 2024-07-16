export interface AddPlayerFormInterface {
    player?: any;
    onSubmit: (input: string) => Promise<{
        message: string;
        success: boolean;
        data?: any;
    }>;
}

export interface AddPlayerInterface {
    accessToken: string;
    idTeam: string;
}