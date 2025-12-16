import { FileSpreadsheet } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="mx-auto w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="font-display text-xl font-semibold text-foreground mb-2">
        No Data Loaded Yet
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Upload a CSV file with your running data to see visualizations, statistics, 
        and insights about your training progress.
      </p>
    </div>
  );
}
