export interface ListItemInterface {
    id: string;
    name: string;
    image?: string;
    link?: string;
    subtitle?: string;
}
export interface ListComponentInterface {
    items: ListItemInterface[];
    withAction?: boolean;
    withTransaction?: boolean;
    path: string;
    deleteTitle: string;
    deleteSubtitle: string;
    
    sellOptions?: {
        sellTitle: string;
        sellSubtitle: string;
    }
    onDelete?: (id: string) => Promise<{
        success: boolean;
        message: string;
    }>;
    onSell?: (id: string) => Promise<{
        success: boolean;
        message: string;
    }>;

}

export interface ListWithActionInterface extends ListComponentInterface {
    accessToken: string;
}