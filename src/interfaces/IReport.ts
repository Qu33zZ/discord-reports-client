import {IUser} from "./IUser";

export type reportStatusType = "CREATED" | "PENDING" | "ACCEPTED" | "REJECTED";

export interface IReport{
	id:string;
	guild:string;

	fromUser:IUser | string;
	toUser:IUser | string;

	moderId:string;

	reason:string;
	status:reportStatusType;
	createdAt:Date;

	files:any[];
}