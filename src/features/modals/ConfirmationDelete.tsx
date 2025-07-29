import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  applicantName: string;
}

const ConfirmationDelete = ({ isOpen, onClose, onConfirm, applicantName }: ConfirmationDeleteProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirm Delete
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete the loan for <span className="font-semibold">{applicantName}</span>? This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="px-4 py-2 bg-transparent">
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white">
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDelete;
