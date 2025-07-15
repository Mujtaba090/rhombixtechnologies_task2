import { useEffect, useRef, useState } from "react";

export default function Player({ currentSong, playing, setPlaying, skipNext, skipPrev }) {
  const audioRef = useRef();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!currentSong) return;
    if (playing) audioRef.current.play();
    else audioRef.current.pause();
  }, [playing, currentSong]);

  useEffect(() => {
    const id = setInterval(() => {
      if (audioRef.current && currentSong) {
        const pct =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(isNaN(pct) ? 0 : pct);
      }
    }, 400);
    return () => clearInterval(id);
  }, [currentSong]);

  const togglePlay = () => setPlaying(!playing);

  return (
    <div className="player">
      <span>{currentSong ? `🎶 ${currentSong.title}` : "No song selected"}</span>

      {/* waveform */}
      <div className={`waveform ${playing ? "active" : ""}`}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* progress bar */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        readOnly
        style={{ width: "200px" }}
      />

      {/* volume slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        style={{ width: "100px", margin: "0 10px" }}
      />

      {/* Controls */}
      {currentSong && (
        <>
          <button onClick={skipPrev}>⏮️</button>
          <button onClick={togglePlay}>{playing ? "⏸️ Pause" : "▶️ Play"}</button>
          <button onClick={skipNext}>⏭️</button>
        </>
      )}

      <audio ref={audioRef} src={currentSong?.file}></audio>
    </div>
  );
}
