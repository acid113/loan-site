import { StatusType } from './types';

export interface ILoanData {
  id: string;
  applicantname: string;
  requestedamount: number;
  status: StatusType;
  // createdat: Date;
  // updatedat: Date;
}
