/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './widgets/**/*.{js,ts,tsx}',
    './shared/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFEBD6',
          200: '#FFD2AD',
          300: '#FFB384',
          400: '#FF9666',
          500: '#FF6533',
          600: '#DB4425',
          700: '#B72919',
          800: '#931410',
          900: '#7A090E',
        },
        success: {
          100: '#D0FCD5',
          200: '#A2FAB5',
          300: '#72F29B',
          400: '#4DE68D',
          500: '#19D67B',
          600: '#12B878',
          700: '#0C9A72',
          800: '#077C67',
          900: '#04665E',
        },
        info: {
          100: '#CBFEF7',
          200: '#98FDF7',
          300: '#64F8FB',
          400: '#3DE5F7',
          500: '#00C9F2',
          600: '#009CD0',
          700: '#0076AE',
          800: '#00548C',
          900: '#003C74',
        },
        warning: {
          100: '#FEFDCF',
          200: '#FEFBA0',
          300: '#FCF870',
          400: '#FAF44C',
          500: '#F7EF13',
          600: '#D4CC0D',
          700: '#B1AA09',
          800: '#8F8806',
          900: '#767003',
        },
        danger: {
          100: '#FFEBDE',
          200: '#FFD2BD',
          300: '#FFB39C',
          400: '#FF9683',
          500: '#FF665B',
          600: '#DB4244',
          700: '#B72D3B',
          800: '#931D32',
          900: '#7A112D',
        },
        basic: {
          100: '#FFFFFF',
          200: '#F5F5F5',
          300: '#E0E0E0',
          400: '#D4D4D4',
          500: '#B3B3B3',
          600: '#808080',
          700: '#4A4A4A',
          800: '#383838',
          900: '#292929',
          1000: '#1F1F1F',
          1100: '#141414',
        },
        basicTransparent: {
          100: 'rgba(128, 128, 128, 0.08)',
          200: 'rgba(128, 128, 128, 0.16)',
          300: 'rgba(128, 128, 128, 0.24)',
          400: 'rgba(128, 128, 128, 0.32)',
          500: 'rgba(128, 128, 128, 0.4)',
          600: 'rgba(128, 128, 128, 0.48)',
        },
      },
    },
  },
  plugins: [],
};
