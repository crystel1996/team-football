import axios from "axios";
import { AddPlayerInputInterface, AddPlayerSubmitInterface } from "./interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class AddPlayerService {
    input: AddPlayerInputInterface | undefined;
    accessToken: string | undefined | null;

    constructor(input: AddPlayerInputInterface) {
        this.input = input;
    } 

    checkValidation() {
        if(!this.input?.lastName) {
            return {
                isValid: false,
                message: "Veuillez ajouter un nom."
            }
        }
        if(!this.input?.firstName) {
            return {
                isValid: false,
                message: "Veuillez ajouter un prenom."
            }
        }
        if(!this.input?.idTeam) {
            return {
                isValid: false,
                message: "Veuillez ajouter l'equipe."
            }
        }

        if(!this.input?.balance) {
            return {
                isValid: false,
                message: "Veuillez ajouter le solde."
            }
        }

        if(!this.input?.position) {
            return {
                isValid: false,
                message: "Veuillez ajouter la position."
            }
        }

        return {
            isValid: true,
            message: ''
        }
    }

    async submit(input: AddPlayerSubmitInterface) {
        const checkValidation = this.checkValidation();
        if(checkValidation.isValid) {
            return await axios({
                method: 'post',
                url: `${API_URL}/api/create/player`,
                data: {
                    firstName: this.input?.firstName,
                    lastName: this.input?.lastName,
                    balance: typeof this.input?.balance !== 'number' ? parseInt(this.input?.balance as any) : this.input?.balance,
                    position: this.input?.position
                },
                headers: {
                    Authorization: 'Bearer ' +  input.accessToken
                }
            })
            .then((result) => {
                return {
                    success: true,
                    message: "Joueur ajouté."
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