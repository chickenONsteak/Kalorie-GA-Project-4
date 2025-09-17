import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";
import CalendarPage from "./pages/CalendarPage";
import { ThemeProvider } from "./components/ui/themeProvider";
import Register from "./pages/RegistrationPage";
import SignIn from "./pages/SignInPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./contexts/userProvider";
import LoadingContext from "./contexts/loading";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <LoadingContext value={{ isLoading, setIsLoading }}>
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
          </LoadingContext>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
