import {$authApi} from "../axios.instances";
import {IReport} from "../../interfaces/IReport";

class ReportsService{
	async fetchReports(guildId:string):Promise<IReport[]>{
		try {
			const response = await $authApi.get<IReport[]>(`/reports/${guildId}`);
			if(response.status === 200){
				return response.data;
			}
			return [];
		}catch (e){
			return [];
		}
	};
}

export default new ReportsService();