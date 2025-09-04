import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  CharacterFilters as CharacterFiltersType,
  CharacterStatus,
  CharacterGender,
} from "@/types/character";
import { Button } from "../ui/button";

type Props = {
  filters: CharacterFiltersType;
  onChange: (newFilters: CharacterFiltersType) => void;
};

export function CharacterFilters({ filters, onChange }: Props) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value || undefined;
    onChange({ ...filters, name });
  };

  const handleStatusChange = (value: string) => {
    const status = value === "all" ? undefined : (value as CharacterStatus);
    onChange({ ...filters, status });
  };

  const handleSpeciesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const species = e.target.value || undefined;
    onChange({ ...filters, species });
  };

  const handleGenderChange = (value: string) => {
    const gender = value === "all" ? undefined : (value as CharacterGender);
    onChange({ ...filters, gender });
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

      <Select
        value={filters.status || "all"}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Alive">Alive</SelectItem>
          <SelectItem value="Dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Search by species"
        value={filters.species || ""}
        onChange={handleSpeciesChange}
        className="w-full sm:w-auto"
      />

      <Select
        value={filters.gender || "all"}
        onValueChange={handleGenderChange}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genders</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Genderless">Genderless</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={resetFilters}>Reset</Button>
    </div>
  );
}