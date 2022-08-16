import React from 'react';
import styled from "styled-components";
import {IUser} from "../interfaces/IUser";

const StyledReportUser = styled.div`
	display: flex;
  	align-items: center;
  	& img{
	  width: 30px;
	  height: 30px;
	  
	  margin-right: 5px;
	  
	  border-radius: 50%;
    }
  
  	& p{
	  font-weight: bold;
	  //color: #3A3A3A;
    }
`;

const StyledUserIconNotFound = styled.div`
  	display: flex;
  	align-items: center;
  	justify-content: space-around;
	background-color: rgba(88,101,242,0.85);
  	width: 30px;
  	height: 30px;

  	border-radius: 50%;
`;

interface IReportUserProfileProps{
	user:IUser | string;
};

const ReportUserProfile:React.FC<IReportUserProfileProps> = ({user}) => {
	if(typeof user === "string"){
		return (
			<StyledReportUser>
				<StyledUserIconNotFound>?</StyledUserIconNotFound>
				<p>${user}</p>
			</StyledReportUser>
		);
	}
	return (
		<StyledReportUser>
			<img src={`https://cdn.discordapp.com/avatars/${user.id}/${user?.avatar}.png`} alt="User Avatar"/>
			<p>{user.username}#{user.discriminator}</p>
		</StyledReportUser>
	);
};

export default ReportUserProfile;