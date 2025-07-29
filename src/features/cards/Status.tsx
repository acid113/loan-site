import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatusCardProps {
  label: string;
  count: number;
  amount: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    case 'PENDING':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    case 'REJECTED':
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
  }
};

const StatusCard = ({ label, count, amount }: StatusCardProps) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">{count}</span>
            <Badge className={getStatusColor(label)}>{label}</Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-bold text-gray-900">{amount}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
