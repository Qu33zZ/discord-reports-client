import React from 'react';
import {Divider, List, ListItem} from "@mui/material";
import {IGuild} from "../interfaces/IGuild";
import GuildCard from "./guild.card";

interface IGuildsNavbarProps{
	guilds:IGuild[],
	activeGuild:string;
	setActiveGuild:React.Dispatch<React.SetStateAction<string>>;
}
const GuildsNavbar:React.FC<IGuildsNavbarProps> = ({guilds, activeGuild, setActiveGuild}) => {
	console.log(guilds);
	return (
		<List style={{width:"20%"}}>
			{guilds.map(guild => {
				return (
					<>
						<GuildCard guild={guild} activeGuild={activeGuild} setActiveGuild={setActiveGuild}/>
						<Divider/>
					</>
				)
			})}
		</List>
	);
};

export default GuildsNavbar;