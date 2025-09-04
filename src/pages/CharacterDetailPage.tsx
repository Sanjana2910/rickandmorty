import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCharacterById } from "@/services/characters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Character } from "@/types/character";

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCharacterById(Number(id))
      .then((data) => setCharacter(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!character) {
    return (
      <div className="p-4">
        <p>Character not found.</p>
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
          <img
            src={character.image}
            alt={character.name}
            className="rounded-lg mb-4"
          />
          <CardTitle className="text-3xl font-bold">{character.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          {character.type && (
            <p>
              <strong>Type:</strong> {character.type}
            </p>
          )}
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Location:</strong> {character.location.name}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Episodes</h3>
            {character.episode.length > 0 ? (
            <ul className="list-disc pl-5">
              {character.episode.map((ep) => {
                const episodeId = ep.split("/").pop(); 
                return (
                  <li key={ep}>
                    <Link
                      to={`/episode/${episodeId}`}
                      className="hover:underline"
                    >
                    {ep}
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