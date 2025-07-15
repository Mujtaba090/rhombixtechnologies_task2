import { useEffect, useState } from "react";
import songsData from "./data/songs.json";
import Navbar from "./components/Navbar";
import SongCard from "./components/SongCard";
import Player from "./components/Player";
import "./index.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState("dark");

  // Auto-detect system theme on first load
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const filteredSongs = songsData.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const playSong = (song) => {
    const index = songsData.findIndex((s) => s.id === song.id);
    setCurrentSong(song);
    setCurrentIndex(index);
    setPlaying(true);
  };

  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  const skipNext = () => {
    const nextIndex = (currentIndex + 1) % songsData.length;
    setCurrentSong(songsData[nextIndex]);
    setCurrentIndex(nextIndex);
    setPlaying(true);
  };

  const skipPrev = () => {
    const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
    setCurrentSong(songsData[prevIndex]);
    setCurrentIndex(prevIndex);
    setPlaying(true);
  };

  return (
    <>
      <Navbar setSearch={setSearch} toggleTheme={toggleTheme} />
      <div className="grid">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onPlay={playSong}
            currentSong={currentSong}
            playing={playing}
            togglePlay={togglePlay}
          />
        ))}
      </div>
      <Player
        currentSong={currentSong}
        playing={playing}
        setPlaying={setPlaying}
        skipNext={skipNext}
        skipPrev={skipPrev}
      />
      <footer>
        <p>🎧 This is a Spotify-inspired music player made with React + CSS by Mujtaba Shabir.</p>
        <p>Explore your beats. Built for creativity and full marks. 💯</p>
      </footer>
    </>
  );
}
