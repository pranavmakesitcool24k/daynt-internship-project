import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileUpload } from '@/components/FileUpload';
import { StatsCards } from '@/components/StatsCards';
import { PersonSelector } from '@/components/PersonSelector';
import { PersonStatsCard } from '@/components/PersonStatsCard';
import { RunningChart } from '@/components/RunningChart';
import { TotalMilesChart } from '@/components/TotalMilesChart';
import { DataTable } from '@/components/DataTable';
import { EmptyState } from '@/components/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParsedCSVResult, RunnerEntry } from '@/types/runner';
import { 
  calculateOverallStats, 
  calculatePersonStats, 
  prepareChartData 
} from '@/utils/statsCalculator';
import { BarChart3, LineChart, Table } from 'lucide-react';

export default function Index() {
  const [data, setData] = useState<RunnerEntry[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const handleDataParsed = (result: ParsedCSVResult) => {
    setData(result.data);
    setSelectedPerson(null);
  };

  const overallStats = useMemo(() => {
    const filteredData = selectedPerson 
      ? data.filter(d => d.person === selectedPerson)
      : data;
    return calculateOverallStats(filteredData);
  }, [data, selectedPerson]);

  const personStats = useMemo(() => calculatePersonStats(data), [data]);
  const chartData = useMemo(() => prepareChartData(data), [data]);

  const hasData = data.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* File Upload Section */}
          <section className="max-w-xl mx-auto">
            <FileUpload onDataParsed={handleDataParsed} hasData={hasData} />
          </section>

          {/* Main Content */}
          {!hasData ? (
            <EmptyState />
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Person Filter */}
              <section>
                <PersonSelector 
                  persons={personStats}
                  selectedPerson={selectedPerson}
                  onSelectPerson={setSelectedPerson}
                />
              </section>

              {/* Stats Cards */}
              <section>
                <StatsCards stats={overallStats} />
              </section>

              {/* Tabbed Content */}
              <Tabs defaultValue="charts" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                  <TabsTrigger value="charts" className="gap-2">
                    <LineChart className="h-4 w-4" />
                    <span className="hidden sm:inline">Progress</span>
                  </TabsTrigger>
                  <TabsTrigger value="comparison" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Comparison</span>
                  </TabsTrigger>
                  <TabsTrigger value="table" className="gap-2">
                    <Table className="h-4 w-4" />
                    <span className="hidden sm:inline">Log</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="charts" className="mt-6 space-y-6">
                  <RunningChart 
                    chartData={chartData}
                    persons={personStats}
                    selectedPerson={selectedPerson}
                  />
                </TabsContent>

                <TabsContent value="comparison" className="mt-6 space-y-6">
                  <TotalMilesChart personStats={personStats} />
                  
                  <div>
                    <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                      Runner Leaderboard
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {personStats.map((person, index) => (
                        <PersonStatsCard 
                          key={person.name} 
                          person={person} 
                          rank={index + 1}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="table" className="mt-6">
                  <DataTable data={data} selectedPerson={selectedPerson} />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
