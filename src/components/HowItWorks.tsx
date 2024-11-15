import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import {
  PersonAdd,
  MedicalServices,
  AutoFixHigh,
  Insights,
  Search,
} from "@mui/icons-material";

const featuresFlow = [
  {
    step: 1,
    title: "Add a New Patient",
    description:
      "Easily add a new patient to the system. With the patient's and other doctors' consent, securely share the patient's medical history for collaborative care.",
    icon: <PersonAdd />,
  },
  {
    step: 2,
    title: "Create a New Consultation",
    description:
      "Doctors can create new consultations and automate tasks like lab test data extraction to streamline categorization (Luminal A, Lumaninal B HER2 positive/negative or Triple Negative) and implement TNM standardization.",
    icon: <MedicalServices />,
  },
  {
    step: 3,
    title: "AI-Powered Patient Profile Creation",
    description:
      "Our AI automatically creates a comprehensive patient profile, helping doctors to manage patient data efficiently and make better-informed decisions.",
    icon: <AutoFixHigh />,
  },
  {
    step: 4,
    title: "ESMO Guide Profiling",
    description:
      "The app matches patient data with ESMO guidelines to suggest first and second-line treatments, ensuring adherence to the latest medical standards.",
    icon: <Search />,
  },
  {
    step: 5,
    title: "AI-Driven Insights",
    description:
      "Leverage the power of AI to get real-time insights, supporting doctors in making informed treatment decisions based on up-to-date data.",
    icon: <Insights />,
  },
];

const FeaturesSection = () => {
  return (
    <section id="app-view">
      <Box sx={{ py: 8, backgroundColor: "#f9f9f9", position: "relative" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 6,
              color: "#333",
            }}
          >
            How E-OncoHub Works
          </Typography>

          <Grid container spacing={6} justifyContent="center">
            {featuresFlow.map((feature, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    py: 3,
                    px: 4,
                    borderRadius: "12px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    background: "white",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      mr: 4,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#e91e63",
                        width: 72,
                        height: 72,
                        fontSize: "3rem",
                        color: "#fff",
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 1,
                        fontWeight: "bold",
                        color: "#333",
                        fontSize: "1.2rem",
                      }}
                    >
                      Step {feature.step}
                    </Typography>
                  </Box>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2, height: "80px" }}
                  />

                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        color: "#333",
                        fontSize: "1.5rem",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        lineHeight: "1.8",
                        fontSize: "1.1rem",
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </section>
  );
};

export default FeaturesSection;
