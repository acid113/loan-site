import axios from 'axios';
import { useEffect, useState } from 'react';
import { ILoanData } from '@/lib/interfaces';
import { MOCK_DATA } from '../mocks';

const BASE = import.meta.env.VITE_BASE_URL;

export const useLoans = (useMock: boolean = false) => {
  const [loans, setLoans] = useState<ILoanData[]>();

  useEffect(() => {
    if (useMock) {
      setLoans(MOCK_DATA);
      return;
    }

    const fetchLoans = async () => {
      try {
        const response = await axios.get(`${BASE}/loans`);
        const responseData = await response.data;
        setLoans(responseData.data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  return {
    loans,
  };
};
