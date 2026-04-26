import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  filter: 'all' | 'income' | 'expense';
  search: string;
  onFilter: (value: 'all' | 'income' | 'expense') => void;
  onSearch: (value: string) => void;
}

export function FilterBar({ filter, search, onFilter, onSearch }: Props) {
  function handleFilter(value: string | null) {
    if (value === 'all' || value === 'income' || value === 'expense') {
      onFilter(value);
    }
  }

  return (
    <div className="flex gap-4">
      <Select value={filter} onValueChange={handleFilter}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Усі</SelectItem>
          <SelectItem value="income">Доходи</SelectItem>
          <SelectItem value="expense">Витрати</SelectItem>
        </SelectContent>
      </Select>
      <Input
        className="max-w-md"
        placeholder="Пошук по контрагенту"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
