import Typography from 'typography'
import theme from 'typography-theme-wordpress-2016'

theme.baseFontSize = '18px'
theme.bodyWeight = 350

theme.overrideThemeStyles = ({ rhythm }, options, styles) => ({
  'ul,ol': {
    marginLeft: '1.75rem'
  }
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
