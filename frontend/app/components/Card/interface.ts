export interface CardComponentInterface {
    id: string;
    title: string;
    image: string;
    link?: string;
    description: string;
    withAction?: boolean;
    onDelete?: (id: string) => Promise<{
        success: boolean;
        message: string;
    }>;
}

export interface CardWithActionInterface extends CardComponentInterface {
    accessToken: string;
}