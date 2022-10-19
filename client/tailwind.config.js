/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      buttonAdd: '#047857',
      buttonAddHover: '#059669',
      buttonDelete: '#b91c1c',
      buttonDeleteHover: '#dc2626',
      bgDark: '#1c1917',
      bgMed: '#292524',
      bgHover: '#44403c',
      bgLight: '#d6d3d1',
      divider: '#78716c',
      font: '#e7e5e4'
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
