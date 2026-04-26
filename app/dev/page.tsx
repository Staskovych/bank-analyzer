'use client';
import { FileUploader } from '@/components/custom/FileUploader';
import { FilterBar } from '@/components/custom/FilterBar';
import { SummaryCards } from '@/components/custom/SummaryCards';
import { TransactionTable } from '@/components/custom/TransactionTable';
import { useStatement } from '@/hooks/useStatement';
import { calculateSummary } from '@/lib/statement';

export default function DevPage() {
  const {
    parseResult,
    filter,
    search,
    filteredTransactions,
    setData,
    setFilter,
    setSearch,
  } = useStatement();

  const summary = parseResult
    ? calculateSummary(parseResult.transactions)
    : null;

  return (
    <div className="p-8">
      {summary && <SummaryCards summary={summary} />}
      <FileUploader onParsed={setData} />
      <FilterBar
        filter={filter}
        search={search}
        onFilter={setFilter}
        onSearch={setSearch}
      />
      <TransactionTable transactions={filteredTransactions} />
    </div>
  );
}
