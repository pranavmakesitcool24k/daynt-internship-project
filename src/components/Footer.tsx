import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            CSV Runner Dashboard — Full Stack Development Assignment
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Crafted with <Heart className="h-3.5 w-3.5 text-destructive fill-destructive" /> by{' '}
            <span className="font-semibold text-foreground">Pranav Pardeshi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
