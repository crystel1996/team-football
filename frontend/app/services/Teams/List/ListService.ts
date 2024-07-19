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
                        link: `/teams/${team.id}`,
                        subtitle: `Solde: ${team.balance}$`,
                        slug: undefined,
                    }
                }),
                count: result.data.count
            }
        })
        .catch((error) => {
            return {
                message: 'Une erreur est survenue lors de recuperation des donnees',
                data: [],
                count: 0
            }
        });
    }

    async getOneTeamsById(id: string, accessToken: string) {
        return axios({
            method: 'get',
            url: `${API_URL}/api/team`,
            data: {
                id
            },
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        .then((result) => {
            return {
                message: '',
                data: {
                    id: result.data.data.id,
                    balance: result.data.data.balance,
                    country: result.data.data.country,
                    name: result.data.data.name,
                    players: result.data.data.players as any
                }
            }
        })
        .catch((error) => {
            return {
                message: 'Une erreur est survenue lors de recuperation des donnees',
                data: undefined
            }
        });
    }

}