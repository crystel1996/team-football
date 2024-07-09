import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class DeleteService {

    async deleteTeam(id: string, accessToken: string) {
        return axios({
            method: 'post',
            url: `${API_URL}/api/delete-team`,
            data: {
                id
            },
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        .then((result) => {
            return {
                success: true,
                message: result.data
            }
        })
        .catch((error) => {
            console.log('[ERROR]', error?.response?.data);
            return {
                success: false,
                message: "Une erreur est survenue."
            }
        });
    }

}