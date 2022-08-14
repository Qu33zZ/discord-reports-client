import {$authApi} from "../axios.instances";
import {IUser} from "../../interfaces/IUser";
import {IGuild} from "../../interfaces/IGuild";
import GuildsStore from "../../store/guilds.store";

class UserService{
	async getMe():Promise<IUser | null>{
		const response = await $authApi.get(`/users/@me`);
		console.log("Response user ---- " + response);
		if(response.status === 200){
			return response.data as IUser;
		}else{
			return null;
		}
	};

	async fetchGuilds():Promise<IGuild[]>{
		try {
			const response = await $authApi.get<IGuild[]>("/users/@me/guilds");
			if(response.status === 200){
				return response.data;
			}
			return [];
		}catch (e){
			return [];
		}
	};
}

export default new UserService();