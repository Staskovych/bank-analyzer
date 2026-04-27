export interface Transaction {
  date: string;
  counterparty: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface ParseResult {
  transactions: Transaction[];
  skippedLines: number;
  reason: string[];
}

export interface Summary {
  totalIncome: number;
  totalExpense: number;
  netResult: number;
  count: number;
}

export interface CounterpartyStat {
  name: string;
  total: number;
}
