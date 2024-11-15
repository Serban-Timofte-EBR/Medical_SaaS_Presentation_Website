import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import AppFlowSection from "./components/HowItWorks";
import DigitalPatientFolder from "./components/DigitalPatientFolder";
import theme from "./styles/theme";
import Footer from "./components/Footer";
import ChatbotFeature from "./components/ChatbotFeature";
import Contact from "./components/Contact";
import ComingSoonSection from "./components/ComingSoonSection";
import ArticlesSection from "./components/ArticlesSection";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <HeroSection />
      <ComingSoonSection />
      <ArticlesSection />
      <FeaturesSection />
      <AppFlowSection />
      <DigitalPatientFolder />
      <ChatbotFeature />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
