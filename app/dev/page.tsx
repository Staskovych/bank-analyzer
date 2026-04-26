'use client';
import { FileUploader } from '@/components/custom/FileUploader';
import { SummaryCards } from '@/components/custom/SummaryCards';

const mockSummary = {
  totalIncome: 100000,
  totalExpense: 50000,
  netResult: 50000,
  count: 10,
};

export default function devPage() {
  return (
    <div className="p-8">
      <SummaryCards summary={mockSummary} />
      <FileUploader onParsed={(res) => console.log(res)} />
    </div>
  );
}
