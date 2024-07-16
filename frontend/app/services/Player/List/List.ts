import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ListPlayerService {
    async getOnePlayerById(id: string, accessToken: string) {
        return axios({
            method: 'get',
            url: `${API_URL}/api/player`,
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
                    firstName: result.data.data.firstName,
                    lastName: result.data.data.lastName,
                    position: result.data.data.position,
                    name: result.data.data.name,
                    balance: result.data.data.balance
                }
            }
        })
        .catch((error) => {
            console.log('ERROR', error)
            return {
                message: 'Une erreur est survenue lors de recuperation des donnees',
                data: undefined
            }
        });
    }
}