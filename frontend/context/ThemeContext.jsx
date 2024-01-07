import { createContext, useState } from "react"
import PropTypes from 'prop-types'


const themes = {
  light: {
    foreground: '#ffffff',
    topbar: '#ececec',
    background: '#222222',
  },
  dark: {
    foreground: '#252525',
    topbar: '#181818',
    background: '#f1f1f1'
  },
}

const ThemeContext = createContext({
  theme: themes.light,
  isDarkMode: false,
  toggleTheme: () => {},
})

const ThemeProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const theme = isDarkMode ? themes.dark : themes.light

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
    {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export {ThemeContext, ThemeProvider}