import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  MedicalServices,
  Insights,
  Storage,
  Search,
} from "@mui/icons-material";

const features = [
  {
    title: "AI-Driven Insights",
    description:
      "Leverage the power of AI to get real-time insights, supporting doctors in making informed treatment decisions.",
    icon: <Insights />,
  },
  {
    title: "Research Cloud Databases",
    description:
      "Access up-to-date research data from cloud-based repositories for better diagnostic support.",
    icon: <Storage />,
  },
  {
    title: "Comprehensive Patient Profiles",
    description:
      "View all patient details, consultations, and test results in one digital folder, enhancing continuity of care.",
    icon: <MedicalServices />,
  },
  {
    title: "ESMO Guide Profiling",
    description:
      "Seamless integration with ESMO guidelines to ensure evidence-based treatments and profiling for every patient.",
    icon: <Search />,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features">
      <Box sx={{ py: 10, backgroundColor: "#f9f9f9", position: "relative" }}>
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
            E-OncoHub Insides
          </Typography>

          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 6,
              color: "#777",
              maxWidth: "600px",
              margin: "auto",
              fontSize: "1.2rem",
            }}
          >
            Revolutionize oncology with a platform that combines AI insights,
            comprehensive patient management, and secure access to vital data.
            E-OncoHub brings the future of healthcare to your practice.
          </Typography>
          <br />
          <br />

          <Grid container spacing={6}>
            {features.map((feature, index) => (
              <Grid
                item
                xs={12}
                md={6}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 3,
                    borderRadius: "20px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      backgroundColor: "#f7f7f7",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#e91e63",
                      width: 64,
                      height: 64,
                      mr: 3,
                      color: "#fff",
                      fontSize: "2.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <CardContent
                    sx={{
                      paddingLeft: "20px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        color: "#333",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        lineHeight: "1.8",
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
