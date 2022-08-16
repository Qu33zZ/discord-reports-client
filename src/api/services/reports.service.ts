import {$authApi} from "../axios.instances";
import {IReport} from "../../interfaces/IReport";

class ReportsService{
	async fetchReports(guildId:string, page:number = 1, itemsOnPage?:number):Promise<{reports:IReport[], pagesCount:number}>{
		try {
			const response = await $authApi.get<{reports:IReport[], pagesCount:number}>(`/reports/${guildId}/`, {params:{page, itemsOnPage}});
			if(response.status === 200){
				return response.data;
			}
			return {reports:[], pagesCount:1};
		}catch (e){
			return {reports:[], pagesCount:1};
		}
	};
}

export default new ReportsService();