import React from 'react';
import styled from "styled-components";
import Popup from "./popup/popup";
import {IReport, reportStatusType} from "../interfaces/IReport";
import ReportUserProfile from "./report.user.profile";
import ReportStatus from "./report.status";
import Button from "./button";
import reportsService from "../api/services/reports.service";
import {toast} from "react-toastify";

const StyledReportTitle = styled.div`
  	display: flex;
  	flex-direction: row;
  	align-items: center;
  	justify-content: space-between;
	color: white;
  	font-size: 18px;
  	font-weight: bold;
  
  	@media screen and (max-width: 768px){
	  flex-direction: column;
	  align-items: flex-start;
	  & div{
	    margin-top: 10px;
	  }
    }
`;

interface IReportInfoPopupProps{
	opened:boolean,
	setOpened:React.Dispatch<React.SetStateAction<boolean>>;
	// children:React.ReactNode | React.ReactNode[];
	report:IReport | null
}

const ReportInfoContainer = styled.div`
	display: grid;
  	grid-gap: 20px;
  	grid-template-columns: repeat(1fr, 2);
  	grid-template-rows: repeat(1fr, 3);
  	width: 100%;
  	
  	margin-top: 5%;
  	color: white;
`;

const StyledFromUserField = styled.div`
	display: flex;
  	flex-direction: column;

  	grid-row: 1;
  	grid-column: 1;

`;

const StyledToUserField = styled.div`
	display: flex;
  	flex-direction: column;
  	grid-row: 1;
  	grid-column: 2;

`;

const StyledModerField = styled.div`
  	display: flex;
  	flex-direction: column;
  	grid-row: 2;
  	grid-column: 1;
`;
const StyledReasonField = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 3;
  grid-column-start: 1;
  grid-column-end: 3;

`;

const StyledFieldTitle = styled.p`
	font-size: 18px;
  	font-weight: 500;
  	color: white;

  	@media screen and (max-width: 768px){
    	font-size: 16px;
  	}
`;

const StyledFieldValue = styled.p`
  margin-top: 10px;
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255,255,255, 0.7);

  @media screen and (max-width: 768px){  
    font-size: 14px;
	margin-left: 0;
  }
`;

const StyledUserProfile = styled(ReportUserProfile)`
	& p{
	  color: rgba(255,255,255, 0.9);
    }
`;

const ButtonsLayout = styled.div`
  	margin-left: auto;
	display: flex;
  	align-items: center;
  	justify-content: space-between;
`;
const ReportInfoPopup:React.FC<IReportInfoPopupProps> = ({opened, setOpened, report}) => {
	if(!report) return (
		<Popup setOpened={setOpened} opened={opened}>
			<StyledReportTitle>Не удалось загрузить репорт</StyledReportTitle>
		</Popup>
	);

	const updateReportStatus = async (status:reportStatusType) => {
		if(!report) return toast("Репорт не найден", {type:"success", containerId:"main-container"});
		const updatedReport = await reportsService.updateReportStatus(report.id, status, report.guild);
		if(updatedReport) report = {...report, ...updatedReport} as IReport;
	}


	return (
		<Popup setOpened={setOpened} opened={opened}>
			<StyledReportTitle>Репорт --- #{report.id} <ReportStatus status={report.status}/></StyledReportTitle>
			<ReportInfoContainer>
				<StyledFromUserField>
					<StyledFieldTitle>От пользователя:</StyledFieldTitle>
					<StyledFieldValue>
						<StyledUserProfile user={report.fromUser} notificationsContainerId={"pop-up-container"}/>
					</StyledFieldValue>
				</StyledFromUserField>
				<StyledToUserField>
					<StyledFieldTitle>На пользователя:</StyledFieldTitle>
					<StyledFieldValue>
						<StyledUserProfile user={report.toUser} notificationsContainerId={"pop-up-container"}/>
					</StyledFieldValue>
				</StyledToUserField>
				<StyledModerField>
					<StyledFieldTitle>Модератор:</StyledFieldTitle>
					<StyledFieldValue>
						{report.moderId || "---"}
					</StyledFieldValue>
				</StyledModerField>
				<StyledReasonField>
					<StyledFieldTitle>Причина:</StyledFieldTitle>
					<StyledFieldValue>
						{report.reason}
					</StyledFieldValue>
				</StyledReasonField>
			</ReportInfoContainer>
			<ButtonsLayout>
				{
					report.status === "CREATED" && <Button type={"TAKE"} clickAction={() => updateReportStatus("PENDING")}/>
				}

				{
					report.status === "PENDING" && [<Button type={"ACCEPT"} clickAction={() => updateReportStatus("ACCEPTED")}/>,  <Button type={"REJECT"} clickAction={() => updateReportStatus("REJECTED")}/>]
				}
			</ButtonsLayout>
		</Popup>
	);
};

export default ReportInfoPopup;