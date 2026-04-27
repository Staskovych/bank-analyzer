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
          <TableHead className="w-32">Дата</TableHead>
          <TableHead className="w-48">Контрагент</TableHead>
          <TableHead>Призначення</TableHead>
          <TableHead className="w-24">Тип</TableHead>
          <TableHead className="w-36 text-right">Сума</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t) => (
          <TableRow key={t.id}>
            <TableCell>{t.date}</TableCell>
            <TableCell>{t.counterparty}</TableCell>
            <TableCell>{t.description}</TableCell>
            <TableCell>
              <Badge variant={t.type === 'income' ? 'default' : 'destructive'}>
                {t.type === 'income' ? 'Дохід' : 'Витрата'}
              </Badge>
            </TableCell>
            <TableCell
              className={`text-right ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              {fmt(t.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
