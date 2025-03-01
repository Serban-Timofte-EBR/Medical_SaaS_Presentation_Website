import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import AppFlowSection from "./components/HowItWorks";
import DigitalPatientFolder from "./components/DigitalPatientFolder";
import ChatbotFeature from "./components/ChatbotFeature";
import Contact from "./components/Contact";
import ComingSoonSection from "./components/ComingSoonSection";
import ArticlesSection from "./components/ArticlesSection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArticlesPage from "./pages/ArticlesPage";
import ChatbotPage from "./pages/ChatbotPage";
import theme from "./styles/theme";

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const { user } = useAuth();
  return user ? <>{element}</> : <Login />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Routes>
            {/* Public Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ComingSoonSection />
                  <ArticlesSection />
                  <FeaturesSection />
                  <AppFlowSection />
                  <DigitalPatientFolder />
                  <ChatbotFeature />
                  <Contact />
                </>
              }
            />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes (Require Authentication) */}
            <Route
              path="/blog"
              element={<ProtectedRoute element={<ArticlesPage />} />}
            />
            <Route
              path="/gpt"
              element={<ProtectedRoute element={<ChatbotPage />} />}
            />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
