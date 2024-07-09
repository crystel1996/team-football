export class DeleteService {

    async deleteTeam(id: string, accessToken: string) {
        return {
            success: false,
            message: "Une erreur est survenue."
        }
    }

}