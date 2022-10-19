/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      buttonAdd: '#047857',
      buttonAddHover: '#059669',
      buttonDelete: '#dc2626',
      buttonDeleteHover: '#ef4444',
      buttonNeutral: '#d0b49f',
      buttonNeutralHover: '#dcc7b7',
      bgDark: '#1c1917',
      bgMed: '#44403c',
      bgHover: '#44403c',
      bgLight: '#d6d3d1',
      bgLighter: '#f5f5f4',
      divider: '#78716c',
      font: '#e7e5e4',
      fontDark: '#1c1917'
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
