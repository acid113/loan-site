import StatusCardList from '@/features/cards/StatusCardList';
import LoanTable from '@/features/tables/LoanTable';
import { useLoans } from '@/lib/hooks/useLoans';

function App() {
  // * update param to use mock data for testing purposes
  const { loans } = useLoans(false);
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Status Cards */}
        <StatusCardList loans={loans} />

        {/* Loan Table */}
        <div className="bg-white rounded-lg">
          <LoanTable loans={loans} />
        </div>
      </div>
    </main>
  );
}

export default App;
