export default function SongCard({ song, onPlay, currentSong, playing, togglePlay }) {
  const isCurrent = currentSong?.id === song.id;

  return (
    <div className="card">
      <img src={song.cover} alt={song.title} />
      <h3>{song.title}</h3>
      <p>{song.artist}</p>

      {isCurrent && playing ? (
        <button onClick={togglePlay}>⏸️ Pause</button>
      ) : (
        <button onClick={() => onPlay(song)}>▶️ Play</button>
      )}
    </div>
  );
}
