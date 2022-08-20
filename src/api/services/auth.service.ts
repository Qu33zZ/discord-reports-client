import {$api, $authApi} from "../axios.instances";
import UserStore from "../../store/user.store";
import {IUser} from "../../interfaces/IUser";
import {IAuthResponse} from "../../interfaces/IAuthResponse";
import Cookies from "js-cookie";
import usersService from "./users.service";

class AuthService{
	async login(code:string):Promise<IUser | null>{
		const response = await $api.post(`/auth/login/${code}`);
		if(response.status === 200){
			UserStore.login(response.data.user as IUser);
			Cookies.set("accessToken", response.data.access_token);
			Cookies.set("refreshToken", response.data.refresh_token);
			return response.data as IUser;
		}else{
			return null;
		}
	};

	async loginByAccessToken(){
		const user = await usersService.getMe();
		if(user){
			UserStore.login(user);
		}
	}

	async refresh():Promise<IAuthResponse | null>{
		const refreshToken = Cookies.get("refreshToken");
		const response = await $api.post(`/auth/refresh/${refreshToken}`);
		if(response.status === 200){
			UserStore.login(response.data.user as IUser);
			Cookies.set("accessToken", response.data.access_token);
			Cookies.set("refreshToken", response.data.refresh_token);
			return response.data as IAuthResponse;
		}else{
			return null;
		};
	};
}

export default new AuthService();