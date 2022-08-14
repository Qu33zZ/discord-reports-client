import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material';
import React, {useRef} from 'react';
import {IGuild} from "../interfaces/IGuild";
import {IReport} from "../interfaces/IReport";
import {TableCell} from "@mui/material";
import ReportUserProfile from "./report.user.profile";
import moment from "moment";
import Popup from "./popup/popup";

export interface IGuildReportsProps{
	guild:string;
	reports:IReport[];
}

const GuildReportsField:React.FC<IGuildReportsProps> = ({guild, reports}) => {
	const opened = useRef<boolean>(false);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
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
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
							<TableCell align="left">{report.reason}</TableCell>
							<TableCell align="left">{report.moderId || "---"}</TableCell>
							<TableCell align="left">{moment(report.createdAt).format("D/M/YYYY HH:mm")}</TableCell>
							<TableCell align="left">{report.status}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Popup openedRef={opened}>
				Pop up
			</Popup>
		</TableContainer>
	);
};

export default GuildReportsField;