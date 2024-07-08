'use server';
import { Login } from "@team-football/components/Login";
import { LoginInputInterface, LoginService } from "@team-football/services/Login";

const getData = async () => {
  

  const checkLogin = async (input: LoginInputInterface) => {
    "use server";
    const loginService = new LoginService(input);
    const result = await loginService.submit();
    return result;
  };

  return {
    checkLogin
  }

}

export default async function LoginPage() {

    const loginData = await getData();

    return (
      <div className="bg-slate-200">
      
        <Login checkLogin={loginData.checkLogin}/>

      </div>
    );
}
  