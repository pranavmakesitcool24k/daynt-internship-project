import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint, PersonStats } from '@/types/runner';
import { formatDate } from '@/utils/statsCalculator';

interface RunningChartProps {
  chartData: ChartDataPoint[];
  persons: PersonStats[];
  selectedPerson: string | null;
}

const CHART_COLORS = [
  'hsl(173, 58%, 26%)',
  'hsl(24, 95%, 53%)',
  'hsl(142, 71%, 45%)',
  'hsl(199, 89%, 48%)',
  'hsl(262, 83%, 58%)',
];

export function RunningChart({ chartData, persons, selectedPerson }: RunningChartProps) {
  const filteredPersons = useMemo(() => {
    if (selectedPerson) {
      return persons.filter(p => p.name === selectedPerson);
    }
    return persons;
  }, [persons, selectedPerson]);

  const formattedData = useMemo(() => {
    return chartData.map(point => ({
      ...point,
      dateLabel: formatDate(point.date)
    }));
  }, [chartData]);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="font-display">
          Running Progress Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="dateLabel" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
                label={{ 
                  value: 'Miles', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'hsl(var(--muted-foreground))' }
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  fontSize: '14px'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              {filteredPersons.map((person, index) => (
                <Line
                  key={person.name}
                  type="monotone"
                  dataKey={person.name}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
