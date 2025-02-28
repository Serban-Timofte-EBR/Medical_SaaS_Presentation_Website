import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import AppFlowSection from "./components/HowItWorks";
import DigitalPatientFolder from "./components/DigitalPatientFolder";
import Footer from "./components/Footer";
import ChatbotFeature from "./components/ChatbotFeature";
import Contact from "./components/Contact";
import ComingSoonSection from "./components/ComingSoonSection";
import ArticlesSection from "./components/ArticlesSection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import theme from "./styles/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {" "}
        <Header />
        <Routes>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
