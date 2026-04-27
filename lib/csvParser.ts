import * as z from 'zod';
import Papa from 'papaparse';
import type { ParseResult, Transaction } from './types';

const parserSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  counterparty: z.string().min(1),
  description: z.string().min(1),
  amount: z.coerce.number(),
});

export function parseCSV(text: string): ParseResult {
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  const transactions: Transaction[] = [];
  const errors: string[] = [];

  parsed.data.forEach((row, index) => {
    const result = parserSchema.safeParse(row);

    if (result.success === true) {
      const { date, counterparty, description, amount } = result.data;
      transactions.push({
        id: index + 1,
        date,
        counterparty,
        description,
        amount,
        type: amount > 0 ? 'income' : 'expense',
      });
    } else {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(', ');
      errors.push(message);
    }
  });

  return {
    transactions,
    skippedLines: errors.length,
    reason: errors,
  };
}
