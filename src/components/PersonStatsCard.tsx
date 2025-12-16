import { TrendingUp, Target, Award, Zap, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonStats } from '@/types/runner';

interface PersonStatsCardProps {
  person: PersonStats;
  rank: number;
}

export function PersonStatsCard({ person, rank }: PersonStatsCardProps) {
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950';
      case 2:
        return 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800';
      case 3:
        return 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="animate-scale-in hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-lg flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankStyle(rank)}`}>
              {rank}
            </span>
            {person.name}
          </CardTitle>
          <div className="flex items-center gap-1 text-primary">
            <TrendingUp className="h-4 w-4" />
            <span className="font-bold">{person.totalMiles.toFixed(1)} mi</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-accent/10">
              <Target className="h-3.5 w-3.5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Average</p>
              <p className="font-semibold text-sm">{person.averageMiles.toFixed(2)} mi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-success/10">
              <Award className="h-3.5 w-3.5 text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Best</p>
              <p className="font-semibold text-sm">{person.maxMiles.toFixed(1)} mi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-warning/10">
              <Zap className="h-3.5 w-3.5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Shortest</p>
              <p className="font-semibold text-sm">{person.minMiles.toFixed(1)} mi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-chart-4/10">
              <Calendar className="h-3.5 w-3.5 text-chart-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Runs</p>
              <p className="font-semibold text-sm">{person.runCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
