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
import { Toaster } from "sonner";
import GuestContext from "./contexts/guestContext";
import GuestModal from "./components/modals/GuestModal";

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false); // TO DISPLAY CALORIE ESTIMATION IN A MODAL FOR GUESTS (NON-LOGGED IN USERS)
  const [openAiResponse, setOpenAiResponse] = useState({});

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <GuestContext
            value={{
              showGuestModal,
              setShowGuestModal,
              openAiResponse,
              setOpenAiResponse,
            }}
          >
            <LoadingContext value={{ isLoading, setIsLoading }}>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                {showGuestModal && (
                  <GuestModal
                    openAiResponse={openAiResponse}
                    open={showGuestModal}
                    setOpen={setShowGuestModal}
                  />
                )}
                <div className="fixed top-0 w-full z-50">
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

                <Toaster
                  richColors
                  swipeDirections="top"
                  className="fixed top-5 left-1/2 -translate-x-1/2"
                />
              </ThemeProvider>
            </LoadingContext>
          </GuestContext>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
