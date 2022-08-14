import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/main.page";
import Loader from "./components/loader";
import authService from "./api/services/auth.service";
import "./NullingStyles.css";
import Cookies from "js-cookie";
import usersService from "./api/services/users.service";
import GuildsStore from "./store/guilds.store";
const App = () => {
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() =>{
		const login = async () =>{
			const authResult = new URLSearchParams(window.location.search);
			const code = authResult.get('code');
			if(code){
				try{
					await authService.login(code);
				}catch (e){
					if(Cookies.get("accessToken")) await authService.loginByAccessToken();
				}
			}else{
				await authService.loginByAccessToken();
			}
		};
		const fetchUserGuilds = async () =>{
			const guilds = await usersService.fetchGuilds();
			GuildsStore.setGuilds(guilds);
		}
		login()
			.then(() => fetchUserGuilds())
			.finally(() => setLoading(false));

	}, [])

	return (
		loading
			? <Loader/>
			: <BrowserRouter>
				<Routes>
					<Route element={<MainPage/>} path={"/"}/>
				</Routes>
			 </BrowserRouter>
	);
};

export default App;