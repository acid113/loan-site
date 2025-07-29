import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ILoanDataUpdate } from '@/lib/interfaces';
import { StatusType } from '@/lib/types';

interface LoanEditProps {
  isOpen: boolean;
  initialData: {
    id: string;
    name: string;
    amount: number;
    status: StatusType;
  };
  onClose: () => void;
  onSubmit?: (data: ILoanDataUpdate) => void;
}

const LoanEdit = ({ initialData, isOpen, onClose, onSubmit }: LoanEditProps) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    amount: initialData?.amount || '',
    status: initialData?.status || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim() || !formData.amount || !formData.status) {
      return;
    }

    // Handle form submission logic here
    if (onSubmit) {
      onSubmit({
        id: formData.id,
        applicantname: formData.name,
        requestedamount: Number(formData.amount),
        status: formData.status,
      });
    }
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Edit Loan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="applicant-name" className="text-sm font-medium text-gray-900">
              Applicant name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="applicant-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loan-amount" className="text-sm font-medium text-gray-900">
              Loan Amount <span className="text-red-500">*</span>
            </Label>
            <Input
              id="loan-amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-gray-900">
              Status <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="APPROVED">APPROVED</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="REJECTED">REJECTED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="px-4 py-2 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white">
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoanEdit;
