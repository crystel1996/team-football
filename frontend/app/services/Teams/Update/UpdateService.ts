import axios from "axios";
import { UpdateTeamsInputInterface, UpdateTeamsSubmitInterface } from "./interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class UpdateTeamService {
    input: UpdateTeamsInputInterface | undefined;
    accessToken: string | undefined | null;

    constructor(input: UpdateTeamsInputInterface) {
        this.input = input;
    } 

    checkValidation() {
        if(!this.input?.name) {
            return {
                isValid: false,
                message: "Veuillez ajouter un nom."
            }
        }
        if(!this.input?.country) {
            return {
                isValid: false,
                message: "Veuillez ajouter un pays."
            }
        }

        if(!this.input?.balance) {
            return {
                isValid: false,
                message: "Veuillez ajouter le solde."
            }
        }
        if(!this.input?.image) {
            return {
                isValid: false,
                message: "Veuillez ajouter une photo."
            }
        }
        if(this.input?.image) {
            const fileType = this.input?.image.type;
            if (!fileType.startsWith('image/')) {
                return {
                    isValid: false,
                    message: "Veuillez ajouter une photo."
                }
            }
        }
        return {
            isValid: true,
            message: ''
        }
    }

    async submit(input: UpdateTeamsSubmitInterface) {
        const checkValidation = this.checkValidation();
        if(checkValidation.isValid) {
            return await axios({
                method: 'post',
                url: `${API_URL}/api/update/team`,
                data: {
                    id: this.input?.id,
                    name: this.input?.name,
                    country: this.input?.country,
                    balance: typeof this.input?.balance !== 'number' ? parseInt(this.input?.balance as any) : this.input?.balance,
                    image: 'https://cdn.statically.io/gh/hjnilsson/country-flags/master/svg/mg.svg' //this.input?.image
                },
                headers: {
                    Authorization: 'Bearer ' +  input.accessToken
                }
            })
            .then((result) => {
                
                return {
                    success: true,
                    message: "Equipe modifié.",
                    data: result.data
                }
            })
            .catch((error) => {
                console.log('[ERROR]', error?.response?.data);
                return {
                    success: false,
                    message: error?.response?.data || 'Une erreur est survenue',
                    data: undefined
                }
            });
        } else {
            return {
                success: false,
                message: checkValidation.message,
                data: undefined
            }
        }
    }

}