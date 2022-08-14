import axios, {AxiosRequestConfig} from "axios";
import Cookies from "js-cookie";
import authService from "./services/auth.service";

export const $authApi = axios.create({
	baseURL:"http://localhost:5001",
	withCredentials:true
});

$authApi.interceptors.request.use(
	(reqConfig:AxiosRequestConfig) =>{
		const token = Cookies.get("accessToken");
		if(token) reqConfig.headers = {...reqConfig.headers, authorization:`Bearer ${token}`};
		return reqConfig;
	},
	(reqConfig:AxiosRequestConfig) => reqConfig
);

$authApi.interceptors.response.use(
	(data) => data,
	(error) => {
		const reqConfig = Object.assign({}, error.config);
		if (error?.response?.status === 401 && !reqConfig?.retried) {
			return new Promise((resolve, reject) =>{
				reqConfig.retried = true;
				authService.refresh().then((result)=>{
					return resolve($authApi.request(reqConfig));
				});
			});
		}

		return Promise.reject(error)

	});

export const $api = axios.create({
	baseURL:"http://localhost:5001",
	withCredentials:true
})