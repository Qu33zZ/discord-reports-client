import React from 'react';
import {Divider, List, ListItem} from "@mui/material";
import {IGuild} from "../interfaces/IGuild";
import GuildCard from "./guild.card";
import styled from "styled-components";

interface IGuildsNavbarProps{
	guilds:IGuild[],
	activeGuild:string;
	setActiveGuild:React.Dispatch<React.SetStateAction<string>>;
	opened:boolean;
}

const StyledGuildsNavbar = styled.ul`
	width: 20vw;
	
  	display: ${({opened}:{opened:boolean}) => opened ? "flex" : "none"};
  
  	flex-direction: column;
`;
const GuildsNavbar:React.FC<IGuildsNavbarProps> = ({guilds, activeGuild, setActiveGuild, opened}) => {
	return (
		<StyledGuildsNavbar opened={opened}>
			{guilds.map(guild =>
				<div key={guild.id}>
					<GuildCard guild={guild} activeGuild={activeGuild} setActiveGuild={setActiveGuild}/>
					<Divider/>
				</div>
			)}
		</StyledGuildsNavbar>
	);
};

export default GuildsNavbar;