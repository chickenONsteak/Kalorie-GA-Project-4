import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";
import CalendarPage from "./pages/CalendarPage";
import { ThemeProvider } from "./components/ui/themeProvider";
import Register from "./pages/RegistrationPage";
import SignIn from "./pages/SignInPage";
import UserContext from "./contexts/user";
import NewIntakeContext from "./contexts/newIntake";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [intake, setIntake] = useState("");
  const [role, setRole] = useState("");

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{
            accessToken,
            setAccessToken,
            role,
            setRole,
          }}
        >
          <NewIntakeContext.Provider value={{ intake, setIntake }}>
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
          </NewIntakeContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
