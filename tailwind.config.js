module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      },
      backgroundColor: theme => ({
        'megadark': '#121f2b',
        'ultradark': '#0c181b'
      })
    },
  },
  variants: {
    backgroundColor: ['hover', 'responsive', 'focus', 'dark', 'dark-hover'],
    textColor: ['hover', 'responsive', 'focus', 'dark', 'dark-hover'],
    placeholderColor: ['hover', 'responsive', 'focus', 'dark', 'dark-hover'],
    borderColor: ['hover', 'responsive', 'focus', 'dark', 'dark-hover'],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-dark-mode')()
  ],
}
