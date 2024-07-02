import { UserEntity } from "@team-football/domains/entities/User";
import { ReactNode } from "react";

export interface MeInterface {
    children: ReactNode;
    user?: UserEntity
}