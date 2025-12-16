import { TrendingUp, Users, Calendar, Zap, Target, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { OverallStats } from '@/types/runner';
import { formatDate } from '@/utils/statsCalculator';

interface StatsCardsProps {
  stats: OverallStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Total Miles',
      value: stats.totalMiles.toFixed(1),
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      delay: 'stagger-1'
    },
    {
      label: 'Average per Run',
      value: stats.averageMiles.toFixed(2),
      suffix: 'mi',
      icon: Target,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      delay: 'stagger-2'
    },
    {
      label: 'Best Run',
      value: stats.maxMiles.toFixed(1),
      suffix: 'mi',
      icon: Award,
      color: 'text-success',
      bgColor: 'bg-success/10',
      delay: 'stagger-3'
    },
    {
      label: 'Shortest Run',
      value: stats.minMiles.toFixed(1),
      suffix: 'mi',
      icon: Zap,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      delay: 'stagger-4'
    },
    {
      label: 'Total Runs',
      value: stats.totalRuns.toString(),
      icon: Calendar,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
      delay: 'stagger-1'
    },
    {
      label: 'Runners',
      value: stats.uniqueRunners.toString(),
      icon: Users,
      color: 'text-chart-5',
      bgColor: 'bg-chart-5/10',
      delay: 'stagger-2'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Overall Statistics
        </h2>
        {stats.dateRange.start && (
          <span className="text-sm text-muted-foreground">
            {formatDate(stats.dateRange.start)} - {formatDate(stats.dateRange.end)}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <Card 
            key={card.label} 
            className={`animate-slide-up opacity-0 ${card.delay} hover:shadow-card-hover transition-shadow`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">
                  {card.value}
                  {card.suffix && (
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {card.suffix}
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
