export interface SellPlayerInputInterface {
    accessToken: string;
    idTeam: string;
    idPlayer: string;
}
export interface CancelSellPlayerInputInterface {
    idPlayer: string;
    accessToken: string;
}
export interface ListSellPlayerInputInterface {
    idTeam: string;
    accessToken: string;
}
export interface BuyPlayerInputInterface {
    idPlayer: string;
    idTeam: string;
    accessToken: string;
}