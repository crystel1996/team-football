export interface AddPlayerInterface {
    player?: any;
    onSubmit: (input: string) => Promise<{
        message: string;
        success: boolean;
        data?: any;
    }>;
}