import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ILoanData, ILoanDataUpdate } from '@/lib/interfaces';
import { MOCK_DATA } from '../mocks';

const BASE = import.meta.env.VITE_BASE_URL;

export const useLoans = (useMock: boolean = false) => {
  const [loans, setLoans] = useState<ILoanData[]>();

  const fetchLoans = async () => {
    if (useMock) {
      setLoans(MOCK_DATA);
      return;
    }

    const response = await axios.get(`${BASE}/loans`);
    if (response.status !== StatusCodes.OK) {
      throw new Error('Failed to fetch loans');
    }

    const responseData = await response.data;
    setLoans(responseData.data);
  };

  const addLoan = async (name: string, amount: number) => {
    const response = await axios.post(`${BASE}/loans`, {
      applicantName: name,
      requestedAmount: amount,
    });

    if (response.status !== StatusCodes.CREATED) {
      throw new Error('Failed to create loan');
    }

    const newLoan = response.data.data;
    console.log('New loan:', newLoan);
  };

  const updateLoan = async (data: ILoanDataUpdate) => {
    const response = await axios.put(`${BASE}/loans/${data.id}`, {
      applicantName: data.applicantname,
      requestedAmount: data.requestedamount,
      status: data.status,
    });

    if (response.status !== StatusCodes.ACCEPTED) {
      throw new Error('Failed to update loan');
    }
    const updatedLoan = response.data.data;
    console.log('Updated loan:', updatedLoan);
  };

  const deleteLoan = async (id: string) => {
    const response = await axios.delete(`${BASE}/loans/${id}`);
    if (response.status !== StatusCodes.ACCEPTED) {
      throw new Error('Failed to delete loan');
    }
    console.log('Loan deleted');
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return {
    loans,
    addLoan,
    deleteLoan,
    fetchLoans,
    updateLoan,
  };
};
