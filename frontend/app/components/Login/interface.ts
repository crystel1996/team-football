import { LoginInputInterface } from "@team-football/services/Login";

export interface LoginComponentInterface {
    checkLogin: (input: LoginInputInterface) => Promise<{
        message: string;
        success: boolean;
        data?: any;
    }>
}