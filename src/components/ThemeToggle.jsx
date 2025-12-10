"use client";

export default function ThemeToggle() {
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        console.log(`Theme changed to ${newTheme}`);
    }

    return (
        <div onClick={toggleTheme}>
            Theme Toggle Component
        </div>
    )
}