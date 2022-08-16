import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/header";
import UserStore from "../store/user.store";
import MainPageAuthMessage from "../components/main.page.auth.message";
import {StyledPage} from "../components/styled.page";
import GuildsNavbar from "../components/guilds.navbar";
import GuildsStore from "../store/guilds.store";
import reportsService from "../api/services/reports.service";
import {IReport} from "../interfaces/IReport";
import GuildReportsField from "../components/guild.reports.field";


const MainPage = () => {
	const user = UserStore.user;
	const guilds = GuildsStore.guilds;
	const [activeGuild, setActiveGuild] = useState<string>("");

	return (
		<StyledPage>
			<Header/>
			{
				!user
					? <MainPageAuthMessage/>
					:
				<GuildsNavbar guilds={guilds} activeGuild={activeGuild} setActiveGuild={setActiveGuild}/>
			}
			{
				activeGuild === "" ? <p>Выберите сервер, репорты которого хотите посмотреть</p>
				:
				<GuildReportsField guild={activeGuild}/>
			}
		</StyledPage>
	);
};

export default MainPage;