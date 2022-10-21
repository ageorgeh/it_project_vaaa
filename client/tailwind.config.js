const greenScheme = {
  buttonAdd: '#047857',
  buttonAddHover: '#059669',
  buttonDelete: '#c81e1e',
  buttonDeleteHover: '#e02424',
  buttonDeleteDark: '#991b1b',
  buttonDeleteDarkHover: '#b91c1c',
  buttonNeutral: '#1e429f',
  buttonNeutralHover: '#1a56db',
  bgDark: '#1c1917',
  bgMedDark: '#292524',
  bgMed: '#44403c',
  bgHover: '#44403c',
  bgLight: '#d6d3d1',
  bgLighter: '#f5f5f4',
  divider: '#78716c',
  font: '#e7e5e4',
  fontDark: '#1c1917'
}

const brownScheme = {
  buttonAdd: '#8a5a44',
  buttonAddHover: '#9d6b53',
  buttonDelete: '#991b1b',
  buttonDeleteHover: '#b91c1c',
  buttonDeleteDark: '#991b1b',
  buttonDeleteDarkHover: '#b91c1c',
  buttonNeutral: '#8a5a44',
  buttonNeutralHover: '#9d6b53',
  bgDark: '#1c1917',
  bgMedDark: '#292524',
  bgMed: '#44403c',
  bgHover: '#44403c',
  bgLight: '#d6d3d1',
  bgLighter: '#f5f5f4',
  divider: '#78716c',
  font: '#e7e5e4',
  fontDark: '#1c1917'
}

const blueScheme = {
  buttonAdd: '#1e40af',
  buttonAddHover: '#1d4ed8',
  buttonDelete: '#c81e1e',
  buttonDeleteHover: '#e02424',
  buttonDeleteDark: '#991b1b',
  buttonDeleteDarkHover: '#b91c1c',
  buttonNeutral: '#1e429f',
  buttonNeutralHover: '#1a56db',
  bgDark: '#0f172a',
  bgMedDark: '#1e293b',
  bgMed: '#334155',
  bgHover: '#334155',
  bgLight: '#cbd5e1',
  bgLighter: '#f1f5f9',
  divider: '#64748b',
  font: '#f1f5f9',
  fontDark: '#0f172a'
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: greenScheme,
    extend: {
      minWidth: {
        48: '12rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
