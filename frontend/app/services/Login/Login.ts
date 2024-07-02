import axios from "axios";
import { IsValidEmail } from "../Email";
import { LoginInputInterface, LoginResultInterface } from "./interface";

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

    async submit(): Promise<LoginResultInterface> {
        const checkValidation = this.checkValidation();
        if (checkValidation.success) {

            await axios({
                method: 'post',
                url: "http://localhost:8000/api/login",
                data: {
                    email: this.input?.email,
                    password: this.input?.password
                }
            })
            .then((result) => {
                localStorage.setItem('accessToken', result.data.token);
                return {
                    success: true,
                    message: "Connexion reussie."
                }
            })
            .catch((error) => {
                console.log('[ERROR]', error.response.data);
                return {
                    success: false,
                    message: error?.response?.data || 'Une erreur est survenue'
                }
            });
        }

        return {
            success: false,
            message: checkValidation.message
        }
    }

}