import { describe, it, expect } from 'vitest';
import { calculateSummary, getTop5Counterparties } from '@/lib/statement';
import type { Transaction } from '@/lib/types';

const mockTransactions: Transaction[] = [
  {
    date: '2025-01-21',
    counterparty: 'Приватбанк',
    description: 'Оплата за послуги',
    amount: 18200,
    type: 'income',
  },
  {
    date: '2025-04-10',
    counterparty: 'ТОВ Альфа',
    description: 'Оплата за послуги',
    amount: 18110,
    type: 'income',
  },
  {
    date: '2025-03-09',
    counterparty: 'Ашан',
    description: 'Оплата за товари',
    amount: -53368,
    type: 'expense',
  },
  {
    date: '2025-09-02',
    counterparty: 'Сільпо',
    description: 'Оплата за товари',
    amount: -13410,
    type: 'expense',
  },
];

describe('calculateSummary', () => {
  it('правильно рахує доходи і витрати', () => {
    const result = calculateSummary(mockTransactions);
    expect(result.totalIncome).toBe(36310);
    expect(result.totalExpense).toBe(66778);
    expect(result.netResult).toBe(36310 - 66778);
    expect(result.count).toBe(4);
  });
});

describe('getTop5Counterparties', () => {
  it('правильно рахує топ 5 контрагентів за витратами', () => {
    const result = getTop5Counterparties(mockTransactions);
    expect(result[0].name).toBe('Ашан');
    expect(result[0].total).toBe(53368);
    expect(result[1].name).toBe('Сільпо');
    expect(result[1].total).toBe(13410);
  });
});
