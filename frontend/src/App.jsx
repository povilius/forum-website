import { UserProvider } from "../context/UserContext"
import AppRoutes from "../routes/AppRoutes"
import { ThemeProvider } from "../context/ThemeContext"

const App = () => {
  return (
    <ThemeProvider>
    <UserProvider>
      <AppRoutes />
    </UserProvider>
    </ThemeProvider>
  )
}

export default App