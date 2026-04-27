import { CounterpartyStat } from '@/lib/types';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface Props {
  data: CounterpartyStat[];
}

export function TopCounterparties({ data }: Props) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
    }).format(n);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Топ-5 контрагентів за витратами</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{index + 1}.</span>
                <span>{item.name}</span>
              </div>
              <span className="text-red-600">{fmt(item.total)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
