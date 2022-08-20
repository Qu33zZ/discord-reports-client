import React from 'react';
import styled from "styled-components";
import {IUser} from "../interfaces/IUser";
import {toast} from "react-toastify";

const StyledReportUser = styled.div`
	display: flex;
  	width: fit-content;
  	align-items: center;
  	cursor: pointer;
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
  	
  & div{
    margin-right: 5px;
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
	notificationsContainerId?:string;
};

const ReportUserProfile:React.FC<IReportUserProfileProps> = ({user, notificationsContainerId="main-container"}) => {

	const copyUserId = async (e:React.MouseEvent<HTMLDivElement>) =>{
		e.stopPropagation();
		await navigator.clipboard.writeText(typeof user === "string" ? user : (user as IUser).id)
		toast("Айди пользоваетля скопировано", {type:"success", toastId:"user-id-to-clipboard", containerId:notificationsContainerId});
	};
	if(typeof user === "string"){
		return (
			<StyledReportUser onClick={copyUserId}>
				<StyledUserIconNotFound>?</StyledUserIconNotFound>
				<p>${user}</p>
			</StyledReportUser>
		);
	}
	return (
		<StyledReportUser onClick={copyUserId}>
			{
				user.avatar
					? <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user?.avatar}.png`} alt="User Avatar"/>
					: <StyledUserIconNotFound>?</StyledUserIconNotFound>
			}
			<p>{user.username}#{user.discriminator}</p>
		</StyledReportUser>
	);
};

export default ReportUserProfile;