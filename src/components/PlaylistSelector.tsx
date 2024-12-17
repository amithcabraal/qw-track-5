import React from 'react';
import { Music } from 'lucide-react';
import { SpotifyPlaylist } from '../types/spotify';

interface PlaylistSelectorProps {
  playlists: SpotifyPlaylist[];
  onSelect: (playlist: SpotifyPlaylist) => void;
}

export const PlaylistSelector: React.FC<PlaylistSelectorProps> = ({ playlists, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {playlists.map((playlist) => (
        <button
          key={playlist.id}
          onClick={() => onSelect(playlist)}
          className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          {playlist.images[0] ? (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="w-16 h-16 rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
              <Music size={24} className="text-gray-400" />
            </div>
          )}
          <div className="ml-4 text-left">
            <h3 className="font-semibold text-gray-800">{playlist.name}</h3>
            <p className="text-sm text-gray-500">{playlist.tracks.total} tracks</p>
          </div>
        </button>
      ))}
    </div>
  );
};