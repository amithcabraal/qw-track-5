import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Callback } from './pages/Callback';
import { getStoredAccessToken } from './utils/auth';
import { getCurrentUser, getUserPlaylists, getPlaylistTracks } from './services/spotifyApi';
import { SpotifyPlaylist, SpotifyTrack, SpotifyUser } from './types/spotify';

function App() {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    const token = getStoredAccessToken();
    if (token) {
      getCurrentUser().then(setUser).catch(console.error);
      getUserPlaylists().then(data => setPlaylists(data.items)).catch(console.error);
    }
  }, []);

  const handlePlaylistSelect = async (playlist: SpotifyPlaylist) => {
    try {
      const response = await getPlaylistTracks(playlist.id);
      const tracks = response.items.map(item => item.track);
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      setCurrentTrack(randomTrack);
    } catch (error) {
      console.error('Failed to get playlist tracks:', error);
    }
  };

  const isAuthenticated = Boolean(getStoredAccessToken());

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/callback" element={<Callback />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home
                  user={user}
                  playlists={playlists}
                  currentTrack={currentTrack}
                  onPlaylistSelect={handlePlaylistSelect}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;