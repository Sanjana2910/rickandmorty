import { Input } from "@/components/ui/input";
import type { EpisodeFilters as EpisodeFiltersType } from "@/types/episode";
import { Button } from "../ui/button";

type Props = {
  filters: EpisodeFiltersType;
  onChange: (newFilters: EpisodeFiltersType) => void;
};

export function EpisodeFilters({ filters, onChange }: Props) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value || undefined;
    onChange({ ...filters, name });
  };

  const handleEpisodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const episode = e.target.value || undefined;
    onChange({ ...filters, episode });
  };

  const resetFilters = () => {
    onChange({});
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Input
        placeholder="Search by name"
        value={filters.name || ""}
        onChange={handleNameChange}
        className="w-full sm:w-auto"
      />

      <Input
        placeholder="Search by episode (e.g. S01E01)"
        value={filters.episode || ""}
        onChange={handleEpisodeChange}
        className="w-full sm:w-auto"
      />

      <Button onClick={resetFilters}>Reset</Button>
    </div>
  );
}
