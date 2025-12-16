import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RunnerEntry } from '@/types/runner';
import { formatDate } from '@/utils/statsCalculator';

interface DataTableProps {
  data: RunnerEntry[];
  selectedPerson: string | null;
}

type SortField = 'date' | 'person' | 'milesRun';
type SortDirection = 'asc' | 'desc';

export function DataTable({ data, selectedPerson }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = selectedPerson 
      ? data.filter(d => d.person === selectedPerson)
      : data;

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = a.date.localeCompare(b.date);
          break;
        case 'person':
          comparison = a.person.localeCompare(b.person);
          break;
        case 'milesRun':
          comparison = a.milesRun - b.milesRun;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, selectedPerson, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1" />
      : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="font-display flex items-center justify-between">
          <span>Run Log</span>
          <span className="text-sm font-normal text-muted-foreground">
            {filteredAndSortedData.length} entries
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-semibold -ml-3"
                    onClick={() => handleSort('date')}
                  >
                    Date
                    <SortIcon field="date" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-semibold -ml-3"
                    onClick={() => handleSort('person')}
                  >
                    Runner
                    <SortIcon field="person" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-semibold -mr-3"
                    onClick={() => handleSort('milesRun')}
                  >
                    Miles
                    <SortIcon field="milesRun" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No data to display
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedData.map((entry, index) => (
                  <TableRow key={`${entry.date}-${entry.person}-${index}`} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
                      {formatDate(entry.date)}
                    </TableCell>
                    <TableCell>{entry.person}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {entry.milesRun.toFixed(2)} mi
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
