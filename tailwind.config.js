// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'text': {
//           50: 'var(--text-50)',
//           100: 'var(--text-100)',
//           200: 'var(--text-200)',
//           300: 'var(--text-300)',
//           400: 'var(--text-400)',
//           500: 'var(--text-500)',
//           600: 'var(--text-600)',
//           700: 'var(--text-700)',
//           800: 'var(--text-800)',
//           900: 'var(--text-900)',
//           950: 'var(--text-950)',
//         },
//         'background': {
//           50: 'var(--background-50)',
//           100: 'var(--background-100)',
//           200: 'var(--background-200)',
//           300: 'var(--background-300)',
//           400: 'var(--background-400)',
//           500: 'var(--background-500)',
//           600: 'var(--background-600)',
//           700: 'var(--background-700)',
//           800: 'var(--background-800)',
//           900: 'var(--background-900)',
//           950: 'var(--background-950)',
//         },
//         'primary': {
//           50: 'var(--primary-50)',
//           100: 'var(--primary-100)',
//           200: 'var(--primary-200)',
//           300: 'var(--primary-300)',
//           400: 'var(--primary-400)',
//           500: 'var(--primary-500)',
//           600: 'var(--primary-600)',
//           700: 'var(--primary-700)',
//           800: 'var(--primary-800)',
//           900: 'var(--primary-900)',
//           950: 'var(--primary-950)',
//         },
//         'secondary': {
//           50: 'var(--secondary-50)',
//           100: 'var(--secondary-100)',
//           200: 'var(--secondary-200)',
//           300: 'var(--secondary-300)',
//           400: 'var(--secondary-400)',
//           500: 'var(--secondary-500)',
//           600: 'var(--secondary-600)',
//           700: 'var(--secondary-700)',
//           800: 'var(--secondary-800)',
//           900: 'var(--secondary-900)',
//           950: 'var(--secondary-950)',
//         },
//         'accent': {
//           50: 'var(--accent-50)',
//           100: 'var(--accent-100)',
//           200: 'var(--accent-200)',
//           300: 'var(--accent-300)',
//           400: 'var(--accent-400)',
//           500: 'var(--accent-500)',
//           600: 'var(--accent-600)',
//           700: 'var(--accent-700)',
//           800: 'var(--accent-800)',
//           900: 'var(--accent-900)',
//           950: 'var(--accent-950)',
//         },
//       },
//       fontSize: {
//         sm: '0.750rem',
//         base: '1rem',
//         xl: '1.333rem',
//         '2xl': '1.777rem',
//         '3xl': '2.369rem',
//         '4xl': '3.158rem',
//         '5xl': '4.210rem',
//       },
//       fontFamily: {
//         heading: ['Geist Mono', 'monospace'],
//         body: ['Geist Mono', 'monospace'],
//       },
//       fontWeight: {
//         normal: '400',
//         bold: '700',
//       }
//     },
//   },
//   darkMode: 'class',
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {




      // Updated color configuration using CSS variables
      colors: {
        text: generateColorConfig('text'),
        background: generateColorConfig('background'),
        primary: generateColorConfig('primary'),
        secondary: generateColorConfig('secondary'),
        accent: generateColorConfig('accent'),
      },
      // Typography configuration
      fontSize: {
        sm: '0.750rem', // Small
        base: '1rem', // Base
        xl: '1.333rem', // Extra Large
        '2xl': '1.777rem', // 2x Extra Large
        '3xl': '2.369rem', // 3x Extra Large
        '4xl': '3.158rem', // 4x Extra Large
        '5xl': '4.210rem', // 5x Extra Large
      },
      fontFamily: {
        heading: ['Geist Mono', 'monospace'], // Heading font
        body: ['Geist Mono', 'monospace'], // Body font
      },
      fontWeight: {
        normal: '400', // Normal font weight
        bold: '700', // Bold font weight
      },
    },
  },
  // Enable Dark Mode based on class
  darkMode: 'class',
  plugins: [],
};

// Utility function to generate color configurations using CSS variables
function generateColorConfig(name) {
  return {
    50: `var(--${name}-50)`,
    100: `var(--${name}-100)`,
    200: `var(--${name}-200)`,
    300: `var(--${name}-300)`,
    400: `var(--${name}-400)`,
    500: `var(--${name}-500)`,
    600: `var(--${name}-600)`,
    700: `var(--${name}-700)`,
    800: `var(--${name}-800)`,
    900: `var(--${name}-900)`,
    950: `var(--${name}-950)`,
  };
}
