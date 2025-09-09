import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./pages/Navbar";
import Homepage from "./pages/Homepage";
import Calendar from "./pages/Calendar";
import { ThemeProvider } from "./components/ui/themeProvider";

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
          <Route path="calendar" element={<Calendar />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
