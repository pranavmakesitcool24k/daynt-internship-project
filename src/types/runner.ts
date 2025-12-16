export interface RunnerEntry {
  date: string;
  person: string;
  milesRun: number;
}

export interface ParsedCSVResult {
  data: RunnerEntry[];
  errors: string[];
  isValid: boolean;
}

export interface PersonStats {
  name: string;
  totalMiles: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
  runCount: number;
  entries: RunnerEntry[];
}

export interface OverallStats {
  totalMiles: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
  totalRuns: number;
  uniqueRunners: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}
