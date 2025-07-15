export default function Navbar({ setSearch, toggleTheme }) {
  return (
    <div className="navbar">
      <h1>🎵 BeatBox</h1>
      <input
        type="text"
        placeholder="Search songs..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={toggleTheme} className="theme-toggle">
        🌓 Toggle Theme
      </button>
    </div>
  );
}
