import { useEffect, useState } from 'react';
import StatusCard from '@/features/cards/Status';
import { ILoanData } from '@/lib/interfaces';

interface StatusCardListProps {
  loans?: ILoanData[];
}

const StatusCardList = ({ loans }: StatusCardListProps) => {
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [approvedAmount, setApprovedAmount] = useState('0');
  const [pendingAmount, setPendingAmount] = useState('0');
  const [rejectedAmount, setRejectedAmount] = useState('0');

  useEffect(() => {
    const approvedLoans = loans?.filter((loan) => loan.status === 'APPROVED');
    const pendingLoans = loans?.filter((loan) => loan.status === 'PENDING');
    const rejectedLoans = loans?.filter((loan) => loan.status === 'REJECTED');

    setApprovedCount(approvedLoans ? approvedLoans.length : 0);
    setPendingCount(pendingLoans ? pendingLoans.length : 0);
    setRejectedCount(rejectedLoans ? rejectedLoans.length : 0);

    setApprovedAmount(approvedLoans ? approvedLoans.reduce((sum, loan) => sum + Number(loan.requestedamount), 0).toFixed(2) : '0');
    setPendingAmount(pendingLoans ? pendingLoans.reduce((sum, loan) => sum + Number(loan.requestedamount), 0).toFixed(2) : '0');
    setRejectedAmount(rejectedLoans ? rejectedLoans.reduce((sum, loan) => sum + Number(loan.requestedamount), 0).toFixed(2) : '0');
  }, [loans]);

  if (!loans) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatusCard label="APPROVED" count={approvedCount} amount={`$${approvedAmount}`} />
      <StatusCard label="PENDING" count={pendingCount} amount={`$${pendingAmount}`} />
      <StatusCard label="REJECTED" count={rejectedCount} amount={`$${rejectedAmount}`} />
    </div>
  );
};

export default StatusCardList;
