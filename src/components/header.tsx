import {Button, IconButton} from '@mui/material';
import React, {SetStateAction} from 'react';
import styled from "styled-components";
import UserStore from "../store/user.store";
import background from "../assets/bg.pattern.svg";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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

interface IHeaderProps{
	navbarOpen:boolean
	setNavbarOpen:React.Dispatch<SetStateAction<boolean>>
};

const Header:React.FC<IHeaderProps> = ({setNavbarOpen, navbarOpen}) => {
	const handleNavbarClick = () =>{
		setNavbarOpen(prevState => !prevState);
	}
	console.log(navbarOpen);
	const user = UserStore.user;
	return (
		<StyledHeader>
			<Button
				variant={"contained"}
				onClick={handleNavbarClick}
				style={{backgroundColor:"rgba(88,101,242,1)"}}
			>
				{!navbarOpen ? <MenuIcon/> : <CloseIcon/>}
			</Button>
			<h1><span>D</span>Reports</h1>
			{user
				? <img src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} alt=""/>
				: <a href="https://discord.com/api/oauth2/authorize?client_id=1010630896761700474&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20email%20guilds%20guilds.members.read">
					<Button  variant="contained">Войти</Button>
				  </a>
			}
		</StyledHeader>
	);
};

export default Header;