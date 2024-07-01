import { LogoutServiceInterface } from "./interface";

export const Logout = (input: LogoutServiceInterface) => {
    localStorage.removeItem('accessToken');
    window.location.href = input.redirectTo ?? '/';
}