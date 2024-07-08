'use server';
import { FC } from "react";
import { MeInterface } from "./interface";
import { Me } from "@team-football/services/Me";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Header } from "../Header";
import { Logout } from "@team-football/services/Logout";

const getData = async () => {
    const me = new Me();

    const checkMe = await me.getMe({
        token: cookies().get('accessToken')?.value ?? ''
    });

    const logout = () => {
        'use server';
        Logout({
            redirectTo: '/login'
        });
    }

    if (!checkMe.success) {
        redirect('/login');
    }
    
    return {
        me: checkMe.data,
        logout: logout
    }

}

export const MeComponent: FC<MeInterface> = async (props) => {
   
    const data = await getData();

    return <Header logout={data.logout} />
}