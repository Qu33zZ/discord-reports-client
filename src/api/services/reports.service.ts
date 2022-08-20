import {$authApi} from "../axios.instances";
import {IReport, reportStatusType} from "../../interfaces/IReport";
import reportStatus from "../../components/report.status";

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

	async updateReportStatus(reportId:string, status:reportStatusType, guildId:string){
		console.log(guildId)
		try {
			const response = await $authApi.patch<IReport>(`/reports/${guildId}/${reportId}`, {status});
			if(response.status === 200){
				return response.data;
			}
			return null;
		}catch (e){
			return null;
		}
	}
}

export default new ReportsService();