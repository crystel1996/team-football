import { UserEntity } from "@team-football/domains/entities/User";
import { createContext } from "react";

export const UserContext = createContext<{user?: UserEntity}>({user: undefined});