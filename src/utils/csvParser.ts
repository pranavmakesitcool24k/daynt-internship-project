import { RunnerEntry, ParsedCSVResult } from '@/types/runner';

const REQUIRED_HEADERS = ['date', 'person', 'miles run'];
const HEADER_VARIATIONS: Record<string, string[]> = {
  'date': ['date', 'run_date', 'rundate', 'day'],
  'person': ['person', 'name', 'runner', 'athlete'],
  'miles run': ['miles run', 'miles_run', 'milesrun', 'miles', 'distance']
};

function normalizeHeader(header: string): string {
  const normalized = header.toLowerCase().trim();
  
  for (const [standard, variations] of Object.entries(HEADER_VARIATIONS)) {
    if (variations.includes(normalized)) {
      return standard;
    }
  }
  return normalized;
}

function parseDate(dateStr: string): string | null {
  const trimmed = dateStr.trim();
  
  // Try various date formats
  const formats = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
    /^\d{1,2}\/\d{1,2}\/\d{4}$/, // M/D/YYYY
  ];
  
  for (const format of formats) {
    if (format.test(trimmed)) {
      const date = new Date(trimmed);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    }
  }
  
  // Try parsing as-is
  const date = new Date(trimmed);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  
  return null;
}

function parseMiles(milesStr: string): number | null {
  const trimmed = milesStr.trim().replace(/[^\d.-]/g, '');
  const miles = parseFloat(trimmed);
  
  if (isNaN(miles) || miles < 0) {
    return null;
  }
  
  return Math.round(miles * 100) / 100; // Round to 2 decimal places
}

export function parseCSV(csvContent: string): ParsedCSVResult {
  const errors: string[] = [];
  const data: RunnerEntry[] = [];
  
  // Split content into lines and filter empty lines
  const lines = csvContent
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  if (lines.length === 0) {
    return {
      data: [],
      errors: ['CSV file is empty'],
      isValid: false
    };
  }
  
  // Parse headers
  const headerLine = lines[0];
  const headers = headerLine.split(',').map(h => normalizeHeader(h));
  
  // Validate required headers
  const missingHeaders: string[] = [];
  for (const required of REQUIRED_HEADERS) {
    if (!headers.includes(required)) {
      missingHeaders.push(required);
    }
  }
  
  if (missingHeaders.length > 0) {
    return {
      data: [],
      errors: [`Missing required columns: ${missingHeaders.join(', ')}. Expected columns: date, person, miles run`],
      isValid: false
    };
  }
  
  // Get column indices
  const dateIndex = headers.indexOf('date');
  const personIndex = headers.indexOf('person');
  const milesIndex = headers.indexOf('miles run');
  
  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const rowNumber = i + 1;
    
    // Handle CSV parsing with potential commas in values
    const values = parseCSVLine(line);
    
    if (values.length < Math.max(dateIndex, personIndex, milesIndex) + 1) {
      errors.push(`Row ${rowNumber}: Incomplete data - expected at least ${headers.length} columns`);
      continue;
    }
    
    const dateStr = values[dateIndex];
    const personStr = values[personIndex];
    const milesStr = values[milesIndex];
    
    // Validate date
    const parsedDate = parseDate(dateStr);
    if (!parsedDate) {
      errors.push(`Row ${rowNumber}: Invalid date format "${dateStr}"`);
      continue;
    }
    
    // Validate person name
    const personName = personStr.trim();
    if (!personName) {
      errors.push(`Row ${rowNumber}: Person name cannot be empty`);
      continue;
    }
    
    // Validate miles
    const parsedMiles = parseMiles(milesStr);
    if (parsedMiles === null) {
      errors.push(`Row ${rowNumber}: Invalid miles value "${milesStr}"`);
      continue;
    }
    
    data.push({
      date: parsedDate,
      person: personName,
      milesRun: parsedMiles
    });
  }
  
  if (data.length === 0 && errors.length === 0) {
    errors.push('No valid data rows found in CSV');
  }
  
  return {
    data,
    errors,
    isValid: errors.length === 0 && data.length > 0
  };
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

export function generateSampleCSV(): string {
  return `date,person,miles run
2024-01-01,Alice,3.5
2024-01-01,Bob,4.2
2024-01-02,Alice,2.8
2024-01-02,Bob,5.1
2024-01-02,Charlie,3.0
2024-01-03,Alice,4.0
2024-01-03,Charlie,2.5
2024-01-04,Bob,6.0
2024-01-04,Charlie,3.8
2024-01-05,Alice,5.2
2024-01-05,Bob,4.5
2024-01-05,Charlie,4.1`;
}
