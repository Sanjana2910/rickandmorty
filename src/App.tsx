
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";

import { CharactersPage } from "./pages/CharacterPage"; 
import { CharacterDetailPage } from "./pages/CharacterDetailPage";
import { LocationDetailPage } from "./pages/LocationDetailPage";
import { LocationPage } from "./pages/LocationPage";   
import { EpisodesPage } from "./pages/EpisodesPage";
import { EpisodeDetailPage } from "./pages/EpisodeDetailPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />

     
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />

      
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />

       
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/location/:id" element={<LocationDetailPage />} />

          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/episode/:id" element={<EpisodeDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
