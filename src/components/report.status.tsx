import React from 'react';
import styled from "styled-components";
import {reportStatusType} from "../interfaces/IReport";

type ReportStatusType = "CREATED" | "PENDING" | "ACCEPTED" | "REJECTED";

const ReportStatusSettings = {
	"CREATED":{
		title:"СОЗДАН",
		color:"#2dccff"
	},
	"PENDING": {
		title:"РАССМАТРИВАЕТСЯ",
		color:"#fce83a"
	},
	"ACCEPTED": {
		title:"ПОДТВЕРЖДЕН",
		color:"#56f000"
	},
	"REJECTED": {
		title:"ОТКЛОНЕН",
		color:"#ff3838"
	},
};

const StyledStatus = styled.div`
	display: flex;
  	align-items: center;
  	justify-content: space-around;
  
	//width: 80px;
  	height: 30px;
  
  	border-radius: 7px;
  	padding: 0 10px 0 10px;
  	
  	color: white;
  	background-color: ${({status}:{status:reportStatusType}) => ReportStatusSettings[status].color};
`;

interface IReportStatusProps{
	status:reportStatusType
};

const ReportStatus:React.FC<IReportStatusProps> = ({status}) => {
	return (
		<StyledStatus status={status}>
			<p>{ReportStatusSettings[status].title}</p>
		</StyledStatus>
	);
};

export default ReportStatus;