function ThemeDropdown({ themeList, setTheme }) {
    return (
        <ul className="bg-base-100 p-2 w-40 max-h-60 overflow-y-auto">
            {themeList.map((t) => (
                <li key={t}>
                    <button
                        className="w-full text-left px-2 py-1 hover:bg-base-200 rounded"
                        onClick={() => setTheme(t)}
                    >
                        {t}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default ThemeDropdown;
