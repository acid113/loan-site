import LoanTable from '@/features/tables/LoanTable';
import StatusCard from '@/features/cards/Status';

function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard label="approved" count={6} amount="$245.84" />
          <StatusCard label="pending" count={2} amount="$85.30" />
          <StatusCard label="rejected" count={2} amount="$18.90" />
        </div>

        {/* Loan Table */}
        <div className="bg-white rounded-lg">
          <LoanTable />
        </div>
      </div>
    </main>
  );
}

export default App;
