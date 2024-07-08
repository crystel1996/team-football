import axios from "axios";
import { ListTeamInputInterface } from "./interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ListTeamsService {

    async getListTeams(input: ListTeamInputInterface) {

        return axios({
            method: 'get',
            url: `${API_URL}/api/list-team/${input.page}`,
            headers: {
                Authorization: 'Bearer ' + input.accessToken
            }
        })
        .then((result) => {
            return {
                message: '',
                data: (result.data.data || []).map((team: any) => {
                    return {
                        ...team,
                        link: `/teams/${team.slug}`,
                        subtitle: `Balance: ${team.balance}$`,
                        slug: undefined,
                    }
                })
            }
        })
        .catch((error) => {
            return {
                message: 'Une erreur est survenue lors de recuperation des donnees',
                data: []
            }
        });
    }

}