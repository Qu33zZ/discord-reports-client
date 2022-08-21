import {Pagination, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {IReport} from "../interfaces/IReport";
import {TableCell} from "@mui/material";
import ReportUserProfile from "./report.user.profile";
import moment from "moment";
import ReportStatus from "./report.status";
import ReportInfoPopup from "./report.info.popup";
import Loader from "./loader";
import reportsService from "../api/services/reports.service";
import styled from "styled-components";
import {io} from "socket.io-client";
import newReportNotificationSound from "../assets/sounds/newReportNotification.mp3";
import {noop} from "mobx/dist/utils/utils";
const socket = io("http://localhost:3001");

export interface IGuildReportsProps{
	guild:string;
}

const StyledPagination = styled(Pagination)`
  	display: flex;
  	width: 100%;
  	justify-content: space-around;
`;

const GuildReportsField:React.FC<IGuildReportsProps> = ({guild, }) => {
	const [opened, setOpened] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [reports, setReports] = useState<IReport[]>([]);
	const [activeReport, setActiveReport] = useState<IReport | null>(null);
	const [page, setPage] = useState<number>(1);
	const [pagesCount, setPagesCount] = useState<number>(1);
	const notificationSound = new Audio(newReportNotificationSound);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	useEffect(() => {
		const fetchReports = async () =>{
			if(guild !== ""){
				const reportsResult = await reportsService.fetchReports(guild, page);
				console.log(reportsResult)
				setReports(reportsResult.reports);
				setPagesCount(reportsResult.pagesCount);
			}
		};
		setLoading(true);
		fetchReports().finally(() => {
			setLoading(false)
		});
	}, [guild, page])


	//receive new report using socket.io
	useEffect(() => {
		socket.on("report", (data) => {
			setReports(prevState => [data, ...prevState])
			notificationSound.play();
		});
	}, []);


	if(loading) return <Loader/>
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650}} aria-label="simple table" >
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell align="left">От</TableCell>
						<TableCell align="left">На</TableCell>
						<TableCell align="left">Причина</TableCell>
						<TableCell align="left">Модер</TableCell>
						<TableCell align="left">Создан</TableCell>
						<TableCell align="left">Статус</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{reports.map((report) => (
						<TableRow
							key={report.id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
							onClick={() => {setActiveReport(report); setOpened(true)}}
							style={{cursor:"pointer"}}
						>
							<TableCell component="th" scope="row">
								{report.id}
							</TableCell>
							<TableCell align="left">
								<ReportUserProfile user={report.fromUser}/>
							</TableCell>
							<TableCell align="left">
								<ReportUserProfile user={report.toUser}/>
							</TableCell>
							<TableCell align="left">{report.reason.length >= 85 ? report.reason.slice(0, 85)+"..." : report.reason}</TableCell>
							<TableCell align="left">{report.moderId || "---"}</TableCell>
							<TableCell align="left">{moment(report.createdAt).format("D/M/YYYY HH:mm")}</TableCell>
							<TableCell align="left"><ReportStatus status={report.status}/></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<StyledPagination page={page} count={pagesCount} variant="outlined" shape="rounded" onChange={handlePageChange}/>
			<ReportInfoPopup opened={opened} setOpened={setOpened} report={activeReport}/>
		</TableContainer>
	);
};

export default GuildReportsField;