export interface ListItemInterface {
    name: string;
    image?: string;
    link?: string;
    subtitle?: string;
}
export interface ListComponentInterface {
    items: ListItemInterface[];
}