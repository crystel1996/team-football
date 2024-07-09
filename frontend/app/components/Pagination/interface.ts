export interface PaginationComponentInterface {
    nextDisabled?: boolean;
    previousDisabled?: boolean;
    currentPage: number;
    path: string;
    totalPage: number;
}