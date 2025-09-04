import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Character } from "@/types/character";

type Props = {
  character: Character;
};

export function CharacterCard({ character }: Props) {
  return (
    <Card className="w-full">
      <CardHeader> 
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-auto rounded-md"
        />
        <CardTitle className="mt-2">{character.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
      </CardContent>
    </Card>
  );
}
