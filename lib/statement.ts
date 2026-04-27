import { CounterpartyStat, Summary, Transaction } from './types';

export function calculateSummary(transactions: Transaction[]): Summary {
  let sumIncome = 0;
  let sumExpense = 0;

  transactions.forEach((element) => {
    if (element.type === 'income') {
      sumIncome += element.amount;
    } else {
      sumExpense += Math.abs(element.amount);
    }
  });

  return {
    totalIncome: sumIncome,
    totalExpense: sumExpense,
    netResult: sumIncome - sumExpense,
    count: transactions.length,
  };
}

export function getTop5Counterparties(
  transactions: Transaction[],
): CounterpartyStat[] {
  const expenseMap = new Map<string, number>();

  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    const current = expenseMap.get(t.counterparty) ?? 0;
    expenseMap.set(t.counterparty, current + Math.abs(t.amount));
  }

  return Array.from(expenseMap.entries())
    .map(([name, total]) => ({
      name,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}
