import type { Summary } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props {
  summary: Summary;
}
export function SummaryCards({ summary }: Props) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
    }).format(n);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">Доходи</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">
            {fmt(summary.totalIncome)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">Витрати</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">
            {fmt(summary.totalExpense)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">
            Чистий результат
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-bold ${summary.netResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {fmt(summary.netResult)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">
            Кількісь транзакцій
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-gray-600">{summary.count}</p>
        </CardContent>
      </Card>
    </div>
  );
}
