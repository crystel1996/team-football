import { cookies } from "next/headers";
import { LogoutServiceInterface } from "./interface";
import { redirect } from "next/navigation";

export const Logout = (input: LogoutServiceInterface) => {
    cookies().delete('accessToken')
    redirect(input.redirectTo ?? '/')
}