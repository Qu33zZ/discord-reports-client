import React from 'react';
import { ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {IGuild} from "../interfaces/IGuild";
import styled from "styled-components";

const GuildIconSize = 30;
const StyledGuildIconNotFound = styled.div`
  	display: flex;
  	align-items: center;
  	justify-content: space-around;
	background-color: rgba(88,101,242,0.85);
  	width: ${GuildIconSize}px;
  	height: ${GuildIconSize}px;

  	border-radius: 50%;
`;

const StyledGuildIcon = styled.img`
	width: ${GuildIconSize}px;
  	height: ${GuildIconSize}px;
  	border-radius: 50%;
`;
const GuildCard = ({guild, activeGuild, setActiveGuild}:{guild:IGuild, activeGuild:string, setActiveGuild:React.Dispatch<React.SetStateAction<string>>}) => {
	return (
		<ListItem onClick={() => setActiveGuild(guild.id)} style={{cursor:"pointer"}}>
			<ListItemAvatar>
					{guild.icon
						? <StyledGuildIcon src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} alt={`${guild.name} Icon`}/>
						: <StyledGuildIconNotFound>?</StyledGuildIconNotFound>
					}
			</ListItemAvatar>
			<ListItemText>
				{guild.name}
			</ListItemText>
		</ListItem>
	);
};

export default GuildCard;