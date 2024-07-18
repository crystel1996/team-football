import axios from "axios";
import { BuyPlayerInputInterface, CancelSellPlayerInputInterface, ListSellPlayerInputInterface, SellPlayerInputInterface } from './interface';

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

    async cancelSellPlayer(input: CancelSellPlayerInputInterface) {
        return axios({
            method: 'post',
            url: `${API_URL}/api/cancel-selling-player`,
            data: {
                idPlayer: input.idPlayer
            },
            headers: {
                Authorization: 'Bearer ' +  input.accessToken
            }
        })
        .then((result) => {
            return {
                success: true,
                message: "Annulation du vente reussi."
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
 
    async listSellPlayer(input: ListSellPlayerInputInterface) {
        return axios({
            method: 'get',
            url: `${API_URL}/api/list-selling-player`,
            data: {
                idTeam: input.idTeam
            },
            headers: {
                Authorization: 'Bearer ' + input.accessToken
            }
        })
        .then((result) => {
            return {
                message: '',
                data: result.data.data
            }
        })
        .catch((error) => {
            return {
                message: 'Une erreur est survenue lors de recuperation des donnees',
                data: undefined
            }
        });
    }
    async buyPlayer(input: BuyPlayerInputInterface) {
        return axios({
            method: 'post',
            url: `${API_URL}/api/buy-player`,
            data: {
                idPlayer: input.idPlayer,
                idTeam: input.idTeam
            },
            headers: {
                Authorization: 'Bearer ' +  input.accessToken
            }
        })
        .then((result) => {
            return {
                success: true,
                message: "Achat reussi."
            }
        })
        .catch((error) => {
            console.log('[ERRORX]', error?.response?.data);
            return {
                success: false,
                message: error?.response?.data || 'Une erreur est survenue'
            }
        });
    }
}