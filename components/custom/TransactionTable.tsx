import type { Transaction } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Props {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: Props) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
    }).format(n);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Дата</TableHead>
          <TableHead>Контрагент</TableHead>
          <TableHead>Призначення</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Сума</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t, index) => (
          <TableRow key={index}>
            <TableCell>{t.date}</TableCell>
            <TableCell>{t.counterparty}</TableCell>
            <TableCell>{t.description}</TableCell>
            <TableCell>
              <Badge variant={t.type === 'income' ? 'default' : 'destructive'}>
                {t.type === 'income' ? 'Дохід' : 'Витрата'}
              </Badge>
            </TableCell>
            <TableCell
              className={
                t.type === 'income' ? 'text-green-600' : 'text-red-600'
              }>
              {fmt(t.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
