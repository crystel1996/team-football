import axios from "axios";
import { AddTeamsInputInterface, AddTeamsSubmitInterface } from "./interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class AddTeamService {
    input: AddTeamsInputInterface | undefined;
    accessToken: string | undefined | null;

    constructor(input: AddTeamsInputInterface) {
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

    async submit(input: AddTeamsSubmitInterface) {
        const checkValidation = this.checkValidation();
        if(checkValidation.isValid) {
            return await axios({
                method: 'post',
                url: `${API_URL}/api/create/team`,
                data: {
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
                console.log('[ERROR]', result);
                return {
                    success: true,
                    message: "Equipe ajouté."
                }
            })
            .catch((error) => {
                console.log('[ERROR]', error?.response?.data);
                return {
                    success: false,
                    message: error?.response?.data || 'Une erreur est survenue'
                }
            });
        } else {
            return {
                success: false,
                message: checkValidation.message
            }
        }
    }

}