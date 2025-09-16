/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Meditation app soft blue and teal colors
        meditation: {
          sky: {
            50: '#f0f9ff',   // Lightest sky
            100: '#e0f2fe',  // Very light sky
            200: '#bae6fd',  // Light sky
            300: '#7dd3fc',  // Soft sky
            400: '#38bdf8',  // Medium sky
            500: '#0ea5e9',  // Main sky blue
            600: '#0284c7',  // Deeper sky
            700: '#0369a1',  // Deep sky
            800: '#075985',  // Dark sky
            900: '#0c4a6e',  // Darkest sky
          },
          teal: {
            50: '#f0fdfa',   // Lightest teal
            100: '#ccfbf1',  // Very light teal
            200: '#99f6e4',  // Light teal
            300: '#5eead4',  // Soft teal
            400: '#2dd4bf',  // Medium teal
            500: '#14b8a6',  // Main teal
            600: '#0d9488',  // Deeper teal
            700: '#0f766e',  // Deep teal
            800: '#115e59',  // Dark teal
            900: '#134e4a',  // Darkest teal
          },
          aqua: {
            50: '#ecfeff',   // Lightest aqua
            100: '#cffafe',  // Very light aqua
            200: '#a5f3fc',  // Light aqua
            300: '#67e8f9',  // Soft aqua
            400: '#22d3ee',  // Medium aqua
            500: '#06b6d4',  // Main aqua
            600: '#0891b2',  // Deeper aqua
            700: '#0e7490',  // Deep aqua
            800: '#155e75',  // Dark aqua
            900: '#164e63',  // Darkest aqua
          },
          ocean: {
            50: '#f0f8ff',   // Lightest ocean
            100: '#e1f0fe',  // Very light ocean
            200: '#c3dafe',  // Light ocean
            300: '#a5b9fc',  // Soft ocean
            400: '#818cf8',  // Medium ocean
            500: '#6366f1',  // Main ocean blue
            600: '#4f46e5',  // Deeper ocean
            700: '#4338ca',  // Deep ocean
            800: '#3730a3',  // Dark ocean
            900: '#312e81',  // Darkest ocean
          },
        },
        // Quabble-inspired yellowish-brown wellness theme
        quabble: {
          cream: {
            50: '#fefdfb',   // Lightest cream - for backgrounds
            100: '#faf8f3',  // Light cream
            200: '#f5f1e8',  // Soft cream
            300: '#ede6d4',  // Medium cream
            400: '#e3d5b7',  // Warm cream
            500: '#d4c2a1',  // Main cream tone
            600: '#c4ae8a',  // Deeper cream
            700: '#b09873',  // Rich cream
            800: '#9c825e',  // Dark cream
            900: '#876f4a',  // Deepest cream
          },
          sage: {
            50: '#f7f8f6',   // Light sage for accents
            100: '#eef0ec',  // Very light sage
            200: '#dfe3d9',  // Soft sage
            300: '#c9d0c0',  // Medium sage
            400: '#afb8a4',  // Calm sage
            500: '#94a088',  // Main sage tone
            600: '#7d896f',  // Rich sage
            700: '#677259',  // Deep sage
            800: '#535c47',  // Dark sage
            900: '#414a37',  // Deepest sage
          },
          brown: {
            50: '#faf7f3',   // Lightest brown
            100: '#f2ebe2',  // Light brown
            200: '#e6d5c1',  // Soft brown
            300: '#d7bb9a',  // Medium brown
            400: '#c59f71',  // Warm brown
            500: '#b08554',  // Main brown tone - mind-easing
            600: '#9c6f3f',  // Rich brown
            700: '#845a2f',  // Deep brown
            800: '#6d4823',  // Dark brown
            900: '#5a3a1c',  // Deepest brown
          },
          yellow: {
            50: '#fffef7',   // Lightest yellow
            100: '#fffbeb',  // Very light yellow
            200: '#fef7d3',  // Soft yellow
            300: '#fdefaa',  // Light yellow
            400: '#fce175',  // Bright yellow
            500: '#f9d23f',  // Main yellow - cheerful
            600: '#e6be1a',  // Golden yellow
            700: '#c19e0f',  // Deep yellow
            800: '#9d7f0d',  // Dark yellow
            900: '#816609',  // Deepest yellow
          },
        },
        primary: {
          50: '#faf7f3',
          100: '#f2ebe2',
          200: '#e6d5c1',
          300: '#d7bb9a',
          400: '#c59f71',
          500: '#b08554', // Main mind-easing brown
          600: '#9c6f3f',
          700: '#845a2f',
          800: '#6d4823',
          900: '#5a3a1c',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b', // Soft gray
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Calm green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        wellness: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308', // Warm wellness yellow
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        calm: {
          50: '#f8f9fc',
          100: '#f0f2f7',
          200: '#e1e5ef',
          300: '#c8cede',
          400: '#a9b0c7',
          500: '#8892b0', // Calm purple-gray
          600: '#6b7694',
          700: '#566179',
          800: '#485064',
          900: '#3e4455',
        },
        college: {
          50: '#f0f8ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7dc7ff',
          400: '#38a8ff',
          500: '#003366', // Deep academic blue
          600: '#002951',
          700: '#001f3d',
          800: '#001529',
          900: '#000a14',
        },
        emerald: {
          50: '#f0fff4',
          100: '#dcffe7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#138808', // Indian green
          600: '#0f7006',
          700: '#0c5804',
          800: '#094002',
          900: '#062801',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffd700', // Academic gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Keep primary/secondary for backward compatibility
        primary: {
          50: '#f0f8ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7dc7ff',
          400: '#38a8ff',
          500: '#003366',
          600: '#002951',
          700: '#001f3d',
          800: '#001529',
          900: '#000a14',
        },
        secondary: {
          50: '#fff8f3',
          100: '#ffefdb',
          200: '#ffdfb8',
          300: '#ffcf94',
          400: '#ffbf70',
          500: '#ff9933',
          600: '#e6751a',
          700: '#cc5500',
          800: '#b34400',
          900: '#993300',
        },
        accent: {
          50: '#f0fff4',
          100: '#dcffe7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#138808',
          600: '#0f7006',
          700: '#0c5804',
          800: '#094002',
          900: '#062801',
        },
        // Eye-soothing dark mode colors
        soothing: {
          cream: {
            50: '#fefdfb',    // Brightest - headings
            100: '#f8f6f2',   // Very light - primary text
            200: '#f0ede6',   // Light - secondary text  
            300: '#e6e1d7',   // Medium light - labels
            400: '#d4cfc2',   // Medium - muted text
            500: '#beb8a8',   // Medium dark - disabled
            600: '#a39c89',   // Dark - placeholder
            700: '#8a8370',   // Darker
            800: '#716b57',   // Very dark
            900: '#5c573f',   // Darkest
          },
          sage: {
            50: '#f4f6f4',    // Light sage for accents
            100: '#e8ebe8',   // Very light sage
            200: '#d6dbd6',   // Light sage text
            300: '#bfc5bf',   // Medium sage for secondary text
            400: '#a3ada3',   // Good contrast sage
            500: '#8a958a',   // Medium sage
            600: '#717b71',   // Dark sage
            700: '#5c645c',   // Darker sage
            800: '#4a524a',   // Very dark sage
            900: '#3a403a',   // Darkest sage
          },
          lavender: {
            50: '#f8f7fd',    // Very light lavender
            100: '#f0eefa',   // Light lavender for text
            200: '#e4dff6',   // Soft lavender
            300: '#d4cbf2',   // Medium lavender - good for dark bg
            400: '#c0b3ed',   // Bright lavender
            500: '#a996e7',   // Medium lavender
            600: '#9480d9',   // Darker lavender
            700: '#7c6bc6',   // Much darker
            800: '#6556b0',   // Very dark
            900: '#524593',   // Darkest
          },
          warm: {
            50: '#fdf9f7',    // Very warm light
            100: '#f7f0eb',   // Warm light for text
            200: '#efe4da',   // Light warm
            300: '#e4d5c6',   // Medium warm - good contrast
            400: '#d6c2ae',   // Warmer medium
            500: '#c6ad94',   // Medium warm
            600: '#b3967a',   // Darker warm
            700: '#9d8065',   // Much darker
            800: '#866b52',   // Very dark warm
            900: '#705742',   // Darkest warm
          }
        },
        // Cute dark theme colors
        cute: {
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
          purple: {
            50: '#f3f4ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            300: '#c4b5fd',
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
          },
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
        }
      },
      fontFamily: {
        'sans': ['Nunito', 'Inter', 'system-ui', 'sans-serif'], // Quabble-style friendly default
        'display': ['Nunito', 'Poppins', 'system-ui', 'sans-serif'], // Rounded, approachable display
        'body': ['Nunito', 'system-ui', 'sans-serif'], // Soft, readable body text
        'heading': ['Poppins', 'Nunito', 'system-ui', 'sans-serif'], // Welcoming headings
        'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
        'quabble': ['Nunito', 'Poppins', 'system-ui', 'sans-serif'], // Main Quabble font
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
