import axios from "axios";
import { IsValidEmail } from "../Email";
import { LoginInputInterface } from "./interface";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class LoginService {
    input: LoginInputInterface | undefined;
    constructor(input: LoginInputInterface) {
        this.input = input;
    }

    checkValidation() {
        if (!IsValidEmail(this.input?.email || '')) {
            return {
                success: false,
                message: "Veuillez inserer l'email."
            }
        }
        if(!this.input?.password) {
            return {
                success: false,
                message: "Veuillez inserer le mot de passe."
            }
        }
        return {
            success: true,
            message: ''
        }
    }

    async submit() {
        const checkValidation = this.checkValidation();
        if (checkValidation.success) {

            return await axios({
                method: 'post',
                url: `${API_URL}/api/login`,
                data: {
                    email: this.input?.email,
                    password: this.input?.password
                }
            })
            .then((result) => {
                cookies().set('accessToken', result.data.token);
                return {
                    success: true,
                    data: result.data.token,
                    message: "Connexion reussie."
                }
            })
            .catch((error) => {
                console.log('[ERROR]', error?.response?.data);
                return {
                    success: false,
                    data: undefined,
                    message: error?.response?.data || 'Une erreur est survenue'
                }
            });
        } else {
            return {
                success: false,
                data: undefined,
                message: checkValidation.message
            }
        }
    }

}