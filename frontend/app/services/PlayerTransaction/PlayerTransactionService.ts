import axios from "axios";
import { SellPlayerInputInterface } from './interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class PlayerTransactionService {
    async sellPlayer(input: SellPlayerInputInterface) {
        return axios({
            method: 'post',
            url: `${API_URL}/api/sell-player`,
            data: {
                idTeam: input.idTeam,
                idPlayer: input.idPlayer
            },
            headers: {
                Authorization: 'Bearer ' +  input.accessToken
            }
        })
        .then((result) => {
            return {
                success: true,
                message: "Joueur en attente d'acheteur."
            }
        })
        .catch((error) => {
            console.log('[ERROR]', error?.response?.data);
            return {
                success: false,
                message: error?.response?.data || 'Une erreur est survenue'
            }
        });
    }
}