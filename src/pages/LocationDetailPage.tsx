import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLocationById } from "@/services/locations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Location } from "@/types/location";

export function LocationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getLocationById(Number(id))
      .then((data) => setLocation(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!location) {
    return (
      <div className="p-4">
        <p>Location not found.</p>
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
          <CardTitle className="text-3xl font-bold">{location.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Type:</strong> {location.type}
          </p>
          <p>
            <strong>Dimension:</strong> {location.dimension}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Residents</h3>
            {location.residents.length > 0 ? (
              <ul className="list-disc pl-5">
                {location.residents.map((res) => {
                  const resId = res.split("/").pop();
                  return (
                    <li key={res}>
                      <Link
                        to={`/character/${resId}`}
                        className="hover:underline"
                      >
                        {res}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No residents found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
