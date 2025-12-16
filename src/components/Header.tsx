import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="gradient-primary p-2.5 rounded-xl shadow-card">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground tracking-tight">
                CSV Runner Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Track and analyze running data
              </p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs text-muted-foreground">Built by</p>
            <p className="font-display font-semibold text-foreground">Pranav Pardeshi</p>
          </div>
        </div>
      </div>
    </header>
  );
}
