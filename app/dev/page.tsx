'use client';
import { FileUploader } from '@/components/custom/FileUploader';
import { FilterBar } from '@/components/custom/FilterBar';
import { SummaryCards } from '@/components/custom/SummaryCards';
import { TransactionTable } from '@/components/custom/TransactionTable';

const mockSummary = {
  totalIncome: 100000,
  totalExpense: 50000,
  netResult: 50000,
  count: 10,
};

const mockTransactions = [
  {
    date: '2025-01-03',
    counterparty: 'ТОВ Альфа',
    description: 'Оплата за послуги',
    amount: 18500,
    type: 'income' as const,
  },
  {
    date: '2025-01-04',
    counterparty: 'Сільпо',
    description: 'Продукти',
    amount: -2213,
    type: 'expense' as const,
  },
];

export default function devPage() {
  return (
    <div className="p-8">
      <SummaryCards summary={mockSummary} />
      <FileUploader onParsed={(res) => console.log(res)} />
      <FilterBar
        filter="all"
        search=""
        onFilter={(value) => console.log(value)}
        onSearch={(value) => console.log(value)}
      />
      <TransactionTable transactions={mockTransactions} />
    </div>
  );
}
