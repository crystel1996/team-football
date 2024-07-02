'use client';
import { FC, useEffect, useState } from "react";
import { MeInterface } from "./interface";
import { UserContext } from "@team-football/context/UserContext";
import { Me } from "@team-football/services/Me";
import { UserEntity } from "@team-football/domains/entities/User";

export const MeComponent: FC<MeInterface> = (props) => {
    const [user, setUser] = useState<UserEntity | undefined>(undefined);
    useEffect(() => {
        const handleGetMe = async () => {
            if (!user) {
                const me = new Me();
                const result = await me.getMe({
                    token: localStorage.getItem('accessToken') ?? ''
                });
                if(!result?.id) {
                    window.location.href = "/login";
                    return;
                }
                setUser(result);
            }
        };
        handleGetMe();

    }, []);

    return <UserContext.Provider value={{ user: user }}>
        {user ? props.children : <></>}
    </UserContext.Provider>
}