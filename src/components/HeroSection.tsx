import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  keyframes,
} from "@mui/material";
import eOncoHubImage from "../assets/eOncoHub.png";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(270deg, #ff9a9e, #fad0c4, #ffdde1)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 15s ease infinite`,
        display: "flex",
        alignItems: "center",
        py: 8,
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left Section: Intro */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: { xs: "center", md: "left" },
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                color: "#333",
                lineHeight: 1.2,
              }}
            >
              Empowering Oncology with{" "}
              <span style={{ color: "#e91e63" }}>AI</span>
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{
                mb: 4,
                maxWidth: "500px",
                lineHeight: 1.6,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              E-OncoHub helps oncologists manage patient consultations,
              treatments, and diagnostics in a centralized and modern platform.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                backgroundColor: "#e91e63",
                px: 4,
                py: 1.5,
                ":hover": {
                  backgroundColor: "#d81b60",
                  transform: "scale(1.05)",
                },
                transition: "transform 0.3s ease",
              }}
            >
              <a
                href="#features"
                style={{
                  color: "inherit", 
                  textDecoration: "none",
                }}
              >
                Get Started
              </a>
            </Button>
          </Grid>

          {/* Right Section: Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={eOncoHubImage}
                alt="E-OncoHub Illustration"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
