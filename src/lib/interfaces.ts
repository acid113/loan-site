import { StatusType } from './types';

export interface ILoanData {
  id: string;
  applicantname: string;
  requestedamount: number;
  status: StatusType;
}

export interface ILoanDataUpdate {
  id: string;
  applicantname?: string;
  requestedamount?: number;
  status?: StatusType;
}
