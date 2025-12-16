function ThemeDropdown({ themeList, setTheme }) {
  return (
    <ul className="bg-base-100 p-2 max-h-60 overflow-y-auto">
      {themeList.map((t) => (
        <li key={t.name}>
          <button
            className="flex items-center gap-2 w-full text-left px-2 py-1 hover:bg-base-200 rounded"
            onClick={() => setTheme(t.name)}
          >
            <span
              className="w-10 h-5 border rounded"
              style={{ backgroundColor: t.color }}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ThemeDropdown;
