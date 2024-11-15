import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Fade,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { motion } from "framer-motion";
import ChatIcon from "@mui/icons-material/Chat";

const ChatbotSection = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const options = [
    {
      label: "Give me a summary of all treatments the patient had",
      value: "summary_treatments",
    },
    {
      label: "Give me a summary of all notes in all consultations",
      value: "summary_notes",
    },
    {
      label: "Tell me when the treatment was changed for this patient",
      value: "treatment_changes",
    },
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsLoading(true);

    // Simulate chatbot response delay
    setTimeout(() => {
      setIsLoading(false);
      generateResponse(option);
    }, 2000); // 2-second delay for animation
  };

  const generateResponse = (option: string) => {
    switch (option) {
      case "summary_treatments":
        setResponse(
          "The patient has undergone a multidisciplinary approach to treatment. Initially, chemotherapy was administered starting in early 2022 to target rapidly dividing cells, primarily focusing on the tumor's aggressive nature. This was followed by a transition to targeted therapy in mid-2023, specifically aimed at HER2-positive cells, leveraging advances in precision medicine. The targeted therapy has been crucial in reducing tumor size while minimizing systemic side effects. The patient continues to respond well, with regular monitoring through PET-CT scans showing a significant reduction in tumor markers."
        );
        break;
      case "summary_notes":
        setResponse(
          "Across several consultations, the doctor made numerous observations. After the second cycle of treatment in April 2023, the patient showed a remarkable improvement, both clinically and in lab results. The tumor mass shrunk by approximately 30%, and the patient reported increased energy levels and reduced pain. The oncologist also noted a slight alteration in the patient's blood panel, indicating potential side effects, which were managed with supportive medications. The patient's psychosocial well-being was also addressed, with the doctor encouraging further engagement with support groups."
        );
        break;
      case "treatment_changes":
        setResponse(
          "In September 2023, the treatment strategy was revised due to new insights from updated genetic testing and better-than-expected progress in reducing the tumor size. The oncologist decided to reduce the chemotherapy dosage while introducing a complementary immunotherapy regimen aimed at boosting the patient’s immune response to residual cancer cells. This change was primarily driven by improved test results, showing a 45% reduction in tumor volume, alongside stable biomarkers indicating minimal systemic stress from previous treatments. The switch to immunotherapy aims to sustain the progress made while preparing for long-term remission."
        );
        break;
      default:
        setResponse("");
    }
  };

  return (
    <section id="ai">
      <Box sx={{ py: 8, backgroundColor: "#f9f9f9", textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
          AI Chatbot Summary
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                border: "2px solid #e91e63",
                borderRadius: "12px",
                p: 3,
                backgroundColor: "#fff",
                textAlign: "left",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: pink[500],
                    color: "#fff",
                    mr: 2,
                  }}
                >
                  <ChatIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  E-OncoHub Chatbot
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "text.secondary", fontStyle: "italic" }}
              >
                Select an option to get a summary of patient data. This feature
                will be fully available when enough information is collected for
                the patient.
              </Typography>

              {options.map((option, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  color="primary"
                  sx={{ mb: 2, mr: 2 }}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </Button>
              ))}

              {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <CircularProgress />
                </Box>
              )}

              {!isLoading && response && (
                <Fade in={!!response}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    sx={{
                      mt: 4,
                      backgroundColor: "#fff5f7",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2">{response}</Typography>
                    </CardContent>
                  </Card>
                </Fade>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default ChatbotSection;
