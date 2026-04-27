'use client';
import { FileUploader } from '@/components/custom/FileUploader';
import { FilterBar } from '@/components/custom/FilterBar';
import { SummaryCards } from '@/components/custom/SummaryCards';
import { TopCounterparties } from '@/components/custom/TopCounterparties';
import { TransactionTable } from '@/components/custom/TransactionTable';
import { useStatement } from '@/hooks/useStatement';
import { calculateSummary, getTop5Counterparties } from '@/lib/statement';
import { Button } from '@/components/ui/button';

export default function Home() {
  const {
    parseResult,
    filter,
    search,
    filteredTransactions,
    setData,
    setFilter,
    setSearch,
    reset,
  } = useStatement();

  const summary = parseResult
    ? calculateSummary(parseResult.transactions)
    : null;

  const top5 = parseResult
    ? getTop5Counterparties(parseResult.transactions)
    : [];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center">
        Аналізатор банківської виписки
      </h1>
      {parseResult && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={reset}>
            Завантажити інший файл
          </Button>
        </div>
      )}
      {summary && <SummaryCards summary={summary} />}
      {parseResult && parseResult.skippedLines > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 font-medium">
            Пропущено {parseResult.skippedLines} рядків
          </p>
          <ul className="mt-2 text-sm text-yellow-700">
            {parseResult.reason.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
      {!parseResult && <FileUploader onParsed={setData} />}
      {parseResult && (
        <>
          <FilterBar
            filter={filter}
            search={search}
            onFilter={setFilter}
            onSearch={setSearch}
          />
          <TransactionTable transactions={filteredTransactions} />
          <TopCounterparties data={top5} />
        </>
      )}
    </div>
  );
}
