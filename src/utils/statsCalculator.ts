import { RunnerEntry, PersonStats, OverallStats, ChartDataPoint } from '@/types/runner';

export function calculateOverallStats(data: RunnerEntry[]): OverallStats {
  if (data.length === 0) {
    return {
      totalMiles: 0,
      averageMiles: 0,
      minMiles: 0,
      maxMiles: 0,
      totalRuns: 0,
      uniqueRunners: 0,
      dateRange: { start: '', end: '' }
    };
  }

  const miles = data.map(d => d.milesRun);
  const dates = data.map(d => d.date).sort();
  const uniqueRunners = new Set(data.map(d => d.person)).size;

  return {
    totalMiles: Math.round(miles.reduce((a, b) => a + b, 0) * 100) / 100,
    averageMiles: Math.round((miles.reduce((a, b) => a + b, 0) / miles.length) * 100) / 100,
    minMiles: Math.min(...miles),
    maxMiles: Math.max(...miles),
    totalRuns: data.length,
    uniqueRunners,
    dateRange: {
      start: dates[0],
      end: dates[dates.length - 1]
    }
  };
}

export function calculatePersonStats(data: RunnerEntry[]): PersonStats[] {
  const personMap = new Map<string, RunnerEntry[]>();

  for (const entry of data) {
    const existing = personMap.get(entry.person) || [];
    existing.push(entry);
    personMap.set(entry.person, existing);
  }

  const stats: PersonStats[] = [];

  for (const [name, entries] of personMap) {
    const miles = entries.map(e => e.milesRun);
    
    stats.push({
      name,
      totalMiles: Math.round(miles.reduce((a, b) => a + b, 0) * 100) / 100,
      averageMiles: Math.round((miles.reduce((a, b) => a + b, 0) / miles.length) * 100) / 100,
      minMiles: Math.min(...miles),
      maxMiles: Math.max(...miles),
      runCount: entries.length,
      entries: entries.sort((a, b) => a.date.localeCompare(b.date))
    });
  }

  return stats.sort((a, b) => b.totalMiles - a.totalMiles);
}

export function prepareChartData(data: RunnerEntry[]): ChartDataPoint[] {
  const dateMap = new Map<string, ChartDataPoint>();
  const persons = [...new Set(data.map(d => d.person))];

  // Initialize all dates with 0 for all persons
  for (const entry of data) {
    if (!dateMap.has(entry.date)) {
      const point: ChartDataPoint = { date: entry.date };
      for (const person of persons) {
        point[person] = 0;
      }
      dateMap.set(entry.date, point);
    }
  }

  // Fill in actual values
  for (const entry of data) {
    const point = dateMap.get(entry.date)!;
    point[entry.person] = entry.milesRun;
  }

  // Sort by date
  return Array.from(dateMap.values()).sort((a, b) => 
    a.date.localeCompare(b.date)
  );
}

export function prepareTotalByPersonData(personStats: PersonStats[]): { name: string; miles: number; fill: string }[] {
  const colors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ];

  return personStats.map((person, index) => ({
    name: person.name,
    miles: person.totalMiles,
    fill: colors[index % colors.length]
  }));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
}
