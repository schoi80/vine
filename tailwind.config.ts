/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Anthropic Serif', 'Charter', 'Iowan Old Style', 'Sitka Text', 'Georgia', 'serif'],
        anthropic: [
          'Anthropic Serif',
          'Charter',
          'Iowan Old Style',
          'Sitka Text',
          'Georgia',
          'serif',
        ],
        'nanum-pen-script': ['var(--font-nanum-pen-script)', 'cursive'],
        stylish: ['var(--font-stylish)', 'sans-serif'],
        'kaushan-script': ['var(--font-kaushan-script)', 'cursive'],
      },
    },
  },
};
