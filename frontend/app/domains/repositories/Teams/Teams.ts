import { TeamEntity } from "@team-football/domains/entities/Team";
import { GetTeamsInterface, GetOneTeamInterface } from "./interface";

export class Teams {

    async getOneTeams(input: GetOneTeamInterface): Promise<TeamEntity> {
        return {
              id: 'dsdafaf',
              name: `Team 1`,
              image: 'https://i.pravatar.cc/300',
              link: `teams/team-1`,
              country: 'Madagascar',
              balance: 5000
            }
    }


}