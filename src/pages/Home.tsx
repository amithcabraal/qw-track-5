import React from 'react';
import { PlaylistSelector } from '../components/PlaylistSelector';
import { Player } from '../components/Player';
import { SpotifyPlaylist, SpotifyTrack, SpotifyUser } from '../types/spotify';
import { Layout } from '../components/Layout';

interface HomeProps {
  user: SpotifyUser | null;
  playlists: SpotifyPlaylist[];
  currentTrack: SpotifyTrack | null;
  onPlaylistSelect: (playlist: SpotifyPlaylist) => void;
}

export const Home: React.FC<HomeProps> = ({
  user,
  playlists,
  currentTrack,
  onPlaylistSelect,
}) => {
  return (
    <Layout user={user}>
      <main className="max-w-4xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">Your Playlists</h2>
        <PlaylistSelector playlists={playlists} onSelect={onPlaylistSelect} />
      </main>
      <Player track={currentTrack} />
    </Layout>
  );
};