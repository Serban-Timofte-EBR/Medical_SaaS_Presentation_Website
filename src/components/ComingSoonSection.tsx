import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ComingSoonSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: "#fff5f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md">
        {/* Chat Icon with Animated Effect */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#e91e63",
            animation: "bounce 2s infinite",
          }}
        >
          <ChatIcon sx={{ fontSize: "5rem", color: "#e91e63", mr: 2 }} />
          <AccessTimeIcon sx={{ fontSize: "3rem", color: "#e91e63" }} />
        </Box>

        {/* Punchy Title */}
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 3, color: "#333" }}
        >
          Your Health & Prevention Assistant{" "}
        </Typography>

        {/* Brief and Engaging Description */}
        <Typography
          variant="h6"
          sx={{
            color: "#555",
            maxWidth: "600px",
            margin: "auto",
            mb: 5,
            fontSize: "1.1rem",
          }}
        >
          Our AI-powered chatbot will guide you through the medical system,
          offering personalized support for cancer patients and prevention
          seekers alike. Get the help you need, fast!
        </Typography>

        {/* Highlights Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              sx={{ color: "#e91e63", fontWeight: "bold", mb: 1 }}
            >
              Personalized Support
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#777", fontSize: "1rem" }}
            >
              Whether you’ve been diagnosed or are taking preventive measures,
              our chatbot provides tailored guidance just for you.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              sx={{ color: "#e91e63", fontWeight: "bold", mb: 1 }}
            >
              Always There for You
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#777", fontSize: "1rem" }}
            >
              Available 24/7 to assist you in navigating the complexities of
              cancer care and treatment.
            </Typography>
          </Grid>
        </Grid>

        {/* Coming Soon Callout */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mt: 6, color: "#333" }}
        >
          Start Chatting Now
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 4, color: "#e91e63" }}
        >
          Talk to Our AI Chatbot!
        </Typography>

        {/* CTA Button - Redirects to /gpt */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/gpt")}
          endIcon={<ArrowForwardIcon />}
          sx={{
            padding: "12px 30px",
            fontSize: "1.1rem",
            borderRadius: "50px",
            backgroundColor: "#e91e63",
            "&:hover": {
              backgroundColor: "#d81b60",
            },
          }}
        >
          Go to Chat
        </Button>
      </Container>
    </Box>
  );
};

export default ComingSoonSection;
