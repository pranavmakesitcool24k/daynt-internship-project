import { User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonStats } from '@/types/runner';

interface PersonSelectorProps {
  persons: PersonStats[];
  selectedPerson: string | null;
  onSelectPerson: (person: string | null) => void;
}

export function PersonSelector({ persons, selectedPerson, onSelectPerson }: PersonSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-sm font-semibold text-foreground">
        Filter by Runner
      </h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedPerson === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectPerson(null)}
          className="gap-2"
        >
          <Users className="h-4 w-4" />
          All Runners
        </Button>
        {persons.map((person) => (
          <Button
            key={person.name}
            variant={selectedPerson === person.name ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelectPerson(person.name)}
            className="gap-2"
          >
            <User className="h-4 w-4" />
            {person.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
