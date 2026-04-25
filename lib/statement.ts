import { Summary, Transaction } from './types';

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
