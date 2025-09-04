import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getEpisodeById } from "@/services/episodes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Episode } from "@/types/episode";

export function EpisodeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getEpisodeById(Number(id))
      .then((data) => setEpisode(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!episode) {
    return (
      <div className="p-4">
        <p>Episode not found.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        ← Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{episode.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Air Date:</strong> {episode.air_date}
          </p>
          <p>
            <strong>Episode Code:</strong> {episode.episode}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Characters</h3>
            {episode.characters.length > 0 ? (
              <ul className="list-disc pl-5">
                {episode.characters.map((char) => {
                  const charId = char.split("/").pop();
                  return (
                    <li key={char}>
                      <Link
                        to={`/character/${charId}`}
                        className="hover:underline"
                      >
                        {char}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No characters found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
