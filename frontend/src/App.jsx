import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";
import CalendarPage from "./pages/CalendarPage";
import { ThemeProvider } from "./components/ui/themeProvider";
import Register from "./pages/RegistrationPage";
import SignIn from "./pages/SignInPage";

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="fixed top-0 w-full">
          <Navbar />
        </div>

        <div className="p-10" />

        <Routes>
          <Route path="/" element={<Navigate to="main" replace />} />
          <Route path="main" element={<Homepage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
