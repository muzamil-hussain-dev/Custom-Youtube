/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                youtube: {
                    base: "#0f0f0f",     // Dark background
                    secondary: "#272727", // Hover/Sidebar
                    text: "#f1f1f1",      // Main text
                    textSecondary: "#aaaaaa", // Secondary text
                    red: "#ff0000",       // Brand color
                    border: "#3f3f3f",    // Borders
                    hover: "#3f3f3f"      // Hover state
                }
            },
            gridTemplateColumns: {
                'card': 'repeat(auto-fill, minmax(300px, 1fr))', // Responsive card grid
            }
        },
    },
    plugins: [],
}
