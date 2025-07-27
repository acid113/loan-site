import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoanAddProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: {
    name: string;
    amount: string;
  };
}

const LoanAdd = ({ isOpen, onClose, mode, initialData }: LoanAddProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    amount: initialData?.amount || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim() || !formData.amount.trim()) {
      return;
    }

    // Handle form submission logic here
    console.log('Form submitted:', formData);

    // Reset form and close modal
    setFormData({ name: '', amount: '' });
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
          <DialogTitle className="text-xl font-semibold text-gray-900">{mode === 'add' ? 'Add New Loan' : 'Edit Loan'}</DialogTitle>
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

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="px-4 py-2 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white">
              {mode === 'add' ? 'Submit' : 'Update'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoanAdd;
