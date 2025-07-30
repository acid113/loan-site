import StatusCardList from '@/features/cards/StatusCardList';
import LoanTable from '@/features/tables/LoanTable';
import { useLoans } from '@/lib/hooks/useLoans';
import { ILoanDataUpdate } from '@/lib/interfaces';

const Dashboard = () => {
  // * update param to use mock data for testing purposes
  const { loans, addLoan, deleteLoan, fetchLoans, updateLoan } = useLoans(false);

  const handleAddNewLoan = async (name: string, amount: number) => {
    await addLoan(name, amount);
    await fetchLoans();
  };

  const handleEditLoan = async (data: ILoanDataUpdate) => {
    await updateLoan(data);
    await fetchLoans();
  };

  const handleDeleteLoan = async (id: string) => {
    await deleteLoan(id);
    await fetchLoans();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Status Cards */}
        <StatusCardList loans={loans} />

        {/* Loan Table */}
        <div className="bg-white rounded-lg">
          <LoanTable loans={loans} onLoanAdded={handleAddNewLoan} onLoanUpdated={handleEditLoan} onLoanDeleted={handleDeleteLoan} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
