import { GetPlayersInterface, GetOnePlayerInterface } from "./interface";
import { PlayerEntity } from "@team-football/domains/entities/Player";

export class Players {


    async getPlayers(input: GetPlayersInterface): Promise<PlayerEntity[]> {
        return [...Array(50)].map((_, index) => {
            return {
                id: 'fdfjdklsfjdskf',
                teamId: 'fdfdsfdsf',
                firstName: 'Chris',
                lastName: 'Ratsimbazafy',
                balance: 200,
                image: 'https://i.pravatar.cc/300',
            }
        });
    }

    async getOnePlayers(input: GetOnePlayerInterface): Promise<PlayerEntity> {
        return {
            id: 'fdfjdklsfjdskf',
            teamId: 'fdfdsfdsf',
            firstName: 'Chris',
            lastName: 'Ratsimbazafy',
            balance: 200,
            image: 'https://i.pravatar.cc/300',
        }
    }


}