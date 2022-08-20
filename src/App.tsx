import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/main.page";
import Loader from "./components/loader";
import authService from "./api/services/auth.service";
import "./NullingStyles.css";
import Cookies from "js-cookie";
import usersService from "./api/services/users.service";
import GuildsStore from "./store/guilds.store";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserStore from "./store/user.store";


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
				if(Cookies.get("accessToken")) await authService.loginByAccessToken();
			}
		};
		const fetchUserGuilds = async () =>{
			if(UserStore.user){
				const guilds = await usersService.fetchGuilds();
				GuildsStore.setGuilds(guilds);
			}

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
				<ToastContainer position={"bottom-center"} limit={1} newestOnTop containerId={"main-container"} enableMultiContainer/>
			 </BrowserRouter>
	);
};

export default App;