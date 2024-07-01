export interface ListItemInterface {
    title: string;
    slug: string;
    image?: string;
}
export interface ListComponentInterface {
    items: ListItemInterface[];
}