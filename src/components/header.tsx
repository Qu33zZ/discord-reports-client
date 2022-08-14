import { Button } from '@mui/material';
import React from 'react';
import styled from "styled-components";
import UserStore from "../store/user.store";
import background from "../assets/bg.pattern.svg";

const StyledHeader = styled.header`
	display: flex;
  	justify-content: space-between;
  	align-items: center;
  
  	width: 100%;
  	height: 80px;
  
  	padding: 0 5% 0 5%;
  	
  	background-image: url(${background});
  	background-color: rgba(17,24,39, 1);
  
  	& h1{
	  font-size: 28px;
	  font-weight: bold;
	  color: #fff;
	  & span{
	    color: rgba(88,101,242,1);
        font-size: 28px;
        font-weight: bold;
	  }
    }
  
  	& img{
	  width: 60px;
	  height: 60px;
	  
	  border-radius: 50%;
    }
`;


const Header = () => {
	const user = UserStore.user;
	return (
		<StyledHeader>
			<h1><span>D</span>Reports</h1>
			{user
				? <img src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} alt=""/>
				: <a href="https://discord.com/api/oauth2/authorize?client_id=772064351980355636&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email%20guilds%20guilds.join">
					<Button style={{backgroundColor:"rgba(88,101,242,1)"}} variant="contained">Войти</Button>
				  </a>
			}
		</StyledHeader>
	);
};

export default Header;