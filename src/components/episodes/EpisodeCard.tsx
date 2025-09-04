// src/components/episodes/EpisodeCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Episode } from "@/types/episode";

type Props = {
  episode: Episode;
};

export function EpisodeCard({ episode }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{episode.name}</CardTitle>
        <p className="text-sm text-gray-500">{episode.air_date}</p>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Episode:</strong> {episode.episode}
        </p>
        <p>
          <strong>Characters:</strong> {episode.characters.length}
        </p>
      </CardContent>
    </Card>
  );
}
