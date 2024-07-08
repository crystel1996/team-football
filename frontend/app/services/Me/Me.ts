import axios from "axios";
import { MeInterface } from "./interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class Me {
    async getMe(input: MeInterface) {
        return axios({
            method: 'post',
            url: `${API_URL}/api/me`, 
            headers: {
                Authorization: 'Bearer ' + input.token
            }
        })
        .then((result) => {
            return {
                success: true,
                data: result?.data
            }
        })
        .catch((error) => {
            console.log('[ERROR]', error?.response?.data);
            return {
                success: false,
                data: undefined
            }
        });
    }
}