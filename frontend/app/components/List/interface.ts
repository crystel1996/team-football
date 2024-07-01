export interface ListItemInterface {
    name: string;
    image?: string;
    link?: string;
}
export interface ListComponentInterface {
    items: ListItemInterface[];
}