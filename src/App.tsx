import { useNavigate } from 'react-router';
import LoginForm from '@/features/login/LoginForm';

function App() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </main>
  );
}

export default App;
