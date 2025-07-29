import StatusCardList from '@/features/cards/StatusCardList';
import LoanTable from '@/features/tables/LoanTable';

function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Status Cards */}
        <StatusCardList />

        {/* Loan Table */}
        <div className="bg-white rounded-lg">
          <LoanTable />
        </div>
      </div>
    </main>
  );
}

export default App;
