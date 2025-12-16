import { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { parseCSV, generateSampleCSV } from '@/utils/csvParser';
import { ParsedCSVResult } from '@/types/runner';

interface FileUploadProps {
  onDataParsed: (result: ParsedCSVResult) => void;
  hasData: boolean;
}

export function FileUpload({ onDataParsed, hasData }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parseErrors, setParseErrors] = useState<string[]>([]);

  const processFile = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setParseErrors(['Please upload a CSV file']);
      return;
    }

    setFileName(file.name);
    setParseErrors([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const result = parseCSV(content);
      
      if (result.errors.length > 0) {
        setParseErrors(result.errors);
      }
      
      onDataParsed(result);
    };
    reader.readAsText(file);
  }, [onDataParsed]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const downloadSample = useCallback(() => {
    const csv = generateSampleCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_runner_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const loadSampleData = useCallback(() => {
    const csv = generateSampleCSV();
    const result = parseCSV(csv);
    setFileName('sample_runner_data.csv');
    setParseErrors([]);
    onDataParsed(result);
  }, [onDataParsed]);

  return (
    <div className="space-y-4">
      <Card
        className={`relative border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging 
            ? 'border-accent bg-accent/5 drop-zone-active' 
            : hasData 
              ? 'border-success/50 bg-success/5' 
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="p-8 text-center">
          <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
            hasData 
              ? 'bg-success/10' 
              : isDragging 
                ? 'bg-accent/10' 
                : 'bg-primary/10'
          }`}>
            {hasData ? (
              <FileText className="h-8 w-8 text-success" />
            ) : (
              <Upload className={`h-8 w-8 ${isDragging ? 'text-accent' : 'text-primary'}`} />
            )}
          </div>
          
          {hasData && fileName ? (
            <div>
              <p className="font-display font-semibold text-foreground mb-1">
                {fileName}
              </p>
              <p className="text-sm text-muted-foreground">
                Drop a new file or click to replace
              </p>
            </div>
          ) : (
            <div>
              <p className="font-display font-semibold text-foreground mb-1">
                {isDragging ? 'Drop your CSV here' : 'Upload your CSV file'}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to browse
              </p>
            </div>
          )}
        </div>
      </Card>

      {parseErrors.length > 0 && (
        <Alert variant="destructive" className="animate-scale-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {parseErrors.slice(0, 5).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
              {parseErrors.length > 5 && (
                <li className="text-muted-foreground">
                  ...and {parseErrors.length - 5} more errors
                </li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={downloadSample}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download Sample CSV
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={loadSampleData}
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          Load Sample Data
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
        <p className="font-medium mb-2">Expected CSV Format:</p>
        <code className="bg-background px-2 py-1 rounded text-xs font-mono">
          date, person, miles run
        </code>
        <p className="mt-2 text-xs">
          Dates can be in YYYY-MM-DD or MM/DD/YYYY format
        </p>
      </div>
    </div>
  );
}
